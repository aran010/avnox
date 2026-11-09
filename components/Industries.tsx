"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const industries = [
  { title: "Retail & E-commerce", line: "Store systems, cloud platforms and seasonal staffing." },
  { title: "Banking & Finance", line: "Secure infrastructure, compliance and managed IT." },
  { title: "Healthcare", line: "Reliable networks, data migration and support teams." },
  { title: "Manufacturing", line: "Plant systems, hardware supply and skilled manpower." },
  { title: "Logistics", line: "Tracking platforms, devices and field personnel." },
  { title: "Education", line: "Devices, campus networks and learning platforms." },
  { title: "Government & PSU", line: "Procurement, system integration and infrastructure." },
  { title: "Real Estate", line: "Office automation, networking and IT support." },
];

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-16 bg-[#f1f5f9] py-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="heading-bar">Industries we serve</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#64748b]">
            Experience across sectors where uptime, compliance and the right people matter.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stagger}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {industries.map((it, i) => (
            <motion.li
              key={it.title}
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOut }}
            >
              <Link
                href="/contact"
                className="group flex h-full min-h-[200px] flex-col justify-between rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb]/40 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.28)]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[12px] text-[#94a3b8]">{String(i + 1).padStart(2, "0")}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#cbd5e1] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563eb]"
                  />
                </div>
                <div>
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-[#0f172a]">{it.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#64748b]">{it.line}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
