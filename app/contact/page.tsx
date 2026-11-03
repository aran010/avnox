import { Suspense } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Schedule a 30-minute introductory call with Avnox for IT consulting, AI solutions, cloud migration, staffing, software, or hardware.",
};

export default function ContactPage() {
  return (
    <div
      className="relative isolate min-h-screen overflow-hidden pt-24 pb-28"
      style={{
        background:
          "radial-gradient(ellipse 85% 60% at 50% 0%, rgba(37, 99, 235, 0.15) 0%, rgba(219, 234, 254, 0.55) 45%, transparent 80%), radial-gradient(ellipse 65% 55% at 85% 85%, rgba(59, 130, 246, 0.12) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(224, 242, 254, 0.7) 0%, transparent 65%), linear-gradient(180deg, #f8fafc 0%, #eef4ff 52%, #f8fafc 100%)",
      }}
    >
      {/* Subtle architectural dot texture fading softly into the gradient */}
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]"
        aria-hidden
      />

      {/* Ambient blue glow behind the scheduler card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[540px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.14) 0%, rgba(191, 219, 254, 0.3) 50%, transparent 75%)",
        }}
        aria-hidden
      />

      <section className="container-page relative z-10 pt-6 sm:pt-10">
        <Suspense
          fallback={
            <div className="mx-auto h-[540px] max-w-[880px] rounded-2xl border border-[#e2e8f0] bg-white/90 p-8 backdrop-blur-md" />
          }
        >
          <ContactForm />
        </Suspense>
      </section>
    </div>
  );
}
