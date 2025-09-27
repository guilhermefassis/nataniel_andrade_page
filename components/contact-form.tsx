"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { contactData } from "@/lib/contact-data";
import { generateWhatsAppLink } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(200, "Email deve ter no máximo 200 caracteres"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length >= 10,
      "Telefone deve ter pelo menos 10 dígitos"
    ),
  subject: z
    .string()
    .min(1, "Assunto deve ter pelo menos 5 caracteres")
    .max(200, "Assunto deve ter no máximo 200 caracteres"),
  message: z.string().max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
  consent: z
    .boolean()
    .refine(
      (val) => val === true,
      "Você deve aceitar os termos para continuar"
    ),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setShowWhatsApp(true);
        form.reset();
      } else {
        throw new Error("Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    }
  };

  const sendToWhatsApp = () => {
    const formData = form.getValues();
    const message = `Olá! Meu nome é ${formData.name}.

*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}

*Contatos:*
📧 Email: ${formData.email}
${formData.phone ? `📱 Telefone: ${formData.phone}` : ""}

Aguardo seu retorno!`;

    const whatsappUrl = generateWhatsAppLink(contactData.whatsapp, message);
    window.open(whatsappUrl, "_blank");
    setShowWhatsApp(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: contactData.whatsapp,
      href: generateWhatsAppLink(
        contactData.whatsapp,
        contactData.whatsappMessage
      ),
    },
    {
      icon: Mail,
      label: "Email",
      value: contactData.email,
      href: `mailto:${contactData.email}`,
    },
    {
      icon: MapPin,
      label: "Localização",
      value: contactData.location,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding bg-navy"
      role="main"
      aria-labelledby="contact-title"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20 mb-4"
          >
            Entre em Contato
          </Badge>

          <h2
            id="contact-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Vamos começar sua <span className="text-teal">transformação</span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Estou aqui para ajudar você a descobrir seu potencial máximo. Entre
            em contato e vamos conversar sobre seus objetivos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={info.label}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 bg-teal/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-teal" />
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-teal transition-colors duration-200 font-medium"
                            target={
                              info.label === "WhatsApp" ? "_blank" : undefined
                            }
                            rel={
                              info.label === "WhatsApp"
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-xl font-semibold text-white mb-4">
                Por que escolher nosso coaching?
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal mb-1">+1500</div>
                  <div className="text-white/70 text-sm">Horas de Coaching</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold mb-1">7+</div>
                  <div className="text-white/70 text-sm">
                    Anos de Experiência
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal mb-1">100%</div>
                  <div className="text-white/70 text-sm">Dedicação</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gold mb-1">5.0</div>
                  <div className="text-white/70 text-sm">Avaliação</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-navy">
                Envie sua mensagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" && !showWhatsApp && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Mensagem enviada com sucesso! Retornaremos em breve.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 font-medium">
                      Erro ao enviar mensagem. Tente novamente.
                    </p>
                  </div>
                </div>
              )}

              {showWhatsApp && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-center">
                    <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium mb-3">
                      Gostaria de enviar sua mensagem também via WhatsApp?
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={sendToWhatsApp}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Enviar via WhatsApp
                      </Button>
                      <Button
                        onClick={() => setShowWhatsApp(false)}
                        variant="outline"
                        size="sm"
                      >
                        Não, obrigado
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-navy font-medium">
                      Nome *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      className="mt-1"
                      {...form.register("name")}
                      aria-describedby={
                        form.formState.errors.name ? "name-error" : undefined
                      }
                    />
                    {form.formState.errors.name && (
                      <p id="name-error" className="text-red-600 text-sm mt-1">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-navy font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="mt-1"
                      {...form.register("email")}
                      aria-describedby={
                        form.formState.errors.email ? "email-error" : undefined
                      }
                    />
                    {form.formState.errors.email && (
                      <p id="email-error" className="text-red-600 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-navy font-medium">
                      Telefone/WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      placeholder="(99) 99999-9999"
                      className="mt-1"
                      {...form.register("phone")}
                      aria-describedby={
                        form.formState.errors.phone ? "phone-error" : undefined
                      }
                    />
                    {form.formState.errors.phone && (
                      <p id="phone-error" className="text-red-600 text-sm mt-1">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-navy font-medium">
                      Assunto *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Sobre o que gostaria de falar?"
                      className="mt-1"
                      {...form.register("subject")}
                      aria-describedby={
                        form.formState.errors.subject
                          ? "subject-error"
                          : undefined
                      }
                    />
                    {form.formState.errors.subject && (
                      <p
                        id="subject-error"
                        className="text-red-600 text-sm mt-1"
                      >
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-navy font-medium">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Conte-me mais sobre seus objetivos e como posso ajudar..."
                    className="mt-1 min-h-[120px]"
                    {...form.register("message")}
                    aria-describedby={
                      form.formState.errors.message
                        ? "message-error"
                        : undefined
                    }
                  />
                  {form.formState.errors.message && (
                    <p id="message-error" className="text-red-600 text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <Controller
                    name="consent"
                    control={form.control}
                    render={({ field }) => (
                      <Checkbox
                        id="consent"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-describedby={
                          form.formState.errors.consent
                            ? "consent-error"
                            : undefined
                        }
                      />
                    )}
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="consent"
                      className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                    >
                      Aceito que meus dados sejam utilizados para entrar em
                      contato comigo e concordo com a{" "}
                      <a
                        href="/privacy-policy"
                        className="text-teal hover:underline"
                      >
                        Política de Privacidade
                      </a>{" "}
                      e{" "}
                      <a href="/terms" className="text-teal hover:underline">
                        Termos de Uso
                      </a>
                      . *
                    </Label>
                    {form.formState.errors.consent && (
                      <p
                        id="consent-error"
                        className="text-red-600 text-sm mt-1"
                      >
                        {form.formState.errors.consent.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-3"
                  disabled={submitStatus === "loading"}
                >
                  {submitStatus === "loading" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
