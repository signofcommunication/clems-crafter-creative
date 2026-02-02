"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full bg-background px-6 py-32 sm:px-8 lg:px-12"
    >
      {/* Soft brand wash to blend with the curved hero bridge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 sm:h-80"
        style={{
          background:
            "radial-gradient(140% 120% at 50% 0%, color-mix(in oklch, var(--accent) 18%, transparent) 0%, color-mix(in oklch, var(--chart-3) 12%, transparent) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Extra subtle lift so the seam disappears */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 blur-2xl"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklch, var(--accent) 10%, transparent), rgba(0,0,0,0))",
        }}
      />

      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Headline */}
          <div className="max-w-2xl space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
              className="text-6xl sm:text-7xl font-light leading-tight text-foreground"
            >
              We are a creative studio focused on clarity, craft, and purpose.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              We partner with startups, UMKMs, and institutions to design
              digital experiences that are intentional and transformative. Our
              approach combines strategic thinking with meticulous execution,
              delivering solutions that resonate.
            </motion.p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border">
            {[
              {
                label: "For Startups",
                desc: "Rapid iteration and scalable systems that grow with your vision.",
              },
              {
                label: "For UMKMs",
                desc: "Strategic digital presence that elevates your market position.",
              },
              {
                label: "For Institutions",
                desc: "Robust solutions built with security and reliability at core.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                <p className="text-sm uppercase tracking-wide text-accent mb-3">
                  {item.label}
                </p>
                <p className="text-foreground/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
