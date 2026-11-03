import type { Metadata } from "next";

export const site = {
  name: "Avnox",
  tagline: "AI solutions. IT excellence. One partner.",
  description: "Avnox — AI solutions & enterprise IT services",
  email: "hello@avnoxsolutions.com",
  linkedin: "[LinkedIn URL]",
  x: "[X URL]",
  instagram: "[Instagram URL]",
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
  title: {
    default: "Avnox — AI Solutions & Enterprise IT Services",
    template: `%s — Avnox`,
  },
  description:
    "From AI strategy and custom solutions to cloud migration, staffing, and enterprise IT — Avnox is the technology partner that scales with you.",
};
