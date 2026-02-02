"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

export function FooterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="w-full bg-background border-t border-border px-6 sm:px-8 lg:px-12 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16"
        >
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-light text-foreground">
              Clems Grafter Creative
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              Digital experiences crafted with clarity and purpose. Building the
              future, one design at a time.
            </p>

            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.instagram.com/clemsgraftercreative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/clems-grafter-creative"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Navigate
            </p>
            <ul className="space-y-2">
              {["About", "Services", "Team", "Contact"].map(item => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Services
            </p>
            <ul className="space-y-2">
              {[
                "Web Development",
                "UI/UX Design",
                "Brand Identity",
                "Digital Products",
              ].map(item => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
              Contact
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:anjidananto@clemsgraftercreative.com"
                  className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
                >
                  anjidananto@clemsgraftercreative.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:haryantilosiana@clemsgraftercreative.com"
                  className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
                >
                  haryantilosiana@clemsgraftercreative.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+628881513797"
                  className="text-sm text-foreground/60 hover:text-accent transition-colors duration-300"
                >
                  +62 (888) 1513-797
                </a>
              </li>
              <li className="text-sm text-foreground/60 leading-relaxed">
                Jl. H. Juhri, RT.8/RW.2, Meruya Sel., Kec. Kembangan, Jakarta
                Barat 11650
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-px bg-border mb-8"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50"
        >
          <p>© {currentYear} Clems Grafter Creative. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-accent transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-accent transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
