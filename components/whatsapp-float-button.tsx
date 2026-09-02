"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Brain, Wrench, HelpCircle, X } from "lucide-react";
import { buildWhatsAppHref, WHATSAPP_SERVICES } from "../lib/whatsapp";
import { WhatsAppIcon } from "./icons/whatsapp-icon";

const SERVICE_ICONS = [Code2, Brain, Wrench, HelpCircle];

export function WhatsAppFloatButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Chat via WhatsApp"
            title="Chat via WhatsApp"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-accent hover:text-muted"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Pilih topik konsultasi WhatsApp"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border border-accent/30 bg-[oklch(0.19_0.02_250)] p-6 shadow-[0_0_60px_-10px_rgba(0,123,223,0.35)]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    Chat via WhatsApp
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Mau konsultasi soal apa?
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {WHATSAPP_SERVICES.map((service, index) => {
                  const Icon = SERVICE_ICONS[index] ?? HelpCircle;
                  return (
                    <a
                      key={service.label}
                      href={buildWhatsAppHref(service.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3 text-foreground transition-all duration-300 hover:border-accent/60 hover:bg-accent/5"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-sm">{service.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
