"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const TextRevealLine = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: "easeOut",
        }}
        className="block"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Layer 2: Background gradient animation
const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-blue-950/30 to-background"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      {/* Teal glow - moves slowly (parallax effect) */}
      <motion.div
        className="absolute -top-1/3 -right-1/3 w-full h-full rounded-full bg-accent/8 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary glow */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-20">
      {/* Layer 2: Background animation */}
      <BackgroundGradient />

      {/* Navigation */}
      <header className="relative z-20 border-b border-border/30">
        <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg font-light tracking-wide text-foreground"
          >
            <Link
              href="#"
              className="inline-flex items-center"
              aria-label="Clems Crafter Creative"
            >
              <Image
                src="/CGC Logo.png"
                alt="Clems Crafter Creative"
                width={180}
                height={48}
                priority
                className="h-40 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#about"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#team"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground z-30"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/30 bg-background/80 backdrop-blur-sm"
          >
            <div className="px-6 py-4 space-y-4">
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#team"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Team
              </a>
              <a
                href="#contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-32 sm:py-40 lg:py-48">
        {/* Layer 1: Text animation */}
        <div className="max-w-4xl space-y-6 mb-16">
          <div className="space-y-1">
            <TextRevealLine delay={0.1}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-foreground tracking-tight">
                Clems Crafter
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.3}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-foreground tracking-tight">
                Creative
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.5}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light">
                <span className="text-foreground tracking-tight">
                  Crafting digital experiences
                </span>
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.7}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight">
                with <span className="text-accent">clarity</span> and purpose.
              </span>
            </TextRevealLine>
          </div>

          {/* Subtitle */}
          <TextRevealLine delay={0.9}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg pt-8">
              We create intentional digital products that resonate. Strategic,
              precise, and built to last.
            </p>
          </TextRevealLine>
        </div>

        {/* CTA Section */}
        <TextRevealLine delay={1.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-sm uppercase tracking-wide transition-all duration-300"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2"
                >
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Layer 3: Micro interaction - underline on link */}
            <motion.a
              href="#about"
              className="text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors relative inline-flex items-center gap-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="relative inline-flex items-center gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-accent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
            </motion.a>
          </div>
        </TextRevealLine>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Scroll
          </div>
          <svg
            className="w-5 h-5 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
