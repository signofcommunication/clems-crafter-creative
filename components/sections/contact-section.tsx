'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Button } from '../ui/button';

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="w-full bg-muted px-6 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
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
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="space-y-12"
          >
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Email
              </p>
              <a
                href="mailto:hello@clemscrafter.com"
                className="text-lg text-foreground hover:text-accent transition-colors duration-300"
              >
                hello@clemscrafter.com
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Phone
              </p>
              <a
                href="tel:+1234567890"
                className="text-lg text-foreground hover:text-accent transition-colors duration-300"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                Location
              </p>
              <p className="text-lg text-foreground">Jakarta, Indonesia</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm uppercase tracking-wide text-muted-foreground mb-3">
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
              <label htmlFor="email" className="block text-sm uppercase tracking-wide text-muted-foreground mb-3">
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
              <label htmlFor="message" className="block text-sm uppercase tracking-wide text-muted-foreground mb-3">
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

            <div className="pt-4">
              <Button
                type="submit"
                className="bg-foreground text-background hover:bg-accent hover:text-muted px-8 py-3 text-sm uppercase tracking-wide transition-all duration-300"
              >
                Send Message
              </Button>
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-accent"
              >
                Thank you. We'll be in touch soon.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
