import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="bg-white pt-40">
      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-[clamp(48px,8vw,76px)] font-semibold leading-[1.06] tracking-[-3px] text-[#050505]">
            Let’s find your next advantage.
          </h1>
          <p className="mt-5 max-w-md text-[16px] tracking-[-0.32px] text-[#999999]">
            Start with a conversation. {site.email}
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
