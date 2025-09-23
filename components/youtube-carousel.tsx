
"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, ChevronLeft, ChevronRight, Youtube, X } from 'lucide-react';
import { youtubeVideos } from '@/lib/professional-data';
import { getYouTubeId, getYouTubeThumbnail } from '@/lib/utils';

export default function YouTubeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof youtubeVideos[0] | null>(null);
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

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % youtubeVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? youtubeVideos.length - 1 : prev - 1
    );
  };

  const openVideoModal = (video: typeof youtubeVideos[0]) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const getEmbedUrl = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) {
        if (event.key === 'Escape') {
          closeModal();
        }
        return;
      }
      
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const visibleVideos = [
    youtubeVideos[currentIndex],
    youtubeVideos[(currentIndex + 1) % youtubeVideos.length],
    youtubeVideos[(currentIndex + 2) % youtubeVideos.length],
  ].filter(Boolean);

  return (
    <section 
      ref={sectionRef}
      id="youtube" 
      className="section-padding bg-beige"
      role="main"
      aria-labelledby="youtube-title"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge 
            variant="secondary" 
            className="bg-red-50 text-red-600 border-red-200 mb-4"
          >
            <Youtube className="w-4 h-4 mr-2" />
            Conteúdos no YouTube
          </Badge>
          
          <h2 
            id="youtube-title"
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Vídeos{' '}
            <span className="text-teal">Inspiradores</span>
          </h2>
          
          <p 
            className={`text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Assista aos nossos conteúdos exclusivos sobre desenvolvimento pessoal, 
            coaching e transformação de vidas.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 z-10"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="w-6 h-6 text-navy" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 z-10"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="w-6 h-6 text-navy" />
          </button>

          {/* Video Cards */}
          <div 
            className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {visibleVideos.map((video, index) => {
              const isMain = index === 0;
              return (
                <Card 
                  key={video.title + index}
                  className={`card-hover border-0 shadow-lg cursor-pointer ${
                    isMain ? 'md:col-span-2 md:row-span-1' : ''
                  }`}
                  onClick={() => openVideoModal(video)}
                >
                  <CardContent className="p-0">
                    <div className={`relative ${
                      isMain ? 'h-64 md:h-80' : 'h-64'
                    } bg-black rounded-lg overflow-hidden group`}>
                      <Image
                        src={getYouTubeThumbnail(video.url)}
                        alt={`Thumbnail do vídeo: ${video.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes={isMain ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      />
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-200">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>

                      {/* YouTube badge */}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-red-600 text-white">
                          <Youtube className="w-3 h-3 mr-1" />
                          YouTube
                        </Badge>
                      </div>

                      {/* Duration badge (if available) */}
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-black/70 text-white text-xs">
                          Short
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className={`font-semibold text-navy line-clamp-2 ${
                        isMain ? 'text-lg md:text-xl' : 'text-base'
                      }`}>
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        Nataniel Andrade
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {youtubeVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-red-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ver vídeo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            Gostou do conteúdo? Inscreva-se no canal para não perder novos vídeos!
          </p>
          <Button 
            asChild
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3"
          >
            <a 
              href="https://www.youtube.com/@natanielandrad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube className="w-5 h-5" />
              Inscrever-se no Canal
            </a>
          </Button>
        </div>

        {/* Video Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black">
            <DialogHeader className="sr-only">
              <DialogTitle>
                {selectedVideo?.title}
              </DialogTitle>
            </DialogHeader>
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Fechar vídeo"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {selectedVideo && (
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={getEmbedUrl(selectedVideo.url)}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
