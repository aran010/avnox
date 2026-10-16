import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { CaseStudies } from "@/components/CaseStudies";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { CtaBanner } from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <CaseStudies />
      <HowItWorks />
      <FAQ />
      <CtaBanner />
    </>
  );
}
