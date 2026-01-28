'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    number: '01',
    title: 'Website & Systems',
    description: 'Custom web applications built with modern technologies, designed for performance and scale.',
  },
  {
    number: '02',
    title: 'UI / UX Design',
    description: 'Thoughtful interface design that balances aesthetics with usability and user intent.',
  },
  {
    number: '03',
    title: 'Brand Identity',
    description: 'Strategic branding that communicates your values and resonates with your audience.',
  },
  {
    number: '04',
    title: 'Digital Products',
    description: 'End-to-end product development from strategy and design to launch and refinement.',
  },
  {
    number: '05',
    title: 'Consulting',
    description: 'Strategic guidance on digital transformation, technology choices, and organizational growth.',
  },
  {
    number: '06',
    title: 'Support & Maintenance',
    description: 'Ongoing optimization and support to keep your digital presence performing at its best.',
  },
];

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <section ref={ref} className="w-full bg-background px-6 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
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
              transition={{ duration: 0.7, delay: index * 0.05, ease: 'easeOut' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className="group border-b border-border py-8 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-start gap-8 md:gap-16">
                <div className="flex-shrink-0 w-12 text-lg font-light text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  {service.number}
                </div>

                <div className="flex-grow">
                  <motion.h3
                    initial={{ opacity: 0.8 }}
                    animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl sm:text-3xl font-light text-foreground mb-3 group-hover:text-accent transition-colors duration-300"
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      hoveredIndex === index
                        ? { height: 'auto', opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
