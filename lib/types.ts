export interface CurriculumItem {
  title: string;
  institution: string | null;
  year: string | null;
  description: string;
}

export interface CourseItem {
  id?: string;
  name: string;
  description: string;
  image?: string;
  link: string;
}

export interface TestimonialItem {
  name: string;
  stars: number;
  message: string;
  role?: string;
  company?: string;
  photo?: string;
}

export interface YouTubeVideo {
  id?: string;
  title: string;
  url: string;
  thumbnail?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}

export interface SocialLinks {
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  whatsapp?: string;
  email?: string;
}

export interface ProfessionalData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  profileImage: string;
  logo?: string;
  location: string;
  experience: string;
  curriculo: CurriculumItem[];
  social: SocialLinks;
}
