"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const clients = [
  { name: "Allianz", logo: "/brands/allianz-2.svg" },
  { name: "BCA", logo: "/brands/bca-bank-central-asia.svg" },
  { name: "CAT", logo: "/brands/cat-1.svg" },
  { name: "Pertamina", logo: "/brands/pertamina-logo-1.svg" },
  { name: "Swim Plannr", logo: "/brands/swim plannr.png" },
  { name: "Telecats", logo: "/brands/telecats.png" },
  { name: "Toyota", logo: "/brands/toyota-1.svg" },
  { name: "Trengo", logo: "/brands/trengo.png" },
];

export function PortfolioSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-background px-6 py-20 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Our Clients
          </p>
          <h2 className="text-4xl sm:text-5xl font-light text-foreground">
            Trusted by forward-thinking brands
          </h2>
        </motion.div>

        {/* Infinite scrolling marquee */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />{" "}
          {/* Scrolling container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 py-8"
              animate={{
                x: [0, -100 * clients.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {" "}
              {/* Render clients twice for seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center min-w-[180px] h-20"
                >
                  <div className="relative px-6 py-4 rounded-lg bg-white dark:bg-slate-100 border border-border/40 hover:border-accent/40 transition-all hover:shadow-md">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={80}
                      className="w-auto h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
