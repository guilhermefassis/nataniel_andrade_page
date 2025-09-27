"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { CourseItem } from "@/lib/types";

export default function CoursesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [coursesData, setCoursesData] = useState<CourseItem[]>([]);

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
  useEffect(() => {
    fetch("/api/admin/courses")
      .then((res) => res.json())
      .then((data) => setCoursesData(data))
      .catch(() => setCoursesData([]));
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, coursesData.length - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [prevSlide, nextSlide]);

  const translateX = -(currentIndex * (100 / cardsPerView));

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="section-padding bg-beige"
      role="main"
      aria-labelledby="courses-title"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-teal/10 text-teal border-teal/20 mb-4"
          >
            Cursos e Programas
          </Badge>

          <h2
            id="courses-title"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Cursos <span className="text-teal">Febracis</span>
          </h2>

          <p
            className={`text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Explore os programas de desenvolvimento que oferecemos, baseados nas
            metodologias mais avançadas de coaching e desenvolvimento humano.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative carousel-container overflow-hidden max-w-full"
          tabIndex={0}
          role="region"
          aria-label="Carrossel de cursos"
          aria-live="polite"
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`carousel-button prev ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
            aria-label="Slide anterior"
            type="button"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`carousel-button next ${
              currentIndex >= maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
            aria-label="Próximo slide"
            type="button"
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>

          {/* Carousel Track */}
          <div
            className="carousel-track flex transition-transform duration-500"
            style={{
              transform: `translateX(${translateX}%)`,
            }}
            aria-live="polite"
          >
            {coursesData.map((course, index) => (
              <div
                key={index || 0}
                className="px-3 transition-all duration-500"
                style={{
                  flex: `0 0 ${100 / cardsPerView}%`,
                }}
              >
                <Card className="h-full w-full card-hover border-0 shadow-lg">
                  <a
                    href={course?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={`Abrir página do curso ${course?.name} em nova aba`}
                  >
                    <CardHeader className="pb-4">
                      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <Image
                          src={course?.image || "/images/genetic-image.png"}
                          alt={`Imagem do curso ${course?.name}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-navy/80 text-white">
                            <BookOpen className="w-3 h-3 mr-1" />
                            Curso
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-navy line-clamp-2 min-h-[3.5rem]">
                        {course?.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0 flex flex-col h-full">
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
                        {course?.description}
                      </p>
                    </CardContent>
                  </a>

                  <Button
                    asChild
                    className="w-full bg-teal hover:bg-teal/90 text-white font-medium transition-colors duration-200"
                  >
                    <a
                      href={course?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      aria-label={`Saiba mais sobre ${course?.name} - abre em nova aba`}
                    >
                      Saiba Mais
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
