
import { ProfessionalData, CurriculumItem, CourseItem, TestimonialItem, YouTubeVideo } from './types';

export const professionalData: ProfessionalData = {
  name: "Nataniel Andrade",
  title: "Master Trainer Febracis",
  tagline: "Líder de Vidas",
  bio: "Master Coach Integral Sistêmico com mais de 7 anos de experiência, +1500 horas de atendimento individual e especialização em desenvolvimento pessoal e profissional.",
  profileImage: "/images/profile.png",
  logo: "/images/logo.png",
  location: "São Luís, MA",
  experience: "+1500 horas de coaching",
  curriculo: [
    {
      title: "Bacharelado em Administração de Empresas",
      institution: "Universidade Ceuma",
      year: null,
      description: "Formado em Administração de Empresas pela Universidade Ceuma."
    },
    {
      title: "MBA em Gestão de Pessoas",
      institution: "Faculdade Estácio",
      year: null,
      description: "MBA em Gestão de Pessoas pela Faculdade Estácio."
    },
    {
      title: "Experiência em Coaching",
      institution: "CIS (Coaching Integral Sistêmico)",
      year: "7+ anos",
      description: "Mais de 7 anos de experiência com Coaching Integral Sistêmico."
    },
    {
      title: "Master Coach Integral Sistêmico",
      institution: "Febracis",
      year: null,
      description: "Certificação como Master Coach Integral Sistêmico pela Febracis."
    },
    {
      title: "Atendimento Individual",
      institution: "Coaching Integral Sistêmico",
      year: null,
      description: "+1.500 horas de atendimento individual em Coaching."
    },
    {
      title: "Áreas de Atuação",
      institution: null,
      year: null,
      description: "Atua nas áreas de Coaching Life, Business e Carreira."
    },
    {
      title: "Competências",
      institution: null,
      year: null,
      description: "Domínio em reprogramação de crenças, atendimento, vendas, desenvolvimento pessoal/profissional e treinamentos de equipes."
    }
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/nataniel-andrade-3a9aba182",
    instagram: "https://instagram.com/natanielandrad",
    youtube: "https://www.youtube.com/@natanielandrad",
    whatsapp: "+55 99 8183-8481",
    email: "natanielandrad@gmail.com"
  }
};

export const coursesData: CourseItem[] = [
  {
    name: "Método CIS",
    description: "Maior treinamento de inteligência emocional do mundo, baseado na metodologia de Paulo Vieira para alta performance pessoal e profissional.",
    link: "https://febracis.com/cursos/metodo-cis/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Formação em Coaching Integral Sistêmico",
    description: "Treinamento completo para quem busca ferramentas para uma carreira de alta performance com certificação internacional.",
    link: "https://febracis.com/cursos/formacao-em-coaching-integral-sistemico/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Master Coaching Integral Sistêmico",
    description: "Formação avançada para conquistar maestria no desenvolvimento humano e na capacidade de transformar vidas.",
    link: "https://febracis.com/cursos/master-coaching-integral-sistemico/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Inteligência Financeira",
    description: "Curso focado em autoconhecimento e mudança de crenças financeiras para transformar sua relação com o dinheiro.",
    link: "https://febracis.com/cursos/inteligencia-financeira/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Formação Profissional em Business Coaching – ML5",
    description: "Formação voltada para líderes e coaches que querem atuar no mundo dos negócios, com ferramentas práticas de alta performance.",
    link: "https://febracis.com/cursos/formacao-profissional-em-business-coaching-ml5/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Business High Performance",
    description: "Treinamento intensivo em liderança, gestão, negociação e estratégias para dobrar resultados em tempo recorde.",
    link: "https://febracis.com/cursos/business-high-performance/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Alta Performance em Saúde",
    description: "Curso focado em saúde física, emocional e espiritual com ferramentas de coaching para conquistar maior qualidade de vida.",
    link: "https://febracis.com/cursos/alta-performance-em-saude/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Planejamento Estratégico na Prática",
    description: "Capacitação prática para elaboração e execução de planejamento estratégico aplicável a negócios.",
    link: "https://febracis.com/cursos/planejamento-estrategico-na-pratica/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Técnicas Avançadas de Vendas",
    description: "Curso voltado para escalar faturamento e se tornar um vendedor de alta performance.",
    link: "https://febracis.com/cursos/tecnicas-avancadas-de-vendas/",
    image: "/images/generic-image.png"
  },
  {
    name: "Growth – Estratégia de Crescimento Empresarial",
    description: "Treinamento focado em potencializar vendas e expansão empresarial.",
    link: "https://febracis.com/cursos/growth-estrategia-de-crescimento-empresarial/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Formação em Gestão Comportamental para Empresas",
    description: "Formação especializada para selecionar, liderar e desenvolver talentos dentro de uma organização.",
    link: "https://febracis.com/cursos/formacao-em-gestao-comportamental-para-empresas/",
    image: "/images/genetic-image.png"
  },
  {
    name: "Formação de Oradores e Palestrantes",
    description: "Curso para desenvolver habilidades de falar em público e ministrar apresentações de impacto.",
    link: "https://febracis.com/cursos/formacao-de-oradores-e-palestrantes/",
    image: "/images/genetic-image.png"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    name: "Cliente Anônimo",
    stars: 5,
    message: "A sessão foi brilhantemente conduzida, me fez perceber onde estou, por que estou, quais áreas da minha vida são mais importantes pra mim e estou parada, e fez ver onde eu quero e posso chegar. Objetivos do primeiro encontro concluído com sucesso!"
  },
  {
    name: "Guilherme Assis",
    stars: 5,
    message: "Simplesmente um coach brilhante, exemplo de humildade e compaixão, inspirador. Consegue trazer a visão do futuro e do passado, derrubando crenças, em suma brilhante!"
  },
  {
    name: "Edelino dos Santos Silva",
    stars: 5,
    message: "Minha vida está mudando, estou cada dia mais prosperando na minha vida e nos negócios. Muito grato pelo excelente COACH que está conduzindo esse meu processo."
  },
  {
    name: "Nadyana Chaves Sousa",
    stars: 5,
    message: "O meu Coach e minha inspiração de humildade e gratidão! Só tenho a agradecer pela vida e proteção pela vida ao senhor nosso pai."
  },
  {
    name: "Dr. Lucas Moreira",
    stars: 5,
    message: "Vivenciar momentos que fogem do comum é algo transformador. Essa experiência foi simplesmente incrível, uma verdadeira imersão em sentimentos, aprendizados e sensações que marcaram a minha essência."
  },
  {
    name: "Nayara Araújo Castro",
    stars: 5,
    message: "Extraordinário! Ganhos imensuráveis... Saber valorizar, como usar e onde aplicar o meu dinheiro foi algo que fez muito sentido pra mim. Não é o quanto ganho e sim como cuido dele. Gratidão."
  }
];

export const youtubeVideos: YouTubeVideo[] = [
  {
    url: "https://www.youtube.com/shorts/Iijy7bVRUCE",
    title: "Você é um sonhador ou um realizador?"
  },
  {
    url: "https://www.youtube.com/shorts/qF4LXDIlqB8",
    title: "Mais uma turma de Team Coaching Business!"
  },
  {
    url: "https://www.youtube.com/shorts/0ZZAe-18IDI",
    title: "De 0 a 10, como está seu relacionamento?"
  }
];
