
"use client";

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { contactData } from '@/lib/contact-data';
import { generateWhatsAppLink } from '@/lib/utils';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show after 3 seconds on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    const whatsappUrl = generateWhatsAppLink(
      contactData.whatsapp,
      contactData.whatsappMessage
    );
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Analytics tracking (if needed)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'click', {
        event_category: 'Contact',
        event_label: 'WhatsApp Float Button'
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2"
        aria-label="Abrir conversa no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 mx-auto" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:animate-none" />
        
        {/* Tooltip */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Fale comigo no WhatsApp
            {/* Arrow */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
          </div>
        </div>

        {/* Notification dot (optional) */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>
      </button>
    </div>
  );
}
