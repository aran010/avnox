import type { Metadata } from "next";
import { CaseStudies } from "@/components/CaseStudies";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <div className="pt-32">
      <CaseStudies />
      <CtaBanner />
    </div>
  );
}
