"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-black/10 p-8">
        <h2 className="text-[22px] font-medium text-[#050505]">Request captured locally.</h2>
        <p className="mt-3 text-[16px] text-[#999999]">This form is a front-end placeholder until you connect a provider.</p>
      </div>
    );
  }

  const field = "mt-2 w-full rounded-none border border-black/15 bg-transparent px-3 py-2.5 text-[#050505] outline-none focus:border-[#050505]";

  return (
    <form onSubmit={onSubmit} className="space-y-5 border border-black/10 p-6 sm:p-8">
      <label className="block text-[13px] font-medium text-[#555555]">
        Name
        <input required name="name" autoComplete="name" className={field} />
      </label>
      <label className="block text-[13px] font-medium text-[#555555]">
        Work email
        <input required type="email" name="email" autoComplete="email" className={field} />
      </label>
      <label className="block text-[13px] font-medium text-[#555555]">
        Company
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block text-[13px] font-medium text-[#555555]">
        What do you want to automate?
        <textarea required name="automate" rows={4} className={field} />
      </label>
      <label className="block text-[13px] font-medium text-[#555555]">
        Budget range
        <select name="budget" className={field} defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          <option>Exploring / not sure</option>
          <option>$5k–$15k</option>
          <option>$15k–$40k</option>
          <option>$40k+</option>
        </select>
      </label>
      <button type="submit" className="btn-primary">
        Book a call
      </button>
    </form>
  );
}
