import { HeroSection } from "@/components/ui/hero-section-4";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamSection } from "@/components/sections/team-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "Clems Grafter Creative | Digital Agency",
  description:
    "Crafting digital experiences that inspire and convert. Web development, UI/UX design, and branding solutions for startups, UMKMs, and institutions.",
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen w-full">
        <HeroSection />
        <section id="about">
          <AboutSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="team">
          <TeamSection />
        </section>
        <PortfolioSection />
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <FooterSection />
    </>
  );
}
