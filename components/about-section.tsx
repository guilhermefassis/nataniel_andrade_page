
"use client";

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Target, TrendingUp, Users, Heart } from 'lucide-react';
import { professionalData } from '@/lib/professional-data';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: GraduationCap,
      title: "Formação Acadêmica",
      description: "Bacharel em Administração e MBA em Gestão de Pessoas"
    },
    {
      icon: Award,
      title: "Certificação Master",
      description: "Master Coach Integral Sistêmico pela Febracis"
    },
    {
      icon: Users,
      title: "Experiência Prática",
      description: "+1500 horas de atendimento individual"
    },
    {
      icon: Target,
      title: "Especialização",
      description: "Coaching Life, Business e Carreira"
    },
    {
      icon: TrendingUp,
      title: "Metodologia",
      description: "Reprogramação de crenças e alta performance"
    },
    {
      icon: Heart,
      title: "Propósito",
      description: "Transformar vidas através do desenvolvimento humano"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="section-padding bg-beige"
      role="main"
      aria-labelledby="about-title"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge 
            variant="secondary" 
            className="bg-teal/10 text-teal border-teal/20 mb-4"
          >
            Sobre Mim
          </Badge>
          
          <h2 
            id="about-title"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Quem é{' '}
            <span className="text-teal">Nataniel Andrade</span>
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Com uma trajetória sólida em desenvolvimento humano, combino conhecimento acadêmico 
            com experiência prática para ajudar pessoas a descobrirem e desenvolverem seu 
            potencial máximo. Minha missão é ser um facilitador de transformações reais e duradouras.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card 
                key={highlight.title}
                className={`card-hover border-0 shadow-lg transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100 + 400}ms`
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Statement */}
        <div 
          className={`bg-white rounded-2xl p-8 md:p-12 shadow-xl transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-xl md:text-2xl text-navy font-medium leading-relaxed mb-6">
              "Acredito que cada pessoa possui um potencial único e extraordinário. 
              Meu papel é ajudar você a descobrir e desenvolver esse potencial, 
              superando limitações e criando a vida que você realmente deseja."
            </blockquote>
            <cite className="text-teal font-semibold text-lg">
              — {professionalData.name}
            </cite>
            <p className="text-gray-600 mt-2">
              {professionalData.title}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-4">
            Pronto para começar sua jornada de transformação?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-navy hover:bg-navy/90 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
            >
              Agende uma Conversa
            </a>
            <a 
              href="#curriculum"
              className="inline-flex items-center justify-center px-8 py-3 border border-teal text-teal hover:bg-teal hover:text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
            >
              Conheça Minha Trajetória
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
