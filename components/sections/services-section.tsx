"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronRight,
  Code2,
  Palette,
  Sparkles,
  Package,
  Lightbulb,
  Wrench,
  Brain,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Website & Systems",
    description:
      "Custom web applications built with modern technologies, designed for performance and scale.",
    icon: Code2,
  },
  {
    number: "02",
    title: "UI / UX Design",
    description:
      "Thoughtful interface design that balances aesthetics with usability and user intent.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Brand Identity",
    description:
      "Strategic branding that communicates your values and resonates with your audience.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "AI Solutions",
    description:
      "Intelligent automation and machine learning solutions that transform your business processes and unlock new possibilities.",
    icon: Brain,
  },
  {
    number: "05",
    title: "Digital Products",
    description:
      "End-to-end product development from strategy and design to launch and refinement.",
    icon: Package,
  },
  {
    number: "06",
    title: "Consulting",
    description:
      "Strategic guidance on digital transformation, technology choices, and organizational growth.",
    icon: Lightbulb,
  },
  {
    number: "07",
    title: "Support & Maintenance",
    description:
      "Ongoing optimization and support to keep your digital presence performing at its best.",
    icon: Wrench,
  },
];

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <section
      id="services"
      ref={ref}
      className="relative w-full bg-background px-6 py-32 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Animated gradient background overlay - spotlight effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving spotlight 1 - from top left */}
        <motion.div
          className="absolute w-[600px] h-[600px] opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 123, 223, 0.6) 0%, rgba(0, 123, 223, 0.4) 30%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [-100, 100, -100],
            y: [-100, 150, -100],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Moving spotlight 2 - from right */}
        <motion.div
          className="absolute right-0 w-[500px] h-[700px] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(100, 200, 255, 0.7) 0%, rgba(100, 200, 255, 0.5) 25%, transparent 60%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [100, -50, 100],
            y: [50, -100, 50],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Spotlight 3 - bottom left, pulsing */}
        <motion.div
          className="absolute bottom-0 left-0 w-[550px] h-[550px] opacity-30"
          style={{
            background:
              "conic-gradient(from 45deg, rgba(0, 200, 200, 0.5) 0%, transparent 50%, rgba(150, 255, 150, 0.4) 100%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.4, 0.25, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center moving beam effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] opacity-20"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0, 123, 223, 0.8) 50%, transparent 100%)",
            filter: "blur(90px)",
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Ambient glow particles */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-[200px] h-[200px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(180, 255, 180, 0.8) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-6xl sm:text-7xl font-light text-foreground mb-20"
        >
          Services
        </motion.h2>

        <div className="space-y-px border-t border-border">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className="group border-b border-border py-8 cursor-pointer transition-all duration-300 hover:bg-accent/5 rounded-lg px-4"
            >
              <div className="flex items-start gap-6 md:gap-12">
                {/* Icon with animated background */}
                <motion.div
                  className="flex-shrink-0 relative"
                  animate={
                    hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/10 to-chart-3/10 border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
                    <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent group-hover:text-accent/90 transition-colors duration-300" />

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-accent/20 rounded-xl blur-md"
                      initial={{ opacity: 0 }}
                      animate={
                        hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center">
                    <span className="text-xs font-light text-muted-foreground group-hover:text-accent transition-colors duration-300">
                      {service.number}
                    </span>
                  </div>
                </motion.div>

                <div className="flex-grow">
                  <motion.h3
                    initial={{ opacity: 0.8 }}
                    animate={
                      hoveredIndex === index ? { opacity: 1 } : { opacity: 0.8 }
                    }
                    transition={{ duration: 0.3 }}
                    className="text-2xl sm:text-3xl font-light text-foreground mb-3 group-hover:text-accent transition-colors duration-300"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      hoveredIndex === index
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-foreground/70 text-base leading-relaxed overflow-hidden"
                  >
                    {service.description}
                  </motion.p>
                </div>

                <motion.div
                  className="flex-shrink-0 mt-2"
                  animate={hoveredIndex === index ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
