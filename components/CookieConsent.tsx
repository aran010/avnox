"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";

const STORAGE_KEY = "avnox_cookie_consent_v1";

type ConsentState = {
  essential: true;
  analytics: boolean;
  functional: boolean;
  updatedAt: string;
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(saved) as Partial<ConsentState>;
        if (typeof parsed.analytics === "boolean") setAnalytics(parsed.analytics);
        if (typeof parsed.functional === "boolean") setFunctional(parsed.functional);
      }
    } catch {
      setVisible(true);
    }

    const onOpenSettings = () => {
      setCustomize(true);
      setVisible(true);
    };
    window.addEventListener("avnox:open-cookie-settings", onOpenSettings);
    return () => window.removeEventListener("avnox:open-cookie-settings", onOpenSettings);
  }, []);

  function saveConsent(nextAnalytics: boolean, nextFunctional: boolean) {
    const payload: ConsentState = {
      essential: true,
      analytics: nextAnalytics,
      functional: nextFunctional,
      updatedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage errors in private browsing
    }
    setAnalytics(nextAnalytics);
    setFunctional(nextFunctional);
    setVisible(false);
    setCustomize(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Cookie and privacy consent"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[540px] rounded-2xl border border-[#cbd5e1] bg-white/95 p-5 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)] backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-[#0f172a]">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#eff6ff] text-[#2563eb]">
                <ShieldCheck size={16} />
              </span>
              <h2 className="text-[14px] font-semibold tracking-[-0.01em]">
                Privacy &amp; Cookie Preferences (GDPR)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => saveConsent(false, false)}
              aria-label="Dismiss and use essential cookies only"
              className="rounded-lg p-1 text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
            >
              <X size={16} />
            </button>
          </div>

          <p className="mt-2.5 text-[13px] leading-[1.55] text-[#475569]">
            We use essential cookies to keep our site secure and functional, and optional analytics cookies to improve performance. Read our{" "}
            <Link href="/privacy" className="font-medium text-[#2563eb] underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          {customize && (
            <div className="mt-4 space-y-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3.5 text-[13px]">
              <label className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-medium text-[#0f172a]">Strictly Necessary</span>
                  <p className="text-[11.5px] text-[#64748b]">Required for security, CSRF/WAF protection and session integrity.</p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="h-4 w-4 rounded border-[#cbd5e1] accent-[#2563eb]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-[#e2e8f0] pt-2.5">
                <div>
                  <span className="font-medium text-[#0f172a]">Functional &amp; Scheduling</span>
                  <p className="text-[11.5px] text-[#64748b]">Remembers your timezone and consultation booking preferences.</p>
                </div>
                <input
                  type="checkbox"
                  checked={functional}
                  onChange={(e) => setFunctional(e.target.checked)}
                  className="h-4 w-4 rounded border-[#cbd5e1] accent-[#2563eb]"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-[#e2e8f0] pt-2.5">
                <div>
                  <span className="font-medium text-[#0f172a]">Performance &amp; Core Web Vitals</span>
                  <p className="text-[11.5px] text-[#64748b]">Anonymous page speed and reliability telemetry.</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded border-[#cbd5e1] accent-[#2563eb]"
                />
              </label>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCustomize((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-[12.5px] font-medium text-[#334155] transition-colors hover:border-[#cbd5e1] hover:text-[#0f172a]"
            >
              <SlidersHorizontal size={13} />
              {customize ? "Hide options" : "Preferences"}
            </button>
            <button
              type="button"
              onClick={() => saveConsent(false, false)}
              className="rounded-lg border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2 text-[12.5px] font-medium text-[#0f172a] transition-colors hover:bg-[#f1f5f9]"
            >
              Essential only
            </button>
            {customize ? (
              <button
                type="button"
                onClick={() => saveConsent(analytics, functional)}
                className="rounded-lg bg-[#2563eb] px-4 py-2 text-[12.5px] font-medium text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] transition-colors hover:bg-[#1d4ed8]"
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                onClick={() => saveConsent(true, true)}
                className="rounded-lg bg-[#2563eb] px-4 py-2 text-[12.5px] font-medium text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.55)] transition-colors hover:bg-[#1d4ed8]"
              >
                Accept all
              </button>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

