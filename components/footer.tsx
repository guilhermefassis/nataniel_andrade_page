
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube,
  ExternalLink,
  Heart
} from 'lucide-react';
import { professionalData } from '@/lib/professional-data';
import { contactData } from '@/lib/contact-data';

export default function Footer() {
  const currentYear = 2024;

  const quickLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Currículo', href: '#curriculum' },
    { label: 'Cursos', href: '#courses' },
    { label: 'Contato', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '/privacy-policy' },
    { label: 'Termos de Uso', href: '/terms' },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: professionalData.social.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      href: professionalData.social.instagram,
      label: 'Instagram',
      color: 'hover:text-pink-600'
    },
    {
      icon: Youtube,
      href: professionalData.social.youtube,
      label: 'YouTube',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <div className="container-custom">
        
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              {professionalData.logo && (
                <div className="relative w-12 h-12">
                  <Image
                    src={professionalData.logo}
                    alt={`${professionalData.name} Logo`}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">
                  {professionalData.name}
                </h3>
                <p className="text-teal font-medium">
                  {professionalData.title}
                </p>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed max-w-md">
              {professionalData.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-teal/20 text-teal border-teal/30">
                Master Trainer
              </Badge>
              <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                +1500 horas
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                7+ anos
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200 ${social.color}`}
                    aria-label={`Seguir no ${social.label}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Navegação
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-white/70 hover:text-teal transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Contato
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  {contactData.location}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal flex-shrink-0" />
                <a 
                  href={`https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-teal transition-colors duration-200"
                >
                  {contactData.whatsapp}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal flex-shrink-0" />
                <a 
                  href={`mailto:${contactData.email}`}
                  className="text-white/70 hover:text-teal transition-colors duration-200"
                >
                  {contactData.email}
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Fale Comigo
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="text-white/60 text-sm text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-1">
                © {currentYear} {professionalData.name}. 
                Feito com <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> 
                para transformar vidas.
              </p>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-teal transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/40 ml-4">•</span>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Tagline */}
          <div className="text-center mt-6">
            <p className="text-teal font-medium text-lg">
              {contactData.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
