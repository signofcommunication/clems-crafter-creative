"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Button } from "../ui/button";
import { Send, Instagram, Linkedin } from "lucide-react";
import { sendContactMessage } from "../../lib/contact-notification";
import { WHATSAPP_HREF } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../icons/whatsapp-icon";

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const success = await sendContactMessage(formData);

    if (success) {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full bg-muted px-6 py-32 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-6xl sm:text-7xl font-light text-foreground max-w-2xl leading-tight">
            Let's build something that lasts.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="space-y-12"
          >
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Email
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:anjidananto@clemsgraftercreative.com"
                  className="block text-lg text-foreground hover:text-accent transition-colors duration-300"
                >
                  anjidananto@clemsgraftercreative.com
                </a>
                <a
                  href="mailto:haryantilosiana@clemsgraftercreative.com"
                  className="block text-lg text-foreground hover:text-accent transition-colors duration-300"
                >
                  haryantilosiana@clemsgraftercreative.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Phone
              </p>
              <a
                href="tel:+628881513797"
                className="text-lg text-foreground hover:text-accent transition-colors duration-300"
              >
                +62 (888) 1513-797
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                WhatsApp
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-foreground hover:text-accent transition-colors duration-300"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat via WhatsApp</span>
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Location
              </p>
              <p className="text-lg text-foreground leading-relaxed max-w-sm">
                Jl. H. Juhri, RT.8/RW.2, Meruya Sel., Kec. Kembangan, Jakarta
                Barat 11650
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/clemsgraftercreative/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-foreground hover:text-accent transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/clems-grafter-creative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-foreground hover:text-accent transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm uppercase tracking-wide text-muted-foreground mb-3"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-border text-foreground placeholder-muted-foreground py-3 focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm uppercase tracking-wide text-muted-foreground mb-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-border text-foreground placeholder-muted-foreground py-3 focus:outline-none focus:border-accent transition-colors duration-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm uppercase tracking-wide text-muted-foreground mb-3"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-border text-foreground placeholder-muted-foreground py-3 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="pt-4 relative group">
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-accent via-chart-3 to-accent rounded-lg opacity-0 group-hover:opacity-25 blur-lg transition-opacity duration-500"
                initial={{ opacity: 0 }}
              />

              {/* Animated particles on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-accent rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                    whileHover={{
                      scale: [0, 1, 0],
                      x: [0, Math.cos((i * Math.PI * 2) / 6) * 40],
                      y: [0, Math.sin((i * Math.PI * 2) / 6) * 40],
                      opacity: [0, 1, 0],
                      transition: {
                        duration: 0.6,
                        delay: i * 0.05,
                        ease: "easeOut",
                      },
                    }}
                  />
                ))}
              </motion.div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="relative bg-foreground text-background hover:bg-accent hover:text-muted px-8 py-3 text-sm uppercase tracking-wide transition-all duration-300 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                <span className="relative z-10 inline-flex items-center gap-2">
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {/* Icon with pulse animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </motion.div>
                </span>
              </Button>
            </div>

            {status === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-accent"
              >
                Thank you. We'll be in touch soon.
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                Something went wrong. Please try again or email us directly.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
