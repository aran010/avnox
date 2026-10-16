import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="container-page py-40">
      <p className="eyebrow">Blog soon</p>
      <h1 className="mt-4 text-[clamp(48px,8vw,76px)] font-semibold tracking-[-3px] text-[#050505]">Coming soon.</h1>
      <p className="mt-5 max-w-xl text-[16px] tracking-[-0.32px] text-[#999999]">Notes on putting AI to work will live here.</p>
    </div>
  );
}
