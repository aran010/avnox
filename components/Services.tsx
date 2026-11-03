"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Brain, Cloud, Monitor, Settings, ShieldCheck, Users } from "lucide-react";
import { fadeUp, stagger, viewportOnce, easeOut } from "@/lib/motion";

const services = [
  {
    icon: Settings,
    title: "IT Consulting & Management",
    body: "Strategy, project management, infrastructure oversight and end-to-end technical support aligned to your business goals.",
    points: ["IT strategy & advisory", "Project management", "Infrastructure management"],
  },
  {
    icon: Brain,
    title: "AI & Technology Solutions",
    body: "Custom solutions, automation and system integration that reduce cost and open up new capabilities.",
    points: ["Process automation", "System integration", "Data & analytics"],
  },
  {
    icon: Cloud,
    title: "Cloud & Technology Migration",
    body: "Data, application, server, cloud and infrastructure migrations — planned, tested and executed with continuity.",
    points: ["Cloud & server migration", "Application migration", "Data migration"],
  },
  {
    icon: Users,
    title: "Staffing & Workforce",
    body: "Skilled, semi-skilled, technical, IT and administrative personnel — recruited, deployed and managed for you.",
    points: ["IT & technical staffing", "Manpower outsourcing", "Recruitment & placement"],
  },
  {
    icon: ShieldCheck,
    title: "Software & Licensing",
    body: "Enterprise software, licences and IT solutions — sourced, imported, supplied and managed for compliance.",
    points: ["Software procurement", "Licence management", "Import & distribution"],
  },
  {
    icon: Monitor,
    title: "Hardware & Equipment",
    body: "Desktops, laptops, servers, networking, storage and office automation — to buy, lease, rent or hire-purchase.",
    points: ["Computers & servers", "Networking & storage", "Lease, rent & hire-purchase"],
  },
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-16 bg-[#f1f5f9] py-28">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : fadeUp}
          transition={{ duration: 0.55, ease: easeOut }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <h2 className="heading-bar">What we do</h2>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#64748b]">
            Six service lines, designed to work independently or together as a single engagement.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={reduce ? undefined : stagger}
          className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#e2e8f0] md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              whileHover={reduce ? undefined : "hover"}
              className="group relative flex flex-col bg-[#f8fafc] p-8 transition-colors duration-300 hover:bg-white"
            >
              <motion.span
                variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                initial="initial"
                transition={{ duration: 0.35, ease: easeOut }}
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-[#2563eb]"
              />
              <motion.span
                variants={{ hover: { y: -3, rotate: -6, color: "#2563eb" } }}
                transition={{ type: "spring", stiffness: 360, damping: 18 }}
                className="inline-flex w-fit text-[#0f172a]"
              >
                <s.icon size={22} strokeWidth={1.5} />
              </motion.span>
              <h3 className="mt-8 text-[20px] font-medium tracking-[-0.02em] text-[#0f172a]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#64748b]">{s.body}</p>
              <ul className="mt-6 flex-1 space-y-2 border-t border-[#e2e8f0] pt-5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[14px] text-[#334155]">
                    <span className="h-1 w-1 rounded-full bg-[#2563eb]" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#0f172a] group-hover:text-[#2563eb]"
              >
                Learn more
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
