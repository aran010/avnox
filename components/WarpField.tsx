"use client";

import { useEffect, useRef } from "react";

type Streak = {
  angle: number;
  inner: number;
  length: number;
  speed: number;
  offset: number;
  width: number;
  alpha: number;
};

export function WarpField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let streaks: Streak[] = [];

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor((width * height) / 4500));
      streaks = Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        inner: 40 + Math.random() * 80,
        length: 80 + Math.random() * 420,
        speed: 0.4 + Math.random() * 1.6,
        offset: Math.random(),
        width: 0.6 + Math.random() * 1.6,
        alpha: 0.08 + Math.random() * 0.22,
      }));
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const maxR = Math.hypot(width, height) * 0.7;

      for (const s of streaks) {
        if (!reduce) s.offset = (s.offset + s.speed * 0.004) % 1;
        const travel = s.inner + s.offset * (maxR - s.inner);
        const x1 = cx + Math.cos(s.angle) * travel;
        const y1 = cy + Math.sin(s.angle) * travel;
        const x2 = cx + Math.cos(s.angle) * (travel + s.length);
        const y2 = cy + Math.sin(s.angle) * (travel + s.length);
        const fade = 1 - travel / maxR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.alpha * Math.max(fade, 0.12)})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
