import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Solutions } from "@/components/Solutions";
import { Industries } from "@/components/Industries";
import { PlatformStandards } from "@/components/PlatformStandards";
import { FAQ } from "@/components/FAQ";
import { CtaBanner } from "@/components/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <Solutions />
      <Industries />
      <PlatformStandards />
      <FAQ />
      <CtaBanner />
    </>
  );
}
