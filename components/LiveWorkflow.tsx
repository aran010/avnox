"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const plays = {
  Support: {
    steps: ["Ticket in", "Classify", "Draft reply", "Human review"],
    logs: [
      "Inbound: “Where is my order #4412?”",
      "Intent: shipping status — 0.94 confidence",
      "Pulled tracking from Shopify + carrier API",
      "Draft sent to reviewer in 3.2s",
    ],
    save: "11 hrs / week",
  },
  Sales: {
    steps: ["Lead in", "Score", "Qualify", "Book call"],
    logs: [
      "New lead: agency, 40 seats, inbound form",
      "Fit score: 82 — ICP match on size + industry",
      "Agent asked 3 qualifying questions on-site",
      "Calendar slot held for tomorrow 10:30",
    ],
    save: "8 hrs / week",
  },
  Ops: {
    steps: ["File in", "Extract", "Route", "Dashboard"],
    logs: [
      "PDF intake: 18-page vendor invoice",
      "Extracted PO, amount, due date — 4 fields",
      "Exception: amount mismatch → finance queue",
      "Ops dashboard updated in under a minute",
    ],
    save: "14 hrs / week",
  },
} as const;

type Play = keyof typeof plays;

export function LiveWorkflow() {
  const [play, setPlay] = useState<Play>("Support");
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);
  const current = plays[play];

  const visibleLogs = useMemo(() => current.logs.slice(0, step + 1), [current.logs, step]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  function run() {
    if (timer.current) window.clearInterval(timer.current);
    setRunning(true);
    setStep(0);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= current.steps.length - 1) {
        if (timer.current) window.clearInterval(timer.current);
        setRunning(false);
      }
    }, 700);
  }

  function selectPlay(next: Play) {
    if (timer.current) window.clearInterval(timer.current);
    setPlay(next);
    setStep(0);
    setRunning(false);
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-4xl text-left">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-avnox-muted">Live interactive preview</p>
      <div className="card-glass overflow-hidden p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-full border border-white/10 bg-black/30 p-1">
            {(Object.keys(plays) as Play[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectPlay(key)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  play === key ? "bg-avnox-accent text-avnox-ink" : "text-avnox-faint hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
          <button type="button" onClick={run} disabled={running} className="btn-primary disabled:opacity-60">
            <Play size={14} aria-hidden />
            Run this flow
          </button>
        </div>

        <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {current.steps.map((label, i) => {
            const active = i <= step;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                    active
                      ? "border-avnox-accent/50 bg-avnox-accent/10 text-white shadow-glow-sm"
                      : "border-white/10 text-avnox-muted hover:border-white/25"
                  }`}
                >
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-avnox-accent">0{i + 1}</span>
                  <span className="mt-1 block font-medium">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="min-h-[168px] rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6 text-avnox-faint">
            {visibleLogs.map((line, i) => (
              <motion.p
                key={`${play}-${line}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={i === visibleLogs.length - 1 ? "text-avnox-accent" : ""}
              >
                ▸ {line}
              </motion.p>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-avnox-muted">Estimated save</p>
            <p className="mt-2 text-3xl font-semibold text-avnox-accent">{current.save}</p>
            <p className="mt-2 text-sm text-avnox-muted">Placeholder figure — click steps or hit run to see the overlay think.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
