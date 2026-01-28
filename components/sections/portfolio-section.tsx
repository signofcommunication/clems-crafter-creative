'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const clients = [
  'Tech Startups',
  'E-commerce',
  'Agencies',
  'SaaS Companies',
  'Retail Brands',
  'Institutions',
  'Fintech',
  'Healthcare',
];

export function PortfolioSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="w-full bg-background px-6 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            trusted by
          </p>
          <h2 className="text-5xl sm:text-6xl font-light text-foreground">
            Forward-thinking brands
          </h2>
        </motion.div>

        {/* Minimal client list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: index * 0.06,
                ease: 'easeOut',
              }}
              className="py-4 md:py-6 border-b border-border/50 hover:border-border transition-colors duration-300"
            >
              <p className="text-sm md:text-base text-foreground/80">{client}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
