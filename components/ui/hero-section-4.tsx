"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import React, { useState, useEffect } from "react";
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

// Layer 2: Background video + gradient overlay
const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/CGC Video Motion.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay to blend video with design */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background/80 via-blue-700/50 to-background/80"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      {/* Wave-like glow that "washes in" like ocean wave (one-time, slow) */}
      <motion.div
        className="absolute -top-1/3 -right-1/3 w-full h-full rounded-full bg-accent/10 blur-3xl"
        initial={{ x: -200, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          duration: 3.5,
          ease: [0.16, 1, 0.3, 1], // smooth wave-like easing
          delay: 0.5,
        }}
      />

      {/* Secondary glow (subtle, one-time) */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-accent/6 blur-3xl"
        initial={{ x: 150, y: -80, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          duration: 4,
          ease: [0.16, 1, 0.3, 1],
          delay: 1.2,
        }}
      />
    </div>
  );
};

export function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-24 sm:pt-28">
      {/* Layer 2: Background animation */}
      <BackgroundGradient />
      {/* Curved bridge to next section (softens the hard line) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
      >
        <div
          className="mx-auto h-44 sm:h-64 w-[160%] -translate-x-[15%] rounded-t-[120%] blur-3xl opacity-70"
          style={{
            background:
              "radial-gradient(140% 120% at 50% 100%, color-mix(in oklch, var(--accent) 16%, transparent) 0%, color-mix(in oklch, var(--chart-2) 12%, transparent) 38%, color-mix(in oklch, var(--chart-3) 10%, transparent) 62%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>{" "}
      {/* Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-20 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "border-b border-border/30"
        }`}
      >
        <nav
          className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-3" : "py-4"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg font-light tracking-wide text-foreground"
          >
            {" "}
            <Link
              href="#"
              className="inline-flex items-center"
              aria-label="Clems Grafter Creative"
            >
              <Image
                src="/CGC Logo.png"
                alt="Clems Grafter Creative"
                width={180}
                height={48}
                priority
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? "h-30 sm:h-30" : "h-40 sm:h-40"
                }`}
              />
            </Link>
          </motion.div>{" "}
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#about"
              className="text-lg text-gray-200 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-lg text-gray-200 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#team"
              className="text-lg text-gray-200 hover:text-white transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-lg text-gray-200 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white z-30"
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
            {" "}
            <div className="px-6 py-4 space-y-4">
              <a
                href="#about"
                className="block text-sm text-gray-200 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="block text-sm text-gray-200 hover:text-white transition-colors"
              >
                Services
              </a>
              <a
                href="#team"
                className="block text-sm text-gray-200 hover:text-white transition-colors"
              >
                Team
              </a>
              <a
                href="#contact"
                className="block text-sm text-gray-200 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </header>
      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-32 sm:py-40 lg:py-48">
        {" "}
        {/* Layer 1: Text animation */}
        <div className="max-w-4xl space-y-6 mb-16">
          <div className="space-y-1">
            <TextRevealLine delay={0.1}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight drop-shadow-lg">
                Clems Grafter
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.3}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight drop-shadow-lg">
                Creative
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.5}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light">
                <span className="text-white tracking-tight drop-shadow-lg">
                  Crafting digital experiences
                </span>
              </span>
            </TextRevealLine>
            <TextRevealLine delay={0.7}>
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight">
                with{" "}
                <span className="text-accent drop-shadow-[0_0_20px_rgba(0,123,223,0.5)]">
                  clarity
                </span>{" "}
                and <span className="text-white drop-shadow-lg">purpose.</span>
              </span>
            </TextRevealLine>
          </div>

          {/* Subtitle */}
          <TextRevealLine delay={0.9}>
            <p className="text-base sm:text-lg text-gray-200 max-w-lg pt-8 drop-shadow-md">
              We create intentional digital products that resonate. Strategic,
              precise, and built to last.
            </p>
          </TextRevealLine>
        </div>{" "}
        {/* CTA Section */}
        <TextRevealLine delay={1.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <motion.div
              className="relative group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-accent via-chart-3 to-accent rounded-lg opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                initial={{ opacity: 0 }}
              />

              {/* Animated particles/sparks on hover */}
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
                asChild
                className="relative bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-3 text-sm uppercase tracking-wide transition-all duration-300 overflow-hidden"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    }}
                  />

                  <span className="relative z-10">Start a Project</span>

                  {/* Arrow with bounce animation */}
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="h-4 w-4 relative z-10" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>{" "}
            {/* Layer 3: Micro interaction - underline on link */}
            <motion.a
              href="#about"
              className="text-sm uppercase tracking-wide text-gray-300 hover:text-white transition-colors relative inline-flex items-center gap-2"
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
        </TextRevealLine>{" "}
        {/* Client marquee - bottom left */}
        <motion.div
          className="absolute bottom-8 left-6 sm:left-8 lg:left-12 z-10 max-w-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-widest text-gray-300 mb-3 drop-shadow-md">
            Trusted by:
          </p>
          <div className="relative overflow-hidden">
            {/* Blur fade on right edge */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 backdrop-blur-sm z-10 pointer-events-none"
              style={{
                maskImage: "linear-gradient(to left, black, transparent)",
                WebkitMaskImage: "linear-gradient(to left, black, transparent)",
              }}
            />

            <div className="flex overflow-hidden">
              <motion.div
                className="flex gap-6 items-center"
                animate={{
                  x: [0, -100 * 8],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[
                  { name: "Allianz", logo: "/brands/allianz-2.svg" },
                  { name: "BCA", logo: "/brands/bca-bank-central-asia.svg" },
                  { name: "CAT", logo: "/brands/cat-1.svg" },
                  { name: "Pertamina", logo: "/brands/pertamina-logo-1.svg" },
                  { name: "Swim Plannr", logo: "/brands/swim plannr.png" },
                  { name: "Telecats", logo: "/brands/telecats.png" },
                  { name: "Toyota", logo: "/brands/toyota-1.svg" },
                  { name: "Trengo", logo: "/brands/trengo.png" },
                  { name: "Allianz", logo: "/brands/allianz-2.svg" },
                  { name: "BCA", logo: "/brands/bca-bank-central-asia.svg" },
                  { name: "CAT", logo: "/brands/cat-1.svg" },
                  { name: "Pertamina", logo: "/brands/pertamina-logo-1.svg" },
                ].map((client, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-3 py-2 rounded-md bg-white dark:bg-slate-100"
                  >
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={80}
                      height={40}
                      className="w-auto h-6 object-contain opacity-70"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
