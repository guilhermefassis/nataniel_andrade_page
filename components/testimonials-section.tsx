
"use client";

import { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '@/lib/professional-data';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % testimonialsData.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'text-gold fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="section-padding bg-white"
      role="main"
      aria-labelledby="testimonials-title"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge 
            variant="secondary" 
            className="bg-gold/10 text-gold border-gold/20 mb-4"
          >
            Depoimentos
          </Badge>
          
          <h2 
            id="testimonials-title"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            O que meus{' '}
            <span className="text-teal">mentorados</span> dizem
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Conheça as experiências reais de pessoas que transformaram suas vidas 
            através do coaching e desenvolvimento pessoal.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <Card 
            className={`shadow-2xl border-0 overflow-hidden transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <CardContent className="p-8 md:p-12 relative">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 opacity-10">
                <Quote className="w-16 h-16 text-teal" />
              </div>

              {/* Stars Rating */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {renderStars(currentTestimonial?.stars || 5)}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-8 relative z-10">
                "{currentTestimonial?.message}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="text-xl font-semibold text-navy mb-1">
                  {currentTestimonial?.name}
                </div>
                {currentTestimonial?.role && (
                  <div className="text-gray-600">
                    {currentTestimonial.role}
                    {currentTestimonial?.company && (
                      <span> • {currentTestimonial.company}</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 z-10"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 z-10"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-teal' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnails for other testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          {testimonialsData
            .filter((_, index) => index !== currentIndex)
            .slice(0, 3)
            .map((testimonial, index) => (
              <Card 
                key={testimonial.name + index}
                className="card-hover border-0 shadow-md cursor-pointer"
                onClick={() => {
                  const originalIndex = testimonialsData.findIndex(t => t.name === testimonial.name);
                  setCurrentIndex(originalIndex);
                }}
              >
                <CardContent className="p-6">
                  <div className="flex space-x-1 mb-3">
                    {renderStars(testimonial.stars).slice(0, 5)}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    "{testimonial.message}"
                  </p>
                  <p className="text-navy font-medium text-sm">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-8 text-sm text-gray-500">
          {isAutoPlaying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
              Depoimentos em reprodução automática
            </span>
          ) : (
            <span>Passe o mouse para pausar a reprodução</span>
          )}
        </div>
      </div>
    </section>
  );
}
