import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-16">
      <div className="container-page grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 text-[16px] tracking-[-0.32px] text-[#666666]">Intelligence, applied.</p>
        </div>
        <div>
          <p className="text-[13px] font-medium tracking-[-0.26px] text-[#050505]">Services</p>
          <ul className="mt-4 space-y-2 text-[13px] font-medium tracking-[-0.26px] text-[#555555]">
            <li><Link href="/#services">AI Opportunity Audit</Link></li>
            <li><Link href="/#services">Custom AI Solutions</Link></li>
            <li><Link href="/#services">Cloud & Support</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-medium tracking-[-0.26px] text-[#050505]">Company</p>
          <ul className="mt-4 space-y-2 text-[13px] font-medium tracking-[-0.26px] text-[#555555]">
            <li><Link href="/case-studies">Case Studies</Link></li>
            <li><Link href="/blog">Blog — coming soon</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[13px] font-medium tracking-[-0.26px] text-[#050505]">Legal</p>
          <ul className="mt-4 space-y-2 text-[13px] font-medium tracking-[-0.26px] text-[#555555]">
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of service</Link></li>
            <li>
              <a href="#">LinkedIn / X</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="container-page mt-12 text-[13px] text-[#999999]">© {new Date().getFullYear()} Avnox. All rights reserved.</p>
    </footer>
  );
}
