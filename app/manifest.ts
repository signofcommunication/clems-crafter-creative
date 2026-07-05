import type { MetadataRoute } from "next";

// Required for static export
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clems Grafter Creative | Digital Agency Jakarta",
    short_name: "CGC",
    description:
      "Leading digital agency in Jakarta specializing in web development, UI/UX design, brand identity, and AI solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#007BDF",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["business", "technology", "design"],
    lang: "id-ID",
    dir: "ltr",
  };
}
