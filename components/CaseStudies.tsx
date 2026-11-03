"use client";

import { InteractiveGridPattern } from "./InteractiveGridPattern";

const studies = [
  {
    kicker: "ILLUSTRATIVE CASE STUDY / SALES INTELLIGENCE",
    title: "Turn every lead into a better conversation.",
    body: "A custom AI workflow that researches prospects, prioritizes opportunities and gives sales teams the context to move faster.",
    metrics: ["32% more qualified leads", "2.4× faster outreach", "60 hrs saved monthly", "6 weeks to launch"],
  },
  {
    kicker: "ILLUSTRATIVE CASE STUDY / OPERATIONS AUTOMATION",
    title: "Give your people their time back.",
    body: "An intelligent document pipeline that turns incoming information into accurate, actionable data—without the manual busywork.",
    metrics: ["70% less manual entry", "98% target accuracy", "120 hrs saved monthly", "8 weeks to launch"],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden py-24">
      {/* Interactive grid background */}
      <InteractiveGridPattern
        width={48}
        height={48}
        squares={[28, 20]}
        className="[mask-image:radial-gradient(ellipse_at_50%_50%,white_40%,transparent_90%)]"
        squaresClassName="stroke-gray-300/50 hover:fill-gray-200/40"
      />

      <div className="container-page relative z-10">
        <p className="eyebrow">02 / SELECTED POSSIBILITIES</p>
        <h2 className="mt-4 text-[clamp(32px,6vw,48px)] font-medium leading-[1.1] tracking-[-1.8px] text-[#050505]">
          Less friction. More forward.
        </h2>
        <div className="mt-14 space-y-16">
          {studies.map((study) => (
            <article key={study.title} className="border-t border-black/10 pt-8">
              <p className="eyebrow">{study.kicker}</p>
              <h3 className="mt-4 max-w-3xl text-[clamp(32px,6vw,48px)] font-medium leading-[1.1] tracking-[-1.8px] text-[#050505]">
                {study.title}
              </h3>
              <p className="mt-5 max-w-2xl text-[16px] leading-[1.5] tracking-[-0.32px] text-[#999999]">{study.body}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {study.metrics.map((m) => (
                  <li key={m} className="text-[16px] tracking-[-0.32px] text-[#999999]">
                    {m}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
