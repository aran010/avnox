import type { Metadata } from "next";

export const site = {
  name: "Avnox",
  legalName: "Avnox Solutions",
  tagline: "AI solutions. IT excellence. One partner.",
  description:
    "From AI strategy and custom solutions to cloud migration, staffing, software licensing, and enterprise IT hardware — Avnox is the single accountable technology partner that scales with you.",
  email: "hello@avnoxsolutions.com",
  linkedin: "https://www.linkedin.com",
  x: "https://x.com",
  instagram: "https://www.instagram.com",
  calendly: "/contact",
  url: "https://avnoxsolutions.com",
};

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
] as const;

export const metadataBase: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Avnox — AI Solutions & Enterprise IT Services",
    template: "%s — Avnox",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Avnox",
    "Avnox Solutions",
    "IT Consulting",
    "Enterprise IT Services",
    "AI Solutions",
    "Process Automation",
    "Cloud Migration",
    "Server Migration",
    "IT Staffing",
    "Manpower Outsourcing",
    "Software Licensing",
    "Enterprise Hardware Supply",
    "IT Equipment Leasing",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Avnox — Enterprise IT & Talent, Delivered by One Partner",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Avnox — Enterprise IT & Talent, Delivered by One Partner",
    description: site.description,
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
  },
};

export const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      email: site.email,
      description: site.description,
      contactPoint: {
        "@type": "ContactPoint",
        email: site.email,
        contactType: "sales",
        url: `${site.url}/contact`,
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: {
        "@id": `${site.url}/#organization`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: "Avnox Enterprise IT & AI Services",
      url: site.url,
      provider: {
        "@id": `${site.url}/#organization`,
      },
      areaServed: "Global",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise IT & Workforce Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "IT Consulting & Management",
              description:
                "IT strategy, project management, infrastructure oversight and end-to-end technical support.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Technology Solutions",
              description:
                "Custom AI solutions, workflow automation, data analytics and system integration.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud & Technology Migration",
              description:
                "Data, application, server, cloud and infrastructure migrations executed with continuity.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Staffing & Workforce Solutions",
              description:
                "Skilled, semi-skilled, technical, IT and administrative personnel outsourcing and placement.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Software & Licensing",
              description:
                "Enterprise software procurement, licensing compliance, import and distribution.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hardware & Equipment Supply",
              description:
                "Desktops, laptops, servers, networking, storage and office automation to buy, lease, rent or hire-purchase.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does Avnox offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Six service lines: IT consulting & management, AI & technology solutions, cloud & technology migration, staffing & workforce, software & licensing, and hardware & equipment supply.",
          },
        },
        {
          "@type": "Question",
          name: "Can you manage a complete cloud or server migration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We handle assessment, planning, execution and validation for data, application, server and infrastructure migrations, with phased cut-overs to protect continuity.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of staff can you provide?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Skilled, semi-skilled, technical, IT and administrative personnel — on contract, outsourced or through permanent recruitment and placement.",
          },
        },
        {
          "@type": "Question",
          name: "Do you sell, lease or rent hardware?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All three. Desktops, laptops, servers, networking, storage and office automation equipment are available to buy, lease, rent or on hire-purchase.",
          },
        },
      ],
    },
  ],
};
