"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What services does Avnox offer?",
    a: "Six service lines: IT consulting & management, AI & technology solutions, cloud & technology migration, staffing & workforce, software & licensing, and hardware & equipment supply.",
  },
  {
    q: "Can you manage a complete cloud or server migration?",
    a: "Yes. We handle assessment, planning, execution and validation for data, application, server and infrastructure migrations, with phased cut-overs to protect continuity.",
  },
  {
    q: "What kind of staff can you provide?",
    a: "Skilled, semi-skilled, technical, IT and administrative personnel — on contract, outsourced or through permanent recruitment and placement.",
  },
  {
    q: "Do you sell, lease or rent hardware?",
    a: "All three. Desktops, laptops, servers, networking, storage and office automation equipment are available to buy, lease, rent or on hire-purchase.",
  },
  {
    q: "Can you work with our existing systems and vendors?",
    a: "Yes. We integrate with your current environment and can manage existing vendors on your behalf.",
  },
  {
    q: "How do engagements usually start?",
    a: "With a consultation. We understand your requirements, then propose a scoped plan with timelines and commercials.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <h2 className="heading-bar">Frequently asked</h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-[#64748b]">
            Can&apos;t find what you need? Write to us and we&apos;ll respond within one business day.
          </p>
        </div>
        <div className="border-t border-[#e2e8f0]">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-[#e2e8f0]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[18px] font-medium tracking-[-0.015em] text-[#0f172a]">{item.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-[#2563eb] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[15px] leading-[1.6] text-[#64748b]">{item.a}</p>
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
