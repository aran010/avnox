export function Stats() {
  const items = [
    { n: "40%", l: "Less time on repetitive work" },
    { n: "3×", l: "Faster business workflows" },
    { n: "100+", l: "Hours returned to your team / month" },
  ];

  return (
    <section className="py-24">
      <div className="container-page">
        <p className="eyebrow">THE POTENTIAL, IN NUMBERS / ILLUSTRATIVE RESULTS</p>
        <ul className="mt-10 grid gap-10 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.n}>
              <p className="text-[clamp(48px,8vw,76px)] font-semibold leading-none tracking-[-3px] text-[#050505]">{item.n}</p>
              <p className="mt-4 text-[16px] tracking-[-0.32px] text-[#999999]">{item.l}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
