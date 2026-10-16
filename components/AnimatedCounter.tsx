"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

export function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0, label }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 55, damping: 22 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    const format = (n: number) => `${prefix}${decimals ? n.toFixed(decimals) : Math.round(n)}${suffix}`;
    if (reduce) {
      if (displayRef.current) displayRef.current.textContent = format(value);
      return;
    }
    const unsub = spring.on("change", (latest) => {
      if (displayRef.current) displayRef.current.textContent = format(latest);
    });
    return () => unsub();
  }, [spring, suffix, prefix, reduce, value, decimals]);

  return (
    <div ref={ref}>
      <p className="bg-gradient-to-r from-avnox-accent to-avnox-hot bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
        <span ref={displayRef}>
          {prefix}0{suffix}
        </span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-avnox-muted">{label}</p>
    </div>
  );
}
