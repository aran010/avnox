"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const industries = [
  { title: "Retail & E-commerce", line: "Recover carts, personalize offers, and automate support." },
  { title: "Healthcare", line: "Triage intake, draft notes, and surface the right records faster." },
  { title: "Real Estate", line: "Qualify leads, summarize listings, and follow up without the busywork." },
  { title: "Finance", line: "Flag risk, speed reviews, and keep reporting current." },
  { title: "Logistics", line: "Plan dispatch, forecast demand, and cut idle time." },
  { title: "Education", line: "Support learners, draft content, and route questions to the right person." },
  { title: "Manufacturing", line: "Spot defects, predict downtime, and keep lines moving." },
  { title: "Professional Services", line: "Draft, search, and file work so people spend time on clients." },
];

export function Industries() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : fadeUp}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <p className="eyebrow">Industries we serve</p>
          <h2 className="mt-4 max-w-2xl text-display-md text-white">Built for operators, not for demos.</h2>
        </motion.div>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((item) => (
            <motion.li
              key={item.title}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.35, ease: easeOut }}
              className="card-glass p-5 hover:border-avnox-accent/30"
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-avnox-muted">{item.line}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
