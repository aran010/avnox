"use client";

import { useEffect, useRef, useState } from "react";

function keyBlack(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = frame.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const max = Math.max(r, g, b);
        if (max < 18) {
          d[i + 3] = 0;
        } else if (max < 48) {
          d[i + 3] = Math.round(((max - 18) / 30) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("spacecraft image failed"));
    img.src = src;
  });
}

export function Spacecraft() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState("/avnox-spacecraft.jpg");

  useEffect(() => {
    keyBlack("/avnox-spacecraft.jpg")
      .then(setSrc)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      el.style.setProperty("--tx", `${x}px`);
      el.style.setProperty("--ty", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center pt-16 lg:pt-0"
      style={{ transform: "translate3d(var(--tx, 0px), var(--ty, 0px), 0)" }}
    >
      <img
        src={src}
        alt="Avnox stealth spacecraft"
        className="spacecraft-float w-[min(125vw,980px)] max-w-none select-none object-contain"
      />
    </div>
  );
}
