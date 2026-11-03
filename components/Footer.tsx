import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      ["IT Consulting", "/#services"],
      ["AI & Technology", "/#services"],
      ["Cloud Migration", "/#services"],
      ["Staffing & Workforce", "/#services"],
      ["Software & Licensing", "/#services"],
      ["Hardware & Equipment", "/#services"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Solutions", "/#solutions"],
      ["Industries", "/#industries"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy policy", "/privacy"],
      ["Terms of service", "/terms"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#e2e8f0] bg-[#f1f5f9]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-[#64748b]">
            IT consulting, migration, staffing, software and hardware — delivered by one accountable partner.
          </p>
          <form className="mt-6 flex max-w-sm items-center rounded-lg border border-[#cbd5e1] bg-white p-1">
            <input
              type="email"
              placeholder="Subscribe for updates"
              aria-label="Email for updates"
              className="min-w-0 flex-1 bg-transparent px-3 text-[13px] placeholder:text-[#94a3b8] focus:outline-none"
            />
            <button type="submit" className="rounded-md bg-[#2563eb] px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1d4ed8]">
              Subscribe
            </button>
          </form>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[13px] font-medium text-[#0f172a]">{col.title}</p>
            <ul className="mt-5 space-y-3 text-[14px] text-[#64748b]">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-[#2563eb]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-page flex flex-col justify-between gap-4 border-t border-[#e2e8f0] py-6 text-[13px] text-[#94a3b8] sm:flex-row">
        <p>© {new Date().getFullYear()} Avnox. All rights reserved.</p>
        <div className="flex gap-6">
          <a href={site.linkedin} className="hover:text-[#0f172a]">LinkedIn</a>
          <a href={site.x} className="hover:text-[#0f172a]">X</a>
          <a href={site.instagram} className="hover:text-[#0f172a]">Instagram</a>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="-mb-[3vw] text-center text-[24vw] font-semibold leading-[0.8] tracking-[-0.06em] text-[#e2e8f0]">
          Avnox
        </p>
      </div>
    </footer>
  );
}
