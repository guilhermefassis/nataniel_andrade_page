
"use client";

import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Award, Briefcase } from 'lucide-react';
import { professionalData } from '@/lib/professional-data';

export default function CurriculumSection() {
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

  const getIcon = (title: string) => {
    if (title.includes('Bacharelado') || title.includes('MBA')) {
      return Award;
    }
    if (title.includes('Experiência') || title.includes('Atendimento') || title.includes('Competências')) {
      return Briefcase;
    }
    return Award;
  };

  return (
    <section 
      ref={sectionRef}
      id="curriculum" 
      className="section-padding bg-white"
      role="main"
      aria-labelledby="curriculum-title"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge 
            variant="secondary" 
            className="bg-navy/10 text-navy border-navy/20 mb-4"
          >
            Trajetória Profissional
          </Badge>
          
          <h2 
            id="curriculum-title"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Minha{' '}
            <span className="text-teal">Trajetória</span>
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Uma jornada de aprendizado contínuo e experiências práticas que me prepararam 
            para ajudar você a alcançar seus objetivos pessoais e profissionais.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-navy via-teal to-gold" />

          <div className="space-y-8 md:space-y-12">
            {professionalData.curriculo.map((item, index) => {
              const Icon = getIcon(item.title);
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`relative transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 400}ms`
                  }}
                >
                  <div className={`flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}>
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                      <Card className="card-hover border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-teal" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl font-bold text-navy mb-2">
                                {item.title}
                              </h3>
                              
                              {item.institution && (
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                  <MapPin className="w-4 h-4" />
                                  <span className="font-medium">{item.institution}</span>
                                </div>
                              )}
                              
                              {item.year && (
                                <div className="flex items-center gap-2 text-gray-600 mb-3">
                                  <Calendar className="w-4 h-4" />
                                  <span>{item.year}</span>
                                </div>
                              )}
                              
                              <p className="text-gray-700 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Node */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-teal rounded-full shadow-lg z-10">
                      <div className="w-full h-full bg-teal rounded-full animate-pulse" />
                    </div>

                    {/* Spacer for alignment */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div 
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-all duration-700 delay-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <div className="text-3xl md:text-4xl font-bold text-navy mb-2">7+</div>
            <div className="text-gray-600">Anos de Experiência</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-teal mb-2">+1500</div>
            <div className="text-gray-600">Horas de Coaching</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">3</div>
            <div className="text-gray-600">Áreas de Atuação</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-navy mb-2">100%</div>
            <div className="text-gray-600">Dedicação</div>
          </div>
        </div>
      </div>
    </section>
  );
}
