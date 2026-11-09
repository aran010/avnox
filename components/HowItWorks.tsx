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
    <section className="py-24">
      <div className="container-page">
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
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(({ n, title, body, Illu }, i) => (
            <motion.li
              key={n}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className={`border-[#e2e8f0] px-6 pb-8 pt-2 ${i % 2 === 1 ? "sm:border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <div className="mx-auto aspect-[24/17] w-full max-w-[240px]">
                <Illu />
              </div>
              <p className="mt-8 text-[12px] text-[#64748b]">{n}</p>
              <h3 className="mt-4 text-[22px] font-medium tracking-[-0.02em] text-[#0f172a]">{title}</h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#64748b]">{body}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
