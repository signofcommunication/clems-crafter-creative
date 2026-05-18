"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const team = [
  {
    name: "Trianji Agus Dananto",
    role: "CEO",
    image: "/teams/pa anji.jpeg",
  },
  {
    name: "Haryanti Losiana",
    role: "COO",
    image: "/teams/bu yanti.jpeg",
  },
  {
    name: "Muhammad Fikri Hatim",
    role: "Dev Lead",
    image: "/teams/fikri.jpeg",
  },
  {
    name: "Ari Putra Frederick Leluly",
    role: "Fullstack Developer",
    image: "/teams/ari.png",
  },
  {
    name: "Jeriko Ichtus Seo",
    role: "Fullstack Developer",
    image: "/teams/jeriko.png",
  },
  {
    name: "Muhammad Zaki Algifari",
    role: "AI Engineer",
    image: "/teams/zaki.jpeg",
  },
  {
    name: "Muhammad Maula Albi Badalawa",
    role: "Research and Development",
    image: "/teams/albi.jpeg",
  },
];

export function TeamSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="team"
      ref={ref}
      className="w-full bg-muted px-6 py-32 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-6xl sm:text-7xl font-light text-foreground mb-20"
        >
          Meet the team
        </motion.h2>

        {/* Staggered grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className="group"
              style={{ marginTop: 0 }}
            >
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={420}
                    height={520}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </motion.div>
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-medium text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
