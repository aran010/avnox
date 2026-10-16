"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const sync = () => {
      const coversHeader = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < 220 && r.bottom > 80;
      };
      setOverHero(coversHeader("hero") || coversHeader("work"));
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [pathname]);

  const dark = overHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        dark ? "bg-[#050505]/90 backdrop-blur-md" : "border-b border-black/10 bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Logo onDark={dark} />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-medium tracking-[-0.26px] ${
                dark ? "text-[#cccccc] hover:text-white" : "text-[#555555] hover:text-[#050505]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href={site.calendly} className={dark ? "btn-primary-on-dark ml-2" : "btn-primary ml-2"}>
            Book a call
          </Link>
        </nav>
        <button
          type="button"
          className={`grid h-10 w-10 place-items-center md:hidden ${dark ? "text-white" : "text-[#050505]"}`}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-4 border-t border-black/10 bg-white px-5 py-5 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-[13px] font-medium text-[#555555]">
              {link.label}
            </Link>
          ))}
          <Link href={site.calendly} className="btn-primary w-fit">
            Book a call
          </Link>
        </div>
      )}
    </header>
  );
}
