"use client"

import React, { useRef } from "react"
import { AnimatedBeam } from "./AnimatedBeam"
import { cn } from "@/lib/utils"
import {
  FileText,
  Mail,
  Database,
  BarChart2,
  Zap,
  Lightbulb,
  Bell,
  TrendingUp,
} from "lucide-react"

// ─── Reusable node circle ───────────────────────────────────────────────────
const Node = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => (
  <div className="flex flex-col items-center gap-2">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border border-[#ddd4c4] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_4px_24px_rgba(0,0,0,0.11)]",
        className
      )}
    >
      {children}
    </div>
    {label && (
      <span className="text-[11px] font-medium tracking-tight text-[#999]">{label}</span>
    )}
  </div>
))
Node.displayName = "Node"

// ─── Central Avnox node ──────────────────────────────────────────────────────
const CenterNode = React.forwardRef<HTMLDivElement, object>((_props, ref) => (
  <div className="flex flex-col items-center gap-2">
    <div
      ref={ref}
      className="z-10 flex size-20 items-center justify-center rounded-full border-2 border-[#c9a96e]/60 bg-[#fdf9f4] shadow-[0_4px_28px_rgba(180,140,90,0.18)]"
    >
      {/* Atom mark matching CtaBanner */}
      <svg viewBox="0 0 64 64" className="h-9 w-9 text-[#8b6f47]" fill="none">
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2.4" />
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2.4" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="20" ry="8" stroke="currentColor" strokeWidth="2.4" transform="rotate(-60 32 32)" />
        <circle cx="32" cy="32" r="4.2" fill="currentColor" />
      </svg>
    </div>
    <span className="text-[12px] font-semibold tracking-tight text-[#050505]">Avnox AI</span>
  </div>
))
CenterNode.displayName = "CenterNode"

// ─── Section ─────────────────────────────────────────────────────────────────
export function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Input refs (left)
  const crmRef = useRef<HTMLDivElement>(null)
  const docsRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)

  // Center ref
  const centerRef = useRef<HTMLDivElement>(null)

  // Output refs (right)
  const insightsRef = useRef<HTMLDivElement>(null)
  const reportsRef = useRef<HTMLDivElement>(null)
  const automationRef = useRef<HTMLDivElement>(null)
  const alertsRef = useRef<HTMLDivElement>(null)

  const iconProps = { size: 20, strokeWidth: 1.6, className: "text-[#8b6f47]" }

  return (
    <section className="py-24" style={{ background: "#faf7f2" }}>
      <div className="container-page">
        <p className="eyebrow">04 / INTEGRATIONS</p>
        <h2 className="mt-4 text-[clamp(32px,6vw,48px)] font-medium leading-[1.1] tracking-[-1.8px] text-[#050505]">
          Your business, connected.
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.5] tracking-[-0.32px] text-[#999999]">
          Avnox AI sits at the centre of your workflows — ingesting your data, understanding your operations,
          and delivering intelligence where it matters.
        </p>

        {/* Beam diagram */}
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="relative mx-auto mt-16 flex max-w-3xl items-center justify-between px-4"
          style={{ minHeight: 320 }}
        >
          {/* Inputs */}
          <div className="flex flex-col gap-8">
            <Node ref={crmRef} label="CRM">
              <BarChart2 {...iconProps} />
            </Node>
            <Node ref={docsRef} label="Docs">
              <FileText {...iconProps} />
            </Node>
            <Node ref={emailRef} label="Email">
              <Mail {...iconProps} />
            </Node>
            <Node ref={dataRef} label="Data">
              <Database {...iconProps} />
            </Node>
          </div>

          {/* Center */}
          <CenterNode ref={centerRef} />

          {/* Outputs */}
          <div className="flex flex-col gap-8">
            <Node ref={insightsRef} label="Insights">
              <Lightbulb {...iconProps} />
            </Node>
            <Node ref={reportsRef} label="Reports">
              <TrendingUp {...iconProps} />
            </Node>
            <Node ref={automationRef} label="Automation">
              <Zap {...iconProps} />
            </Node>
            <Node ref={alertsRef} label="Alerts">
              <Bell {...iconProps} />
            </Node>
          </div>

          {/* Beams: inputs → center */}
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={crmRef as React.RefObject<HTMLElement>} toRef={centerRef as React.RefObject<HTMLElement>} curvature={-50} delay={0} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={docsRef as React.RefObject<HTMLElement>} toRef={centerRef as React.RefObject<HTMLElement>} curvature={-18} delay={0.8} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={emailRef as React.RefObject<HTMLElement>} toRef={centerRef as React.RefObject<HTMLElement>} curvature={18} delay={1.6} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={dataRef as React.RefObject<HTMLElement>} toRef={centerRef as React.RefObject<HTMLElement>} curvature={50} delay={2.4} />

          {/* Beams: center → outputs */}
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={centerRef as React.RefObject<HTMLElement>} toRef={insightsRef as React.RefObject<HTMLElement>} curvature={-50} reverse delay={0.4} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={centerRef as React.RefObject<HTMLElement>} toRef={reportsRef as React.RefObject<HTMLElement>} curvature={-18} reverse delay={1.2} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={centerRef as React.RefObject<HTMLElement>} toRef={automationRef as React.RefObject<HTMLElement>} curvature={18} reverse delay={2.0} />
          <AnimatedBeam containerRef={containerRef as React.RefObject<HTMLElement>} fromRef={centerRef as React.RefObject<HTMLElement>} toRef={alertsRef as React.RefObject<HTMLElement>} curvature={50} reverse delay={2.8} />
        </div>
      </div>
    </section>
  )
}
