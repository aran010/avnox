import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl pt-40 pb-24">
      <h1 className="text-[clamp(32px,6vw,48px)] font-medium tracking-[-1.8px] text-[#050505]">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-relaxed text-[#666666]">
        Placeholder. Add your privacy policy here before launch. Avnox collects only what you submit through contact forms and booking tools, and we do not sell personal data.
      </p>
    </div>
  );
}
