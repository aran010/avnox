"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cloud, Cpu, HardDrive, Network, RefreshCw, Users, Database } from "lucide-react";
import { site } from "@/lib/site";

const services = [
  "IT Consulting & Management",
  "AI & Technology Solutions",
  "Cloud & System Migration",
  "Staffing & Workforce",
  "Software & Licensing",
  "Hardware & Equipment",
];

const systems = [
  { icon: Database, label: "ERP" },
  { icon: Cloud, label: "Cloud" },
  { icon: Network, label: "Network" },
  { icon: HardDrive, label: "Servers" },
  { icon: Users, label: "Teams" },
  { icon: Cpu, label: "Devices" },
];

const outcomePaths = [
  "M0 85 H40 V40 H120 V20 H200",
  "M0 85 H40 V40 H120 V85 H200",
  "M0 85 H40 V130 H120 V85 H200",
];

function Slab({ highlight = false, index = 0 }: { highlight?: boolean; index?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 3.6, delay: index * 0.45, repeat: Infinity, ease: "easeInOut" }}
      className={`h-[44px] w-[150px] rounded-md border ${
        highlight ? "border-[#2563eb]/45 bg-[#dbeafe]" : "border-white bg-white/85"
      } shadow-[0_8px_18px_-10px_rgba(37,99,235,0.28)]`}
      style={{ rotateX: "58deg", rotateZ: "-45deg" }}
    />
  );
}

function Diagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % services.length), 2400);
    return () => clearInterval(id);
  }, []);

  const currentPath = outcomePaths[active % outcomePaths.length];

  return (
    <div className="relative grid grid-cols-[1fr_1fr_1.3fr_1.2fr] items-center gap-4 rounded-2xl border border-white/80 bg-[#f8fafc]/88 px-8 pb-12 pt-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      {/* Column headers */}
      {["Your Business", "Avnox Delivery", "Services", "Outcomes"].map((h) => (
        <p key={h} className="text-center text-[12px] font-medium text-[#334155]">
          {h}
        </p>
      ))}

      {/* 1. Systems orbit */}
      <div className="relative mx-auto h-[190px] w-[190px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[22px] rounded-full border border-dashed border-[#cbd5e1]"
        />
        {/* Orbiting data pulse */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute inset-[22px]"
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#2563eb] shadow-[0_0_8px_#2563eb]" />
        </motion.div>
        <div className="absolute left-1/2 top-1/2 grid h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#e2e8f0] bg-white text-center shadow-sm">
          <span className="text-[10px] leading-tight text-[#64748b]">
            Systems
            <br />& People
          </span>
        </div>
        {systems.map((s, i) => {
          const angle = (i / systems.length) * Math.PI * 2 - Math.PI / 2;
          const r = 73;
          const isPulse = i === active % systems.length;
          return (
            <motion.div
              key={s.label}
              animate={isPulse ? { scale: [1, 1.16, 1], borderColor: "#2563eb" } : { scale: 1, borderColor: "#e2e8f0" }}
              transition={{ duration: 0.6 }}
              className="absolute grid h-8 w-8 place-items-center rounded-lg border bg-white shadow-sm"
              style={{ left: 95 + Math.cos(angle) * r - 16, top: 95 + Math.sin(angle) * r - 16 }}
              title={s.label}
            >
              <s.icon size={15} className={isPulse ? "text-[#2563eb]" : "text-[#334155]"} />
            </motion.div>
          );
        })}
      </div>

      {/* 2. Stacked layers */}
      <div className="relative mx-auto flex h-[190px] w-[170px] flex-col items-center justify-center [perspective:600px]">
        <div className="-mb-[18px]"><Slab index={0} /></div>
        <div className="-mb-[18px]"><Slab highlight index={1} /></div>
        <div><Slab index={2} /></div>
      </div>

      {/* 3. Services list */}
      <ul className="space-y-1.5">
        {services.map((s, i) => {
          const isActive = i === active;
          return (
            <li
              key={s}
              onClick={() => setActive(i)}
              className={`relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-[13px] transition-colors duration-300 ${
                isActive ? "text-white" : "text-[#64748b] hover:text-[#0f172a]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="hero-service-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-md bg-[#2563eb] shadow-[0_6px_18px_-6px_rgba(37,99,235,0.55)]"
                />
              )}
              <span
                className={`relative z-10 h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? "bg-white" : "bg-[#cbd5e1]"
                }`}
              />
              <span className="relative z-10">{s}</span>
            </li>
          );
        })}
      </ul>

      {/* 4. Outcome flow with traveling signal */}
      <svg viewBox="0 0 220 170" className="h-[170px] w-full" aria-hidden>
        <g stroke="#cbd5e1" strokeWidth="1.5" fill="none">
          <path d="M0 85 H40 V40 H120 V20 H200" />
          <path d="M40 85 V130 H120 V85 H200" />
          <path d="M120 40 V85" />
        </g>
        <motion.path
          key={active}
          d={currentPath}
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={{ pathLength: 1, opacity: [0.2, 1, 0.4] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {[
          [40, 40],
          [40, 130],
          [120, 40],
          [120, 85],
          [120, 130],
          [200, 20],
          [200, 85],
        ].map(([x, y], i) => {
          const isHot = i === active % 7 || i === (active + 3) % 7;
          return (
            <g key={i}>
              {isHot && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.2"
                  initial={{ r: 12, opacity: 0.7 }}
                  animate={{ r: 20, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r="12"
                fill={isHot ? "#2563eb" : "#ffffff"}
                stroke="#cbd5e1"
                className="transition-all duration-500"
              />
              <circle cx={x} cy={y} r="3" fill={isHot ? "#ffffff" : "#94a3b8"} />
            </g>
          );
        })}
      </svg>

      {/* Loop line */}
      <div className="pointer-events-none absolute bottom-4 left-[18%] right-[10%] flex items-center justify-center border-t border-dashed border-[#cbd5e1]">
        <span className="-mt-px flex items-center gap-1.5 bg-white/90 px-3 text-[11px] text-[#64748b]">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="inline-flex"
          >
            <RefreshCw size={11} className="text-[#2563eb]" />
          </motion.span>
          Ongoing support & optimisation
        </span>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section id="hero" className="relative overflow-hidden pt-16">
      <div
        className="hero-graph-paper pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
        aria-hidden
      />

      <div className="container-page relative pt-16 sm:pt-20">
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <Link
            href="/#services"
            className="group inline-flex items-center gap-1.5 rounded-md border border-[#e2e8f0] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#334155] transition-colors hover:border-[#2563eb]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            Explore our services
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.7fr_1fr]">
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-[clamp(40px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0f172a]"
          >
            Enterprise{" "}
            <span className="bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-[#10b981] bg-clip-text text-transparent">
              IT &amp; talent,
            </span>
            <br className="hidden sm:block" /> delivered by one partner
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="lg:pb-2"
          >
            <p className="max-w-md text-[17px] leading-[1.5] text-[#64748b]">
              Avnox brings consulting, AI, migration, people and IT infrastructure together — so your business runs on one accountable team.
            </p>
            <form
              action={site.calendly}
              className="mt-6 flex max-w-md items-center rounded-xl border border-[#e2e8f0] bg-white p-1.5 shadow-[0_6px_20px_-12px_rgba(37,99,235,0.2)] transition-shadow focus-within:border-[#2563eb]/50 focus-within:shadow-[0_12px_30px_-12px_rgba(37,99,235,0.3)]"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email address"
                className="min-w-0 flex-1 bg-transparent px-3 text-[14px] text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none"
                aria-label="Work email address"
              />
              <button type="submit" className="btn-primary group shrink-0">
                Book a consultation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Visual panel */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 overflow-hidden rounded-2xl border border-[#e2e8f0]"
        >
          <div className="relative h-[420px] sm:h-[520px] lg:h-[560px]">
            <Image
              src="/avnox-logo.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-[50%_48%] grayscale"
            />
            <div className="absolute inset-0 bg-[#bfdbfe] mix-blend-multiply opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/45 via-transparent to-[#f8fafc]/55" />
          </div>
          <div className="absolute inset-x-6 top-1/2 hidden -translate-y-1/2 lg:block xl:inset-x-16">
            <Diagram />
          </div>
          {/* Mobile: simple service ticker */}
          <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/70 bg-white/85 p-4 backdrop-blur-md lg:hidden">
            <p className="text-[12px] font-medium text-[#64748b]">One partner for</p>
            <p className="mt-1 text-[15px] font-medium text-[#0f172a]">
              Consulting · AI · Migration · Staffing · Software · Hardware
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
