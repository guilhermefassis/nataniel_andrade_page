
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { professionalData } from '@/lib/professional-data';
import { contactData } from '@/lib/contact-data';
import { scrollToElement } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (elementId: string) => {
    scrollToElement(elementId);
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', id: 'hero' },
    { label: 'Sobre', id: 'about' },
    { label: 'Currículo', id: 'curriculum' },
    { label: 'Cursos', id: 'courses' },
    { label: 'Depoimentos', id: 'testimonials' },
    { label: 'Vídeos', id: 'youtube' },
    { label: 'Contato', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            {professionalData.logo && (
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src={professionalData.logo}
                  alt={`${professionalData.name} Logo`}
                  fill
                  className="object-contain rounded"
                  priority
                />
              </div>
            )}
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}>
                {professionalData.name}
              </h1>
              <p className={`text-sm ${
                isScrolled ? 'text-teal' : 'text-teal'
              }`}>
                {professionalData.title}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Menu principal">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 hover:text-teal focus:outline-none focus:text-teal ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                aria-label={`Ir para seção ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              onClick={() => handleNavClick('contact')}
              className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-2 transition-all duration-200"
            >
              {contactData.ctaText}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-navy' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200">
            <nav className="py-4" role="navigation" aria-label="Menu móvel">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-beige hover:text-navy transition-colors duration-200 focus:outline-none focus:bg-beige"
                  aria-label={`Ir para seção ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="px-6 py-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contactData.whatsapp}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{contactData.email}</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-6 py-2">
                <Button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold"
                >
                  {contactData.ctaText}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
