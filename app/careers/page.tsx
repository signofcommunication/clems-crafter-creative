import { CareersSection } from "@/components/sections/careers-section";
import { FooterSection } from "@/components/sections/footer-section";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "Careers | Clems Grafter Creative",
  description:
    "Join our team of creative professionals. Explore career opportunities at Clems Grafter Creative and help us craft digital experiences that inspire.",
};

export default function CareersPage() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen w-full">
        <CareersSection />
      </main>
      <FooterSection />
    </>
  );
}
