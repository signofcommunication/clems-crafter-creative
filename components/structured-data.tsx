import React from "react";

/**
 * JSON-LD Structured Data for SEO
 * Helps search engines understand your business better
 */
export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization
      {
        "@type": "Organization",
        "@id": "https://clemsgraftercreative.com/#organization",
        name: "Clems Grafter Creative",
        url: "https://clemsgraftercreative.com",
        logo: {
          "@type": "ImageObject",
          url: "https://clemsgraftercreative.com/CGC Logo.png",
          width: 512,
          height: 512,
        },
        description:
          "Leading digital agency in Jakarta specializing in web development, UI/UX design, brand identity, and AI solutions.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. H. Juhri, RT.8/RW.2, Meruya Sel.",
          addressLocality: "Kec. Kembangan",
          addressRegion: "Jakarta Barat",
          postalCode: "11650",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -6.17511,
          longitude: 106.865036,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+62-888-1513-797",
            contactType: "customer service",
            areaServed: "ID",
            availableLanguage: ["Indonesian", "English"],
          },
        ],
        email: "anjidananto@clemsgraftercreative.com",
        sameAs: [
          "https://www.instagram.com/clemsgraftercreative/",
          "https://www.linkedin.com/company/clems-grafter-creative",
        ],
        founder: {
          "@type": "Person",
          name: "Anji Dananto",
        },
        foundingDate: "2020",
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
      },
      // Website
      {
        "@type": "WebSite",
        "@id": "https://clemsgraftercreative.com/#website",
        url: "https://clemsgraftercreative.com",
        name: "Clems Grafter Creative",
        description:
          "Leading digital agency in Jakarta specializing in web development, UI/UX design, brand identity, and AI solutions.",
        publisher: {
          "@id": "https://clemsgraftercreative.com/#organization",
        },
        inLanguage: "id-ID",
      },
      // Professional Service
      {
        "@type": "ProfessionalService",
        "@id": "https://clemsgraftercreative.com/#service",
        name: "Clems Grafter Creative",
        image: "https://clemsgraftercreative.com/CGC Logo.png",
        url: "https://clemsgraftercreative.com",
        telephone: "+62-888-1513-797",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. H. Juhri, RT.8/RW.2, Meruya Sel.",
          addressLocality: "Kec. Kembangan",
          addressRegion: "Jakarta Barat",
          postalCode: "11650",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -6.17511,
          longitude: 106.865036,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "24",
        },
      },
      // Service offerings
      {
        "@type": "Service",
        serviceType: "Web Development",
        provider: {
          "@id": "https://clemsgraftercreative.com/#organization",
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web Development",
                description: "Custom websites and web applications",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UI/UX Design",
                description: "User interface and experience design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brand Identity",
                description: "Logo design and brand strategy",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Solutions",
                description: "AI integration and intelligent systems",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Product Design",
                description: "End-to-end product design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Innovation Lab",
                description: "R&D and prototyping",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Maintenance & Support",
                description: "Ongoing support and maintenance",
              },
            },
          ],
        },
      },
      // BreadcrumbList for navigation
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://clemsgraftercreative.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://clemsgraftercreative.com#about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Services",
            item: "https://clemsgraftercreative.com#services",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Team",
            item: "https://clemsgraftercreative.com#team",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: "https://clemsgraftercreative.com#contact",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
