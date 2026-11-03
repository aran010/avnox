"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { fadeUp, viewportOnce, easeOut } from "@/lib/motion";

export function CtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="pb-24">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : fadeUp}
          transition={{ duration: 0.65, ease: easeOut }}
          className="relative grid overflow-hidden rounded-2xl bg-[#0f172a] lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="relative z-10 p-10 sm:p-14 lg:p-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#60a5fa]">Get started</p>
            <h2 className="mt-5 text-[clamp(32px,4vw,48px)] font-medium leading-[1.08] tracking-[-0.03em] text-[#f8fafc]">
              Let&apos;s build the technology your business runs on.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-[1.55] text-[#94a3b8]">
              Tell us what you need — a migration, a team, a fleet of laptops or a full IT partner. We&apos;ll come back with a clear plan.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={site.calendly}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Book a consultation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 text-[14px] font-medium text-[#f8fafc] transition-colors hover:border-white/50"
              >
                Email us
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] overflow-hidden">
            <motion.div
              animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/avnox-logo.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-[20%_40%] opacity-80 grayscale"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/50 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
