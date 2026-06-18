"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production this would POST to a backend / email service.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">Thanks for reaching out!</h3>
        <p className="mt-2 text-sm text-slate-600">
          We&apos;ve received your message and will get back to you within 1–2
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div>
        <label className="label-field" htmlFor="name">Name</label>
        <input id="name" className="input-field" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name" />
      </div>
      <div>
        <label className="label-field" htmlFor="email">Email</label>
        <input id="email" type="email" className="input-field" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com" />
      </div>
      <div>
        <label className="label-field" htmlFor="message">Message</label>
        <textarea id="message" className="input-field min-h-[140px]" required value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?" />
      </div>
      <button type="submit" className="btn-primary w-full">Send message</button>
    </form>
  );
}
