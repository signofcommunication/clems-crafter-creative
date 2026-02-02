import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// Comprehensive SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://clemsgraftercreative.com"), // Replace with your actual domain
  title: {
    default:
      "Clems Grafter Creative | Digital Agency Jakarta | Web Development & Design",
    template: "%s | Clems Grafter Creative",
  },
  description:
    "Leading digital agency in Jakarta specializing in web development, UI/UX design, brand identity, and AI solutions. Transform your business with strategic digital experiences. Trusted by Allianz, BCA, Toyota, and Pertamina.",
  keywords: [
    "digital agency Jakarta",
    "web development Jakarta",
    "UI/UX design Indonesia",
    "brand identity Jakarta",
    "AI solutions Indonesia",
    "creative agency Jakarta Barat",
    "website development",
    "mobile app development",
    "digital transformation",
    "startups Indonesia",
    "UMKM digital solutions",
    "Clems Grafter Creative",
  ],
  authors: [{ name: "Clems Grafter Creative" }],
  creator: "Clems Grafter Creative",
  publisher: "Clems Grafter Creative",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://clemsgraftercreative.com",
    siteName: "Clems Grafter Creative",
    title: "Clems Grafter Creative | Digital Agency Jakarta",
    description:
      "Transform your business with strategic digital experiences. Web development, UI/UX design, and AI solutions from Jakarta's leading creative agency.",
    images: [
      {
        url: "/CGC Logo.png",
        width: 1200,
        height: 630,
        alt: "Clems Grafter Creative - Digital Agency Jakarta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clems Grafter Creative | Digital Agency Jakarta",
    description:
      "Transform your business with strategic digital experiences. Web development, UI/UX design, and AI solutions.",
    images: ["/CGC Logo.png"],
    creator: "@clemsgraftercreative",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon",
      },
      {
        url: "/CGC Logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/CGC Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: "https://clemsgraftercreative.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Geo targeting */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.175110;106.865036" />
        <meta name="ICBM" content="-6.175110, 106.865036" />
      </head>
      <body className={`font-sans antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
