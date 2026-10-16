import type { Metadata } from "next";

export const site = {
  name: "Avnox",
  tagline: "Intelligence, applied.",
  description: "Avnox — AI strategy & custom solutions",
  email: "[hello@avnox.com]",
  linkedin: "[LinkedIn URL]",
  x: "[X URL]",
  instagram: "[Instagram URL]",
  calendly: "/contact",
  url: "https://avnox.example",
};

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog soon" },
  { href: "/contact", label: "Contact" },
] as const;

export const metadataBase: Metadata = {
  title: {
    default: "Avnox — AI strategy & custom solutions",
    template: `%s — Avnox`,
  },
  description:
    "AI strategy and custom solutions for businesses that want more revenue, faster growth and time back.",
};
