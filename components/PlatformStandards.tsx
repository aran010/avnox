"use client";

import { motion } from "framer-motion";
import { Gauge, GitBranch, SearchCheck, ShieldCheck } from "lucide-react";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const pillars = [
  {
    icon: Gauge,
    badge: "< 2.0s LCP",
    title: "Core Web Vitals optimization",
    summary: "Sub-2-second loads, next-gen AVIF/WebP image optimization and global edge CDN delivery.",
    items: ["Sub-2-second page loads", "Next-gen image optimization", "Global edge CDN caching"],
  },
  {
    icon: SearchCheck,
    badge: "100 / 100 SEO",
    title: "Technical SEO",
    summary: "Structured JSON-LD schema markup, automated XML sitemaps, clean URL structure and Open Graph tags.",
    items: ["JSON-LD schema markup", "Automated XML sitemap & robots", "Clean URLs & Open Graph tags"],
  },
  {
    icon: ShieldCheck,
    badge: "WAF + SSL",
    title: "Enterprise security & compliance",
    summary: "End-to-end SSL/TLS, Cloudflare WAF & DDoS mitigation, automated backups and GDPR cookie consent.",
    items: ["SSL/HSTS & Cloudflare WAF/DDoS", "Automated regular backups", "GDPR & cookie consent controls"],
  },
  {
    icon: GitBranch,
    badge: "Zero-downtime",
    title: "Staging environment & CI/CD",
    summary: "Isolated staging preview environments, automated build & type checks, and instant rollbacks.",
    items: ["Staging preview environments", "Automated CI/CD pipelines", "Git version control & safe rollbacks"],
  },
];

export function PlatformStandards() {
  return (
    <section id="standards" className="scroll-mt-16 py-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow mb-3">Engineering Standards</p>
            <h2 className="heading-bar">Performance, SEO and security</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#64748b]">
            Built-in speed, search visibility, hardened security and automated CI/CD pipelines across every deployment.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 hover:shadow-[0_22px_50px_-24px_rgba(37,99,235,0.25)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb] transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                    <p.icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="rounded-full border border-[#bfdbfe] bg-[#eff6ff] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-[#1d4ed8]">
                    {p.badge}
                  </span>
                </div>

                <h3 className="mt-6 text-[19px] font-medium tracking-[-0.02em] text-[#0f172a]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.55] text-[#64748b]">{p.summary}</p>
              </div>

              <ul className="mt-6 space-y-2 border-t border-[#e2e8f0] pt-4">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-[#334155]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

