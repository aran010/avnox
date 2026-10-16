import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <div className="container-page pt-40 pb-24">
      <p className="eyebrow">Careers</p>
      <h1 className="mt-4 max-w-2xl text-[clamp(48px,8vw,76px)] font-semibold tracking-[-3px] text-[#050505]">Join Avnox.</h1>
      <p className="mt-5 max-w-xl text-[#666666]">
        No open roles listed yet. Send a note to {site.email} if you build AI products for operators.
      </p>
      <Link href="/contact" className="btn-primary mt-8">
        Get in touch
      </Link>
    </div>
  );
}
