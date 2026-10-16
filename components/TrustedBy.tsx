"use client";

const logos = ["Retail", "Healthcare", "Logistics", "SaaS", "Real Estate", "Finance"];

export function TrustedBy() {
  const row = [...logos, ...logos];

  return (
    <section className="border-y border-white/10 py-10" aria-label="Industries we work with">
      <p className="container-page mb-6 text-center text-xs uppercase tracking-[0.2em] text-avnox-muted">
        Businesses we&apos;ve helped scale with AI
      </p>
      <div className="overflow-hidden">
        <ul className="flex w-max animate-marquee gap-10 px-6 motion-reduce:animate-none">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="whitespace-nowrap text-lg font-semibold tracking-tight text-white/30 sm:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <p className="container-page mt-4 text-center text-xs text-avnox-muted">
        Placeholder industry marks — swap in client logos when you have clearance.
      </p>
    </section>
  );
}
