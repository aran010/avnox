"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  Video,
} from "lucide-react";
import { LogoMark } from "./Logo";

// Available time slots strictly from 12:30 PM to 4:30 PM (30-min intervals)
const TIME_SLOTS = [
  { start: "12:30pm", end: "1:00pm", label: "12:30 pm" },
  { start: "1:00pm", end: "1:30pm", label: "1:00 pm" },
  { start: "1:30pm", end: "2:00pm", label: "1:30 pm" },
  { start: "2:00pm", end: "2:30pm", label: "2:00 pm" },
  { start: "2:30pm", end: "3:00pm", label: "2:30 pm" },
  { start: "3:00pm", end: "3:30pm", label: "3:00 pm" },
  { start: "3:30pm", end: "4:00pm", label: "3:30 pm" },
  { start: "4:00pm", end: "4:30pm", label: "4:00 pm" },
  { start: "4:30pm", end: "5:00pm", label: "4:30 pm" },
];

// Monday-first weekday headers (matching the Calendly screenshot)
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BUDGET_OPTIONS = [
  "Exploring / flexible",
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

const DISCOVERY_SOURCES = [
  "Referral",
  "X / LinkedIn",
  "We emailed you",
  "Google / AI Search",
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLongDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortHeaderDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();

  const today = useMemo(() => startOfDay(new Date()), []);

  // View state:
  // 1) selectedDate === null -> Step 1 (Calendar only)
  // 2) selectedDate !== null && step === "calendar" -> Step 2 (Calendar + right-hand Time column)
  // 3) step === "details" -> Step 3 (Enter Details form)
  // 4) step === "confirmed" -> Confirmation screen
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [confirmedSlot, setConfirmedSlot] = useState<(typeof TIME_SLOTS)[number] | null>(
    null,
  );
  const [step, setStep] = useState<"calendar" | "details" | "confirmed">("calendar");

  // Form fields (Step 3)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [guests, setGuests] = useState("");
  const [mobile, setMobile] = useState("+91 ");
  const [company, setCompany] = useState("");
  const [purpose, setPurpose] = useState(""); // Optional
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [howFound, setHowFound] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("2:37 pm");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prefill = searchParams.get("email");
    if (prefill) setEmail(prefill);
    try {
      const now = new Date();
      setCurrentTimeStr(
        now
          .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
          .toLowerCase(),
      );
    } catch {
      // ignore
    }
  }, [searchParams]);

  // Build Monday-first calendar cells; disable past dates, Saturdays (6), and Sundays (0)
  const calendarCells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const jsFirstDay = new Date(year, month, 1).getDay(); // 0=Sun..6=Sat
    const mondayOffset = (jsFirstDay + 6) % 7; // 0=Mon..6=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<{ date: Date | null; disabled: boolean }> = [];
    for (let i = 0; i < mondayOffset; i++) {
      cells.push({ date: null, disabled: true });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      const isPast = d < today;
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
      cells.push({ date: d, disabled: isPast || isWeekend });
    }
    return cells;
  }, [viewMonth, today]);

  const canGoPrevMonth = useMemo(() => {
    const prevLastDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0);
    return prevLastDay >= today;
  }, [viewMonth, today]);

  function prevMonth() {
    if (!canGoPrevMonth) return;
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }

  function nextMonth() {
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  function handleSelectDate(d: Date) {
    setSelectedDate(d);
    setActiveSlot(null);
  }

  function handleConfirmTime(slot: (typeof TIME_SLOTS)[number]) {
    setConfirmedSlot(slot);
    setStep("details");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !confirmedSlot) return;
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          guests: guests.trim(),
          mobile: mobile.trim(),
          company: company.trim(),
          date: formatLongDate(selectedDate),
          timeRange: `${confirmedSlot.start} - ${confirmedSlot.end}`,
          timezone: "India Standard Time",
          purpose: purpose.trim(),
          timeline: timeline.trim(),
          budget,
          howFound,
          referredBy: referredBy.trim(),
        }),
      });

      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Unable to schedule event right now.");
      }

      setStep("confirmed");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-[14px] text-[#1d1d1f] placeholder:text-[#9a958c] transition-colors focus:border-[#1d1d1f] focus:outline-none";

  return (
    <div
      className={`mx-auto w-full transition-all duration-300 ${
        selectedDate && step === "calendar" ? "max-w-[1060px]" : "max-w-[880px]"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white/95 shadow-[0_32px_90px_-30px_rgba(15,23,42,0.18)] backdrop-blur-md">
        <div
          className={`grid divide-y divide-[#e2e8f0] ${
            selectedDate && step === "calendar"
              ? "lg:grid-cols-[310px_1fr_250px] lg:divide-x lg:divide-y-0"
              : "lg:grid-cols-[320px_1fr] lg:divide-x lg:divide-y-0"
          }`}
        >
          {/* LEFT PANEL: Brand + Event Info (always visible) */}
          <div className="flex flex-col justify-between bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/60 p-7 sm:p-8">
            <div>
              {/* Top logo header with back arrow on Step 3 */}
              <div className="relative flex flex-col items-center border-b border-[#e2e8f0] pb-7">
                {step === "details" && (
                  <button
                    type="button"
                    onClick={() => setStep("calendar")}
                    aria-label="Back to calendar"
                    className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-[#cbd5e1] bg-white text-[#1d1d1f] transition-colors hover:bg-[#eff6ff]"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <div className="my-2 flex flex-col items-center gap-2 text-[#1d1d1f]">
                  <LogoMark size={48} />
                  <span className="text-[18px] font-semibold tracking-[-0.03em]">
                    Avnox
                  </span>
                </div>
              </div>

              {/* Call Title & Meta */}
              <div className="pt-6">
                <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                  Avnox Intro Call
                </h2>

                <ul className="mt-4 space-y-3 text-[14px] font-medium text-[#6e6e73]">
                  <li className="flex items-center gap-2.5">
                    <Clock size={16} className="shrink-0 text-[#6e6e73]" />
                    <span>30 min</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Video size={16} className="mt-0.5 shrink-0 text-[#6e6e73]" />
                    <span className="leading-snug">
                      Web conferencing details provided upon confirmation.
                    </span>
                  </li>

                  {selectedDate && confirmedSlot && step !== "calendar" && (
                    <>
                      <li className="flex items-start gap-2.5 text-[#1d1d1f]">
                        <CalendarIcon
                          size={16}
                          className="mt-0.5 shrink-0 text-[#2563eb]"
                        />
                        <span className="leading-snug">
                          {confirmedSlot.start} - {confirmedSlot.end},{" "}
                          {formatLongDate(selectedDate)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Globe size={16} className="shrink-0 text-[#6e6e73]" />
                        <span>India Standard Time</span>
                      </li>
                    </>
                  )}
                </ul>

                <p className="mt-6 text-[14px] leading-relaxed text-[#424245]">
                  A 30-minute introductory call to discuss your upcoming technology,
                  migration, staffing, or hardware requirements, and how Avnox can support
                  you.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-5 pt-6 text-[12px] text-[#6e6e73]">
              <Link href="/privacy" className="hover:text-[#1d1d1f] hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#1d1d1f] hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* RIGHT / CENTER PANEL */}
          {step === "calendar" && (
            <>
              {/* Calendar column */}
              <div className="p-7 sm:p-8">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                  Select a Date &amp; Time
                </h3>

                {/* Month Navigation */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={prevMonth}
                    disabled={!canGoPrevMonth}
                    aria-label="Previous month"
                    className="grid h-8 w-8 place-items-center rounded-full text-[#424245] transition-colors hover:bg-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="min-w-[140px] text-center text-[15px] font-medium text-[#1d1d1f]">
                    {MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="grid h-8 w-8 place-items-center rounded-full text-[#424245] transition-colors hover:bg-[#eff6ff]"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Weekday headers (Mon - Sun) */}
                <div className="mt-6 grid grid-cols-7 text-center text-[12px] font-normal uppercase tracking-[0.04em] text-[#6e6e73]">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="py-1.5">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="mt-2 grid grid-cols-7 gap-y-2 text-center">
                  {calendarCells.map((cell, idx) => {
                    if (!cell.date) {
                      return <div key={`empty-${idx}`} className="h-11" />;
                    }
                    const iso = toISODate(cell.date);
                    const isSelected =
                      selectedDate !== null && iso === toISODate(selectedDate);
                    const isToday = iso === toISODate(today);

                    return (
                      <div key={iso} className="flex items-center justify-center">
                        <button
                          type="button"
                          disabled={cell.disabled}
                          onClick={() => handleSelectDate(cell.date!)}
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-semibold transition-all ${
                            isSelected
                              ? "bg-[#2563eb] text-white shadow-sm"
                              : cell.disabled
                              ? "cursor-not-allowed font-normal text-[#94a3b8]"
                              : "bg-[#eff6ff] text-[#2563eb] hover:bg-[#2563eb]/20"
                          }`}
                        >
                          {cell.date.getDate()}
                          {isToday && (
                            <span
                              className={`absolute bottom-1 h-1 w-1 rounded-full ${
                                isSelected ? "bg-white" : "bg-[#1d1d1f]"
                              }`}
                            />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Timezone footer */}
                <div className="mt-8">
                  <p className="text-[13px] font-semibold text-[#1d1d1f]">Time zone</p>
                  <div className="mt-1.5 inline-flex items-center gap-2 text-[13px] text-[#424245]">
                    <Globe size={14} className="text-[#6e6e73]" />
                    <span>India Standard Time ({currentTimeStr})</span>
                    <ChevronDown size={13} className="text-[#6e6e73]" />
                  </div>
                </div>
              </div>

              {/* Right-hand Time Slots column (unfolds once a date is clicked) */}
              {selectedDate && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex max-h-[520px] flex-col p-6 sm:p-7"
                >
                  <p className="text-[15px] font-medium text-[#1d1d1f]">
                    {formatShortHeaderDate(selectedDate)}
                  </p>

                  <div className="mt-5 flex-1 space-y-2.5 overflow-y-auto pr-1">
                    {TIME_SLOTS.map((slot) => {
                      const isActive = activeSlot === slot.label;
                      return (
                        <div key={slot.label} className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              isActive
                                ? handleConfirmTime(slot)
                                : setActiveSlot(slot.label)
                            }
                            className={` rounded-lg border py-3 text-[14px] font-semibold transition-all ${
                              isActive
                                ? "w-1/2 border-[#424245] bg-[#424245] text-white"
                                : "w-full border-[#2563eb]/50 bg-white text-[#2563eb] hover:border-[#2563eb] hover:bg-[#eff6ff]/60"
                            }`}
                          >
                            {slot.label}
                          </button>
                          {isActive && (
                            <button
                              type="button"
                              onClick={() => handleConfirmTime(slot)}
                              className="w-1/2 rounded-lg bg-[#2563eb] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
                            >
                              Next
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* STEP 3: Enter Details Form */}
          {step === "details" && (
            <motion.form
              initial={reduce ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28 }}
              onSubmit={onSubmit}
              className="max-h-[680px] space-y-5 overflow-y-auto p-7 sm:p-9"
            >
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                Enter Details
              </h3>

              <label className="block">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">Name *</span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">Email *</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </label>

              {!showGuests ? (
                <button
                  type="button"
                  onClick={() => setShowGuests(true)}
                  className="rounded-full border border-[#2563eb] px-4 py-1.5 text-[13px] font-medium text-[#2563eb] transition-colors hover:bg-[#eff6ff]"
                >
                  Add guests
                </button>
              ) : (
                <label className="block">
                  <span className="text-[13px] font-semibold text-[#1d1d1f]">
                    Guest Email(s)
                  </span>
                  <input
                    type="text"
                    name="guests"
                    placeholder="colleague@company.com"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={inputClass}
                  />
                </label>
              )}

              <label className="block">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">
                  Mobile Number *
                </span>
                <div className="relative mt-1.5 flex items-center rounded-lg border border-[#cbd5e1] bg-white focus-within:border-[#1d1d1f]">
                  <span className="pl-3.5 pr-2 text-[15px]" aria-hidden>
                    🇮🇳
                  </span>
                  <input
                    required
                    type="tel"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full rounded-lg bg-transparent py-2.5 pr-3.5 text-[14px] text-[#1d1d1f] focus:outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">
                  Company *
                </span>
                <input
                  required
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between text-[13px] font-semibold text-[#1d1d1f]">
                  <span>Purpose of work (Tell us a bit about your requirements)</span>
                  <span className="rounded-full bg-[#eff6ff] px-2.5 py-0.5 text-[11px] font-normal text-[#6e6e73]">
                    Optional
                  </span>
                </span>
                <textarea
                  name="purpose"
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between text-[13px] font-semibold text-[#1d1d1f]">
                  <span>When is your project slated for?</span>
                  <span className="text-[11px] font-normal text-[#9a958c]">Optional</span>
                </span>
                <input
                  type="text"
                  name="timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className="flex items-center justify-between text-[13px] font-semibold text-[#1d1d1f]">
                  <span>Estimated budget</span>
                  <span className="text-[11px] font-normal text-[#9a958c]">Optional</span>
                </span>
                <select
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select...</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="block">
                <legend className="text-[13px] font-semibold text-[#1d1d1f]">
                  How did you find out about us?
                </legend>
                <div className="mt-2.5 space-y-2">
                  {DISCOVERY_SOURCES.map((src) => (
                    <label
                      key={src}
                      className="flex cursor-pointer items-center gap-2.5 text-[14px] text-[#424245]"
                    >
                      <input
                        type="radio"
                        name="howFound"
                        value={src}
                        checked={howFound === src}
                        onChange={() => setHowFound(src)}
                        className="h-4 w-4 accent-[#2563eb]"
                      />
                      <span>{src}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">
                  If you were referred, who told you about us?
                </span>
                <input
                  type="text"
                  name="referredBy"
                  value={referredBy}
                  onChange={(e) => setReferredBy(e.target.value)}
                  className={inputClass}
                />
              </label>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-[#2563eb]/30 bg-[#2563eb]/10 px-3.5 py-2 text-[13px] text-[#1e40af]"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="text-[12px] leading-relaxed text-[#6e6e73]">
                By proceeding, you confirm that you have read and agree to Avnox&apos;s{" "}
                <Link href="/terms" className="font-medium text-[#2563eb] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#2563eb] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-7 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#2563eb] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Event"
                  )}
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: Confirmed State */}
          {step === "confirmed" && selectedDate && confirmedSlot && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col justify-center p-8 sm:p-12"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#2563eb]/15 text-[#2563eb]">
                <Check size={22} strokeWidth={2.4} />
              </div>
              <h3 className="mt-5 text-[24px] font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                You are scheduled
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">
                A calendar invitation has been sent to{" "}
                <span className="font-medium text-[#1d1d1f]">{email}</span>.
              </p>

              <div className="mt-6 space-y-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-5 text-[14px]">
                <p className="font-semibold text-[#1d1d1f]">Avnox Intro Call</p>
                <p className="text-[#424245]">
                  {confirmedSlot.start} - {confirmedSlot.end},{" "}
                  {formatLongDate(selectedDate)}
                </p>
                <p className="text-[#6e6e73]">India Standard Time</p>
                {purpose.trim() && (
                  <p className="border-t border-[#e2e8f0] pt-2.5 text-[13px] text-[#424245]">
                    <span className="font-medium text-[#1d1d1f]">Purpose: </span>
                    {purpose}
                  </p>
                )}
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => {
                    setStep("calendar");
                    setSelectedDate(null);
                    setActiveSlot(null);
                    setConfirmedSlot(null);
                  }}
                  className="rounded-full border border-[#cbd5e1] px-5 py-2.5 text-[13px] font-medium text-[#1d1d1f] transition-colors hover:bg-[#eff6ff]"
                >
                  Schedule another call
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
