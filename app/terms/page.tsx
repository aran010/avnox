import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-page max-w-3xl pt-40 pb-24">
      <h1 className="text-[clamp(32px,6vw,48px)] font-medium tracking-[-1.8px] text-[#050505]">Terms of Service</h1>
      <p className="mt-6 text-sm leading-relaxed text-[#666666]">
        Placeholder. Add legal terms here before launch. Until then, engagements are scoped in a written statement of work.
      </p>
    </div>
  );
}
