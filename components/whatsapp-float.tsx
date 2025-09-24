"use client";
import React, { useState } from "react";
import { contactData } from "@/lib/contact-data";
import { generateWhatsAppLink } from "@/lib/utils";

const WhatsappFloat = () => {
  const [hover, setHover] = useState(false);

  const whatsapp_url = generateWhatsAppLink(
    contactData.whatsapp,
    "Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais."
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {hover && (
        <div
          style={{
            marginBottom: "8px",
            background: "#fff",
            color: "#25d366",
            padding: "8px 16px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            fontWeight: "bold",
            transition: "opacity 0.2s",
            opacity: hover ? 1 : 0,
          }}
        >
          Fale conosco!
        </div>
      )}
      <a
        href={whatsapp_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#25d366",
          color: "#fff",
          borderRadius: "50%",
          textAlign: "center",
          fontSize: "30px",
          boxShadow: "2px 2px 3px #999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.2s",
          transform: hover ? "scale(1.1)" : "scale(1)",
        }}
        aria-label="Fale conosco no WhatsApp"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.1 2.36 7.1L4 29l7.18-2.34C13.1 27.13 14.52 27.5 16 27.5c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.3 0-2.56-.25-3.74-.74l-.27-.11-4.28 1.39 1.4-4.16-.18-.28C7.25 18.56 7 17.3 7 16c0-5 4-9 9-9s9 4 9 9-4 9-9 9zm5.07-6.25c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.66 1.13 2.85.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsappFloat;
