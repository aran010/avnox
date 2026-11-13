"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";
import { IlluBuild, IlluConsult, IlluDeploy, IlluImprove } from "./Iso";

const steps = [
  {
    n: "01",
    title: "Consult & Assess",
    body: "We study your operations, systems and teams to find where technology and talent will have the clearest impact.",
    Illu: IlluConsult,
  },
  {
    n: "02",
    title: "Design the Solution",
    body: "A clear plan covering software, infrastructure, migration path and the people needed to run it.",
    Illu: IlluBuild,
  },
  {
    n: "03",
    title: "Deploy & Integrate",
    body: "We implement, migrate and staff — integrating with your existing environment, with continuity from day one.",
    Illu: IlluDeploy,
  },
  {
    n: "04",
    title: "Support & Evolve",
    body: "Ongoing management, monitoring and upgrades as your business, headcount and technology grow.",
    Illu: IlluImprove,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-we-work"
      className="relative overflow-hidden py-28"
      style={{
        background:
          "radial-gradient(ellipse 65% 55% at 18% 25%, rgba(59, 130, 246, 0.18) 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 85% 75%, rgba(16, 185, 129, 0.12) 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 50% 45%, rgba(37, 99, 235, 0.16) 0%, transparent 70%), linear-gradient(180deg, #f8fafc 0%, #eff6ff 55%, #ecfdf5 82%, #f1f5f9 100%)",
      }}
    >
      {/* Subtle top and bottom blend glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#60a5fa]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#2563eb]/15 blur-3xl"
      />

      <div className="container-page relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="text-center"
        >
          <h2 className="heading-bar">How we work</h2>
        </motion.div>
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-16 grid rounded-2xl border border-white/80 bg-white/65 shadow-[0_24px_60px_-28px_rgba(37,99,235,0.2)] backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(({ n, title, body, Illu }, i) => (
            <motion.li
              key={n}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className={`border-[#cbd5e1]/60 px-6 pb-9 pt-6 ${i % 2 === 1 ? "sm:border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="mx-auto aspect-[24/17] w-full max-w-[240px]">
                <Illu />
              </div>
              <p className="mt-8 text-[12px] font-medium text-[#2563eb]">{n}</p>
              <h3 className="mt-3 text-[22px] font-medium tracking-[-0.02em] text-[#0f172a]">{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#475569]">{body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
