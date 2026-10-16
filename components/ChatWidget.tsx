"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { site } from "@/lib/site";

const replies: Record<string, string> = {
  "What is an audit?":
    "We map your workflows, tools, and data, then hand you a prioritized AI roadmap with estimated ROI — in plain language.",
  "How fast can you build?":
    "Most projects go from audit to a first working prototype in 2 to 4 weeks.",
  "Is my data safe?":
    "Yes. We deploy on secure cloud infrastructure with encryption and access controls. We can walk the model through on a call.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-white/10 bg-avnox-surface p-4 shadow-lift">
          <p className="text-sm font-semibold text-white">Ask Avnox</p>
          <p className="mt-1 text-xs text-avnox-muted">Live demo replies — swap this for your real assistant later.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(replies).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setActive(q)}
                className={`rounded-full border px-2.5 py-1 text-xs transition ${
                  active === q
                    ? "border-avnox-accent text-avnox-accent"
                    : "border-white/15 text-avnox-faint hover:border-white/40"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-avnox-faint">
            {active ? replies[active] : "Pick a question, or book a call if you’d rather talk to a person."}
          </p>
          <a href={site.calendly} className="btn-primary mt-3 w-full text-center">
            Book a Call
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-avnox-accent to-avnox-hot text-avnox-ink shadow-glow"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
