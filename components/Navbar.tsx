"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const menu = [
  {
    label: "Services",
    items: [
      ["IT Consulting & Management", "/#services"],
      ["AI & Technology Solutions", "/#services"],
      ["Cloud & Technology Migration", "/#services"],
      ["Staffing & Workforce", "/#services"],
      ["Software & Licensing", "/#services"],
      ["Hardware & Equipment", "/#services"],
    ],
  },
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Careers", href: "/careers" },
  { label: "Company", href: "/contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-[#e2e8f0] bg-[#f8fafc]/90 backdrop-blur-md" : "border-transparent bg-[#f8fafc]"
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {menu.map((m) =>
            "items" in m ? (
              <div key={m.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-[14px] text-[#334155] transition-colors hover:text-[#2563eb]"
                >
                  {m.label}
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl border border-[#e2e8f0] bg-white p-2 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)]">
                    {m.items.map(([label, href]) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className="block rounded-lg px-3 py-2.5 text-[14px] text-[#334155] transition-colors hover:bg-[#eff6ff] hover:text-[#2563eb]"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={m.label}
                href={m.href}
                className="rounded-md px-3 py-2 text-[14px] text-[#334155] transition-colors hover:text-[#2563eb]"
              >
                {m.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex justify-end">
          <Link href={site.calendly} className="btn-primary hidden md:inline-flex">
            Let&apos;s talk <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#e2e8f0] bg-[#f8fafc] px-5 py-5 md:hidden">
          <ul className="space-y-1">
            {[["Services", "/#services"], ["Solutions", "/#solutions"], ["Industries", "/#industries"], ["Careers", "/careers"], ["Contact", "/contact"]].map(
              ([label, href]) => (
                <li key={label}>
                  <Link href={href} className="block py-2 text-[16px] text-[#0f172a]">
                    {label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href={site.calendly} className="btn-primary mt-4 w-full">
            Let&apos;s talk
          </Link>
        </div>
      )}
    </header>
  );
}
