
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  try {
    // Create admin user
    const adminEmail = 'admin@natanielandrade.com';
    const adminPassword = 'admin';
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: 'Administrador',
        }
      });
      
      console.log('✅ Usuário admin criado com sucesso');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Senha: ${adminPassword}`);
    } else {
      console.log('ℹ️  Usuário admin já existe');
    }

    // Seed some initial courses (optional)
    const courseCount = await prisma.course.count();
    if (courseCount === 0) {
      await prisma.course.createMany({
        data: [
          {
            name: 'Método CIS',
            description: 'Maior treinamento de inteligência emocional do mundo, baseado na metodologia de Paulo Vieira para alta performance pessoal e profissional.',
            link: 'https://febracis.com/cursos/metodo-cis/',
            image: '/images/genetic-image.png'
          },
          {
            name: 'Formação em Coaching Integral Sistêmico',
            description: 'Treinamento completo para quem busca ferramentas para uma carreira de alta performance com certificação internacional.',
            link: 'https://febracis.com/cursos/formacao-em-coaching-integral-sistemico/',
            image: '/images/genetic-image.png'
          }
        ]
      });
      
      console.log('✅ Cursos iniciais criados');
    }

    // Seed some initial videos (optional)
    const videoCount = await prisma.video.count();
    if (videoCount === 0) {
      await prisma.video.createMany({
        data: [
          {
            title: 'Você é um sonhador ou um realizador?',
            url: 'https://www.youtube.com/shorts/Iijy7bVRUCE',
            thumbnail: 'https://img.youtube.com/vi/Iijy7bVRUCE/maxresdefault.jpg'
          },
          {
            title: 'Mais uma turma de Team Coaching Business!',
            url: 'https://www.youtube.com/shorts/qF4LXDIlqB8',
            thumbnail: 'https://img.youtube.com/vi/qF4LXDIlqB8/maxresdefault.jpg'
          }
        ]
      });
      
      console.log('✅ Vídeos iniciais criados');
    }

    console.log('🎉 Seed concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro fatal durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
