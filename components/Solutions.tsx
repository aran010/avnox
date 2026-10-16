"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, FileSearch, LineChart, Megaphone, MessageSquare, Sparkles, UserCheck } from "lucide-react";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const items = [
  { icon: MessageSquare, title: "AI chatbots & voice agents" },
  { icon: UserCheck, title: "Sales & lead-qualification agents" },
  { icon: FileSearch, title: "Document processing" },
  { icon: LineChart, title: "Demand forecasting" },
  { icon: Sparkles, title: "Personalized recommendations" },
  { icon: Bot, title: "Internal knowledge assistants" },
  { icon: Megaphone, title: "Marketing automation" },
];

export function Solutions() {
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
          <p className="eyebrow">Solutions</p>
          <h2 className="mt-4 max-w-2xl text-display-md text-white">What we can build.</h2>
        </motion.div>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.li
              key={item.title}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.35, ease: easeOut }}
              className="card-glass flex items-center gap-4 p-5 hover:-translate-y-1 hover:border-avnox-accent/30 hover:shadow-glow-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-avnox-accent/10 text-avnox-accent">
                <item.icon size={20} aria-hidden />
              </span>
              <h3 className="font-medium text-white">{item.title}</h3>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
