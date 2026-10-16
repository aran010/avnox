import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

function AtomMark() {
  return (
    <div
      className="relative grid h-[76px] w-[76px] place-items-center rounded-[22px] shadow-[0_12px_50px_rgba(56,140,255,0.65)]"
      style={{
        background: "linear-gradient(180deg, #8ec5ff 0%, #3b82f6 48%, #1d4ed8 100%)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-11 w-11 text-white" fill="none">
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2.4" />
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="8"
          stroke="currentColor"
          strokeWidth="2.4"
          transform="rotate(60 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="8"
          stroke="currentColor"
          strokeWidth="2.4"
          transform="rotate(-60 32 32)"
        />
        <circle cx="32" cy="32" r="4.2" fill="currentColor" />
      </svg>
    </div>
  );
}

export function CtaBanner() {
  return (
    <section id="work" className="bg-[#050505] px-3 pb-20 pt-6 sm:px-8 sm:pb-28">
      <div className="relative mx-auto min-h-[min(860px,92svh)] max-w-[1220px] overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-18%] h-[min(145vw,1180px)] w-[min(145vw,1180px)] -translate-x-1/2">
          <img
            src="/earth-cta.jpg"
            alt=""
            className="h-full w-full rounded-full object-cover select-none"
          />
          <div className="absolute inset-0 rounded-full shadow-[0_0_120px_24px_rgba(70,150,255,0.18),inset_-40px_-20px_80px_rgba(0,0,0,0.35)]" />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "33.333% 33.333%",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_12%,rgba(0,0,0,0.28)_48%,#050505_86%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute left-[16%] top-[30%] z-[2] h-[340px] w-[2px] origin-bottom rotate-[38deg]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/35 to-white" />
          <svg viewBox="0 0 18 40" className="absolute -top-3 left-1/2 h-9 w-4 -translate-x-1/2 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
            <path d="M9 0 L14 18 H4 Z M7 18 H11 L10.4 30 H7.6 Z M6.5 30 H11.5 L9 40 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 flex min-h-[min(860px,92svh)] flex-col items-center justify-center px-6 py-28 text-center">
          <AtomMark />
          <h2 className="mt-7 text-[clamp(36px,5vw,52px)] font-semibold leading-[1.08] tracking-[-1.7px] text-white">
            Work With Us
          </h2>
          <p className="mt-4 max-w-[26rem] text-[16px] leading-[1.55] tracking-[-0.32px] text-[#cfcfcf]">
            Book an intro call to explore our suite of services. We might have a waitlist.
          </p>
          <Link href={site.calendly} className="btn-primary-on-dark mt-8 gap-1.5 px-6">
            Book a call
            <ArrowRight size={14} strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}
