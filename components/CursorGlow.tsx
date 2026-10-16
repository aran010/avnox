"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!on) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[40] hidden mix-blend-screen md:block"
      aria-hidden
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(255,176,32,0.12), transparent 55%)`,
      }}
    />
  );
}
