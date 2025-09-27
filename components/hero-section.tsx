"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock } from "lucide-react";
import { professionalData } from "@/lib/professional-data";
import { contactData } from "@/lib/contact-data";
import { scrollToElement } from "@/lib/utils";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContactClick = () => {
    scrollToElement("contact");
  };

  const handleAboutClick = () => {
    scrollToElement("about");
  };

  if (!mounted) {
    return <div className="h-screen bg-gradient-to-br from-navy to-teal" />;
  }

  return (
    <section
      id="hero"
      className="min-h-screen bg-gradient-to-br from-navy via-navy to-teal relative overflow-hidden pt-16 md:pt-20"
      role="banner"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />

      {/* Responsive background decorations */}
      <div className="absolute top-20 right-4 md:right-10 w-32 h-32 md:w-72 md:h-72 bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 md:bottom-20 left-4 md:left-10 w-48 h-48 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="flex items-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)]">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-8 md:py-12">
            {/* Text Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <div className="space-y-4 md:space-y-6 animate-fade-in-up">
                {/* Main Heading */}
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                    <span className="block">Nataniel</span>
                    <span className="block text-teal">Andrade</span>
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold font-semibold mt-2">
                    {contactData.tagline}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  {professionalData.bio}
                </p>

                {/* Social Proof Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 md:py-6">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-xl md:text-2xl font-bold">
                        +1500
                      </span>
                    </div>
                    <p className="text-white/80 text-xs md:text-sm">
                      Horas de Coaching
                    </p>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Users className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-xl md:text-2xl font-bold">7+</span>
                    </div>
                    <p className="text-white/80 text-xs md:text-sm">
                      Anos de Experiência
                    </p>
                  </div>
                  <div className="text-center lg:text-left col-span-2 md:col-span-1">
                    <div className="flex items-center justify-center lg:justify-start text-gold mb-1">
                      <Star className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span className="text-xl md:text-2xl font-bold">5.0</span>
                    </div>
                    <p className="text-white/80 text-xs md:text-sm">
                      Avaliação Média
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 pb-8 sm:pb-0">
                  <Button
                    onClick={handleContactClick}
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
                    aria-label="Descobrir potencial máximo - ir para contato"
                  >
                    {contactData.ctaText}
                  </Button>
                  <Button
                    onClick={handleAboutClick}
                    variant="outline"
                    size="lg"
                    className="bg-white hover:bg-white/90 text-navy font-semibold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
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
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/30 to-gold/20 rounded-full blur-xl scale-110" />

                  {/* Main image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 md:border-4 border-white/20 shadow-2xl">
                    <Image
                      src={professionalData.profileImage}
                      alt={`${professionalData.name} - Master Coach Integral Sistêmico`}
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 450px"
                    />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-gold text-navy px-2 py-1 md:px-4 md:py-2 rounded-full font-semibold text-xs md:text-sm shadow-lg animate-bounce [animation-delay:1s]">
                    Master Coach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-white/70 rounded-full mt-1 md:mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
