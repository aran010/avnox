"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, viewportOnce, easeOut } from "@/lib/motion";

const tabs = [
  {
    label: "Modernise IT operations",
    title: "Run your IT like a well-managed business.",
    body: "We take ownership of strategy, projects and day-to-day infrastructure so your internal team can focus on priorities, not firefighting.",
    points: ["IT roadmap & governance", "Project & vendor management", "Infrastructure monitoring", "Helpdesk & technical support"],
    metric: ["24/7", "infrastructure oversight"],
  },
  {
    label: "Move to the cloud",
    title: "Migrate everything. Disrupt nothing.",
    body: "Data, applications, servers and full environments moved through a planned, tested and reversible process.",
    points: ["Assessment & migration plan", "Application & data migration", "Server & infrastructure cut-over", "Post-migration validation"],
    metric: ["Phased", "cut-overs with rollback plans"],
  },
  {
    label: "Scale your workforce",
    title: "The right people, deployed when you need them.",
    body: "From a single specialist to full project teams — sourced, screened, deployed and managed by Avnox.",
    points: ["IT & technical professionals", "Administrative personnel", "Skilled & semi-skilled manpower", "Contract & permanent placement"],
    metric: ["1 → 100+", "scalable team sizes"],
  },
  {
    label: "Equip your business",
    title: "Hardware and software, sourced properly.",
    body: "Genuine software licences, computers, servers and networking equipment — supplied, imported, leased or rented.",
    points: ["Software & licence supply", "Desktops, laptops & servers", "Networking & storage", "Lease, rental & hire-purchase"],
    metric: ["One", "vendor for every IT purchase"],
  },
  {
    label: "Automate with AI",
    title: "Practical automation, measured in hours saved.",
    body: "We identify repetitive work across your operations and replace it with reliable, integrated automation.",
    points: ["Workflow automation", "Document processing", "Reporting & analytics", "Integration with existing systems"],
    metric: ["Weeks", "from assessment to first release"],
  },
];

export function Solutions() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const t = tabs[active];

  return (
    <section id="solutions" className="scroll-mt-16 py-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="heading-bar">Solutions for every priority</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#64748b]">
            Start with the outcome you need. We assemble the services behind it.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          className="mt-12 grid overflow-hidden rounded-xl border border-[#e2e8f0] bg-white lg:grid-cols-[320px_1fr]"
        >
          <ul className="flex gap-1 overflow-x-auto border-b border-[#e2e8f0] bg-[#f8fafc] p-3 lg:flex-col lg:border-b-0 lg:border-r">
            {tabs.map((tab, i) => {
              const isActive = i === active;
              return (
                <li key={tab.label} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex w-full items-center gap-2.5 rounded-lg px-4 py-3 text-left text-[14px] transition-colors ${
                      isActive ? "text-white" : "text-[#64748b] hover:bg-[#eff6ff] hover:text-[#0f172a]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="solutions-tab-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-[#2563eb] shadow-[0_6px_18px_-6px_rgba(37,99,235,0.5)]"
                      />
                    )}
                    <span
                      className={`relative z-10 h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-white" : "bg-[#cbd5e1]"
                      }`}
                    />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.32, ease: easeOut }}
                className="grid gap-10 p-8 md:grid-cols-[1.3fr_1fr] md:p-12"
              >
                <div>
                  <h3 className="text-[clamp(24px,2.6vw,32px)] font-medium leading-[1.15] tracking-[-0.025em] text-[#0f172a]">
                    {t.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-[1.55] text-[#64748b]">{t.body}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {t.points.map((p, idx) => (
                      <motion.li
                        key={p}
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05, ease: easeOut }}
                        className="border-l-2 border-[#2563eb]/60 pl-3 text-[14px] text-[#334155]"
                      >
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary group mt-10">
                    Discuss this
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <div className="relative flex flex-col justify-end overflow-hidden rounded-xl bg-[#eff6ff] p-8">
                  <svg
                    viewBox="0 0 240 240"
                    className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 opacity-60"
                    aria-hidden
                  >
                    <motion.circle
                      cx="120"
                      cy="120"
                      r="90"
                      fill="none"
                      stroke="#93c5fd"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      animate={reduce ? undefined : { rotate: 360 }}
                      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                      style={{ originX: "120px", originY: "120px" }}
                    />
                    <circle cx="120" cy="120" r="58" fill="none" stroke="#bfdbfe" strokeWidth="1" />
                  </svg>
                  <motion.p
                    initial={reduce ? false : { scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="relative text-[clamp(44px,5vw,60px)] font-normal leading-none tracking-[-0.04em] text-[#1d4ed8]"
                  >
                    {t.metric[0]}
                  </motion.p>
                  <p className="relative mt-3 text-[14px] text-[#475569]">{t.metric[1]}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
