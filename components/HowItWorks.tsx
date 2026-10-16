const steps = [
  { n: "01", title: "Discover", body: "We learn your business, your ambitions and what’s slowing you down." },
  { n: "02", title: "Audit", body: "We map the opportunities and prioritize a clear, practical AI roadmap." },
  { n: "03", title: "Build", body: "We design, develop and test solutions around your real workflows." },
  { n: "04", title: "Scale", body: "We deploy, support and improve your systems as your business grows." },
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="container-page">
        <h2 className="text-[clamp(32px,6vw,48px)] font-medium tracking-[-1.8px] text-[#050505]">How we work</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n}>
              <p className="text-[13px] font-medium tracking-[-0.26px] text-[#050505]">{s.n}</p>
              <h3 className="mt-4 text-[28px] font-medium tracking-[-1.12px] text-[#050505]">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#999999]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
