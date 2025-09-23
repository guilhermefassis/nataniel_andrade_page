import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import CurriculumSection from "@/components/curriculum-section";
import CoursesCarousel from "@/components/courses-carousel";
import TestimonialsSection from "@/components/testimonials-section";
import YouTubeCarousel from "@/components/youtube-carousel";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CurriculumSection />
        <CoursesCarousel />
        <TestimonialsSection />
        <YouTubeCarousel />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
