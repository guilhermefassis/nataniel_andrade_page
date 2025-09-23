
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const [courses, videos, messages, pendingMessages] = await Promise.all([
      prisma.course.count(),
      prisma.video.count(),
      prisma.contactForm.count(),
      prisma.contactForm.count({
        where: { status: 'pending' }
      })
    ]);

    return NextResponse.json({
      totalCourses: courses,
      totalVideos: videos,
      totalMessages: messages,
      pendingMessages: pendingMessages,
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
