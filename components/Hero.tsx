import Link from "next/link";
import { WarpField } from "./WarpField";
import { Spacecraft } from "./Spacecraft";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-[#050505] pt-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <WarpField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_88%)]" />
      </div>
      <Spacecraft />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1120px] flex-col justify-end px-5 pb-16 sm:px-8 lg:justify-center lg:pb-24">
        <p className="text-[13px] font-medium tracking-[-0.26px] text-white">AI STRATEGY. REAL-WORLD IMPACT.</p>
        <h1 className="mt-5 max-w-[18ch] text-[clamp(48px,10vw,76px)] font-semibold leading-[1.06] tracking-[-3px] text-white">
          We find where AI fits. Then we build it.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] font-normal leading-[1.5] tracking-[-0.32px] text-[#cccccc]">
          AI strategy and custom solutions for businesses that want more revenue, faster growth and time back.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={site.calendly} className="btn-primary-on-dark">
            Book a call
          </Link>
          <Link href="/case-studies" className="btn-secondary-on-dark">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
