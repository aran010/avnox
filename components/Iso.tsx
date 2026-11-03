"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Minimal isometric primitives in an off-white & blue palette — used for the
 * "How we work" illustrations (nuplay-style), with gentle ambient motion graphics.
 */

type Tone = "paper" | "accent";

const tones: Record<Tone, { top: string; left: string; right: string; stroke: string }> = {
  paper: { top: "#ffffff", left: "#eef4ff", right: "#dbeafe", stroke: "#cbd5e1" },
  accent: { top: "#dbeafe", left: "#93c5fd", right: "#3b82f6", stroke: "#60a5fa" },
};

export function Cube({ x, y, s, tone = "paper", h }: { x: number; y: number; s: number; tone?: Tone; h?: number }) {
  const t = tones[tone];
  const hh = h ?? s;
  const w = s * 0.866;
  const top = `${x},${y - s / 2} ${x + w},${y} ${x},${y + s / 2} ${x - w},${y}`;
  const left = `${x - w},${y} ${x},${y + s / 2} ${x},${y + s / 2 + hh} ${x - w},${y + hh}`;
  const right = `${x + w},${y} ${x},${y + s / 2} ${x},${y + s / 2 + hh} ${x + w},${y + hh}`;
  return (
    <g stroke={t.stroke} strokeWidth="0.8" strokeLinejoin="round">
      <polygon points={left} fill={t.left} />
      <polygon points={right} fill={t.right} />
      <polygon points={top} fill={t.top} />
    </g>
  );
}

function Floor() {
  return (
    <g stroke="#e2e8f0" strokeWidth="0.7">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`a${i}`} x1={20 + i * 25} y1={150} x2={120 + i * 25} y2={92} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`b${i}`} x1={20 + i * 25} y1={92} x2={120 + i * 25} y2={150} />
      ))}
    </g>
  );
}

export function IlluConsult() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Floor />
      <motion.g
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={60} y={112} s={22} h={14} />
      </motion.g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.1, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={180} y={90} s={20} />
      </motion.g>
      <Cube x={168} y={128} s={14} h={10} />
      {/* pyramid */}
      <motion.g
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        stroke="#60a5fa"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        <polygon points="120,30 92,108 120,122" fill="#bfdbfe" />
        <polygon points="120,30 148,108 120,122" fill="#60a5fa" />
      </motion.g>
      <ellipse cx="96" cy="140" rx="12" ry="5" fill="#eef4ff" stroke="#cbd5e1" strokeWidth="0.8" />
    </svg>
  );
}

export function IlluBuild() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Floor />
      <motion.g
        animate={reduce ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 3.5, delay: 0, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={118} s={52} h={10} />
      </motion.g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3.5, delay: 0.25, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={100} s={40} h={9} tone="accent" />
      </motion.g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={84} s={30} h={8} />
      </motion.g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -11, 0] }}
        transition={{ duration: 3.5, delay: 0.75, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={52} s={16} />
      </motion.g>
    </svg>
  );
}

export function IlluDeploy() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Floor />
      <g stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arr)">
        <defs>
          <marker id="arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0 0 L6 3 L0 6 z" fill="#60a5fa" />
          </marker>
        </defs>
        <line x1="100" y1="72" x2="66" y2="52" />
        <line x1="140" y1="72" x2="174" y2="52" />
        <line x1="100" y1="110" x2="66" y2="128" />
        <line x1="140" y1="110" x2="174" y2="128" />
      </g>
      {!reduce && (
        <g fill="#2563eb">
          <motion.circle
            r="2.2"
            animate={{ cx: [100, 66], cy: [72, 52], opacity: [1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            r="2.2"
            animate={{ cx: [140, 174], cy: [72, 52], opacity: [1, 0] }}
            transition={{ duration: 1.6, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            r="2.2"
            animate={{ cx: [100, 66], cy: [110, 128], opacity: [1, 0] }}
            transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            r="2.2"
            animate={{ cx: [140, 174], cy: [110, 128], opacity: [1, 0] }}
            transition={{ duration: 1.6, delay: 1.2, repeat: Infinity, ease: "easeOut" }}
          />
        </g>
      )}
      <motion.g
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={76} s={34} tone="accent" />
      </motion.g>
      <Cube x={56} y={44} s={13} />
      <Cube x={184} y={44} s={13} />
      <Cube x={56} y={128} s={13} />
      <Cube x={184} y={128} s={13} />
    </svg>
  );
}

export function IlluImprove() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Floor />
      <g transform="translate(120 100) scale(1 0.55)">
        <motion.g
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <path d="M-70 0 A70 70 0 1 1 0 70 L0 44 A44 44 0 1 0 -44 0 Z" fill="#eef4ff" stroke="#cbd5e1" />
          <path d="M-70 0 A70 70 0 0 1 0 -70 L0 -44 A44 44 0 0 0 -44 0 Z" fill="#93c5fd" stroke="#60a5fa" />
        </motion.g>
      </g>
      <g transform="translate(0 10)">
        <path d="M50 100 v12 a70 38 0 0 0 70 38 v-12 a70 38 0 0 1 -70 -38z" fill="#dbeafe" stroke="#cbd5e1" strokeWidth="0.8" />
      </g>
      <motion.g
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cube x={120} y={92} s={16} />
      </motion.g>
    </svg>
  );
}
