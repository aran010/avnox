"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

/**
 * Avnox logo — mark rebuilt as two vector pieces so each can move:
 *  - Stroke: the tall slanted bar
 *  - Foot:   the smaller parallelogram that kicks out to the right
 *  - Wordmark: "Avno" + custom geometric split-chevron "x" matching the brand mark
 */

const spring = { type: "spring", stiffness: 420, damping: 18 } as const;

const stroke: Variants = {
  hidden: { y: 26, opacity: 0 },
  visible: { y: 0, opacity: 1, rotate: 0, transition: { ...spring, delay: 0.05 } },
  hover: { rotate: -6, transition: spring },
};

const foot: Variants = {
  hidden: { y: -60, x: 14, rotate: 25, opacity: 0 },
  visible: {
    y: 0,
    x: 0,
    rotate: 0,
    opacity: 1,
    fill: "currentColor",
    transition: { type: "spring", stiffness: 300, damping: 11, delay: 0.3 },
  },
  hover: {
    x: 18,
    y: 10,
    rotate: 8,
    fill: "#2563eb",
    transition: { type: "spring", stiffness: 380, damping: 12 },
  },
};

const word: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
  hover: { transition: { staggerChildren: 0.035 } },
};

const letter: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { type: "spring", stiffness: 500, damping: 26 } },
  hover: {
    y: ["0%", "-22%", "0%"],
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

export function LogoMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size * 1.27}
      height={size}
      viewBox="-10 -10 285 213"
      fill="currentColor"
      className={`overflow-visible ${className}`}
      aria-hidden
    >
      <motion.path
        d="M0 193 L105 0 H192 L87 193 Z"
        variants={stroke}
        style={{ originX: "50%", originY: "100%" }}
      />
      <motion.path
        d="M131 113 L148 80 H190 L245 193 H168 Z"
        variants={foot}
        style={{ originX: "30%", originY: "100%" }}
      />
    </motion.svg>
  );
}

function CustomX({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={`inline-block h-[0.53em] w-[0.58em] translate-y-[0.01em] ${className}`}
      aria-label="x"
    >
      {/* Left chevron (>) */}
      <path d="M0 0 H28 L65 50 L28 100 H0 L37 50 Z" />
      {/* Top-right detached wedge */}
      <path d="M72 0 H100 L75 34 L61 15 Z" />
      {/* Bottom-right detached wedge */}
      <path d="M61 85 L75 66 L100 100 H72 Z" />
    </svg>
  );
}

export function Logo({ light = false, size = "default" }: { light?: boolean; size?: "default" | "large" }) {
  const color = light ? "text-white" : "text-[#0f172a]";
  const markSize = size === "large" ? 44 : 22;
  const textSize = size === "large" ? "text-[44px]" : "text-[22px]";

  return (
    <Link href="/" aria-label="Avnox home" className={`inline-flex ${color}`}>
      <motion.span
        className="inline-flex items-center gap-2.5"
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
      >
        <LogoMark size={markSize} />
        <motion.span
          variants={word}
          className={`${textSize} inline-flex items-baseline overflow-hidden pb-[0.08em] font-semibold leading-none tracking-[-0.035em]`}
        >
          {"Avno".split("").map((ch, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {ch}
            </motion.span>
          ))}
          <motion.span variants={letter} className="inline-flex items-baseline pl-[0.01em]">
            <CustomX />
          </motion.span>
        </motion.span>
      </motion.span>
    </Link>
  );
}
