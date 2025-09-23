
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Users, Clock } from 'lucide-react';
import { professionalData } from '@/lib/professional-data';
import { contactData } from '@/lib/contact-data';
import { scrollToElement } from '@/lib/utils';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = () => {
    scrollToElement('contact');
  };

  const handleAboutClick = () => {
    scrollToElement('about');
  };

  if (!mounted) {
    return <div className="h-screen bg-gradient-to-br from-navy to-teal" />;
  }

  return (
    <section 
      id="hero" 
      className="min-h-screen bg-gradient-to-br from-navy via-navy to-teal relative overflow-hidden"
      role="banner"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="flex items-center min-h-screen pt-20 lg:pt-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            
            {/* Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-6 animate-fade-in-up">
                
                {/* Badge */}
                <Badge 
                  variant="secondary" 
                  className="bg-gold/20 text-gold border-gold/30 text-sm px-4 py-2 font-medium inline-flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Master Trainer Febracis
                </Badge>

                {/* Main Heading */}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    <span className="block">Nataniel</span>
                    <span className="block text-teal">Andrade</span>
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-gold font-semibold mt-2">
                    {contactData.tagline}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                  {professionalData.bio}
                </p>

                {/* Social Proof Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-2xl font-bold">+1500</span>
                    </div>
                    <p className="text-white/80 text-sm">Horas de Coaching</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="text-2xl font-bold">7+</span>
                    </div>
                    <p className="text-white/80 text-sm">Anos de Experiência</p>
                  </div>
                  <div className="text-center lg:text-left col-span-2 md:col-span-1">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Star className="w-5 h-5 mr-2" />
                      <span className="text-2xl font-bold">5.0</span>
                    </div>
                    <p className="text-white/80 text-sm">Avaliação Média</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleContactClick}
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-navy font-semibold px-8 py-4 text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
                    aria-label="Descobrir potencial máximo - ir para contato"
                  >
                    {contactData.ctaText}
                  </Button>
                  <Button 
                    onClick={handleAboutClick}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-4 text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-navy"
                    aria-label="Conhecer mais sobre o trabalho - ir para seção sobre"
                  >
                    Conheça Meu Trabalho
                  </Button>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative animate-fade-in-up [animation-delay:200ms]">
                <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/30 to-gold/20 rounded-full blur-xl scale-110" />
                  
                  {/* Main image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <Image
                      src={professionalData.profileImage}
                      alt={`${professionalData.name} - Master Coach Integral Sistêmico`}
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 450px"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-6 -right-6 bg-gold text-navy px-4 py-2 rounded-full font-semibold text-sm shadow-lg animate-bounce [animation-delay:1s]">
                    Master Coach
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-teal text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg animate-bounce [animation-delay:2s]">
                    Febracis
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
