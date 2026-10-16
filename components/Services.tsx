import Link from "next/link";

const services = [
  {
    title: "AI Opportunity Audit",
    body: "Find the highest-impact opportunities hiding in your business.",
  },
  {
    title: "Custom AI Solutions",
    body: "Purpose-built intelligence that works with the way you work.",
  },
  {
    title: "Cloud Deployment & Support",
    body: "Secure, reliable infrastructure. Built to grow with you.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container-page">
        <p className="eyebrow">01 / OUR EXPERTISE</p>
        <h2 className="mt-4 max-w-xl text-[clamp(32px,6vw,48px)] font-medium leading-[1.1] tracking-[-1.8px] text-[#050505]">
          AI is the advantage. We build yours.
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} className="border-t border-black/10 pt-6">
              <h3 className="text-[22px] font-medium text-[#050505]">{s.title}</h3>
              <p className="mt-4 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#666666]">{s.body}</p>
              <Link href="/contact" className="mt-6 inline-block text-[13px] font-medium tracking-[-0.26px] text-[#555555]">
                Learn more
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
