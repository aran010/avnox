"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Where should we start with AI?",
    a: "Start with an opportunity audit. We assess your workflows and identify where AI can create measurable value.",
  },
  {
    q: "Do we need to know exactly what we want?",
    a: "No. We start with your business goals, not a predetermined tool. The audit helps define what is worth building—and what is not.",
  },
  {
    q: "Can you work with our existing systems?",
    a: "Yes. We design around the tools you already use so your team doesn’t have to start from scratch.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects move from audit to a first working version in a matter of weeks, depending on scope.",
  },
  {
    q: "What happens after launch?",
    a: "We stay involved—supporting, monitoring and improving the system as your business grows.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container-page max-w-3xl">
        <h2 className="text-[clamp(32px,6vw,48px)] font-medium tracking-[-1.8px] text-[#050505]">Good questions. Clear answers.</h2>
        <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[20px] font-medium text-[#050505]">{item.q}</span>
                  <span className="text-black/40">{isOpen ? "–" : "+"}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#999999]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
