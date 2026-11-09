"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const items = [
  { prefix: "", target: 6, suffix: "", l: "Service lines under one contract." },
  { prefix: "", target: 360, suffix: "°", l: "Strategy, delivery and support." },
  { prefix: "", target: 24, suffix: "/7", l: "Monitoring and managed support." },
  { prefix: "", target: 1, suffix: "", l: "Accountable partner, end to end." },
];

function CountNumber({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 75, damping: 20 });

  useEffect(() => {
    if (inView) {
      motionVal.set(target);
    }
  }, [inView, motionVal, target]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springVal, prefix, suffix]);

  return (
    <span ref={ref}>
      {`${prefix}${target}${suffix}`}
    </span>
  );
}

function Wave() {
  return (
    <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="block h-[120px] w-full sm:h-[160px]" aria-hidden>
      <defs>
        <linearGradient id="w1" x1="0" x2="1">
          <stop offset="0" stopColor="#dbeafe" />
          <stop offset="0.5" stopColor="#bfdbfe" />
          <stop offset="1" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="w2" x1="0" x2="1">
          <stop offset="0" stopColor="#93c5fd" stopOpacity="0.65" />
          <stop offset="1" stopColor="#dbeafe" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <motion.path
        animate={{
          d: [
            "M0 60 C 240 140, 480 20, 760 90 S 1200 150, 1440 50 V180 H0 Z",
            "M0 80 C 260 30, 520 130, 760 70 S 1180 40, 1440 85 V180 H0 Z",
            "M0 60 C 240 140, 480 20, 760 90 S 1200 150, 1440 50 V180 H0 Z",
          ],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        d="M0 60 C 240 140, 480 20, 760 90 S 1200 150, 1440 50 V180 H0 Z"
        fill="url(#w1)"
      />
      <motion.path
        animate={{
          d: [
            "M0 110 C 300 40, 620 170, 900 110 S 1280 60, 1440 120 V180 H0 Z",
            "M0 95 C 320 150, 600 60, 900 125 S 1260 140, 1440 95 V180 H0 Z",
            "M0 110 C 300 40, 620 170, 900 110 S 1280 60, 1440 120 V180 H0 Z",
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        d="M0 110 C 300 40, 620 170, 900 110 S 1280 60, 1440 120 V180 H0 Z"
        fill="url(#w2)"
      />
      <path d="M0 150 C 360 110, 700 180, 1040 140 S 1340 130, 1440 150 V180 H0 Z" fill="#f8fafc" />
    </svg>
  );
}

export function Stats() {
  return (
    <section className="relative pt-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="heading-bar">The Avnox difference, in numbers</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#64748b]">
            What changes when your technology, infrastructure and people come from a single, accountable partner.
          </p>
        </motion.div>

        <div className="mt-10 border border-[#e2e8f0] bg-white">
          <div className="h-12 border-b border-[#e2e8f0]" />
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
            className="grid gap-px bg-[#e2e8f0] sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((it) => (
              <motion.li
                key={it.l}
                variants={fadeUp}
                transition={{ duration: 0.45, ease: easeOut }}
                className="bg-white px-7 py-10"
              >
                <p className="text-[clamp(48px,5vw,64px)] font-normal leading-none tracking-[-0.04em] text-[#0f172a]">
                  <CountNumber target={it.target} suffix={it.suffix} prefix={it.prefix} />
                </p>
                <p className="mt-4 text-[14px] text-[#334155]">{it.l}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      <Wave />
    </section>
  );
}
