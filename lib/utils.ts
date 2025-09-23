import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

export function getYouTubeId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      // Para URLs padrões: youtube.com/watch?v=VIDEO_ID
      if (urlObj.searchParams.has("v")) {
        return urlObj.searchParams.get("v");
      }
      // Para shorts: youtube.com/shorts/VIDEO_ID
      const pathParts = urlObj.pathname.split("/");
      const shortsIndex = pathParts.indexOf("shorts");
      if (shortsIndex !== -1 && pathParts.length > shortsIndex + 1) {
        return pathParts[shortsIndex + 1];
      }
    }

    // Para URLs youtu.be/VIDEO_ID
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.substring(1);
    }

    return null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return "/images/genetic-image.png";
}

export function scrollToElement(elementId: string): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = formatWhatsAppMessage(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
