import type { Metadata } from "next";
import Link from "next/link";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for MNM AI Resume. Start free, upgrade when you're ready.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to build your first resume.",
    features: [
      "1 AI-generated resume",
      "1 AI cover letter",
      "Basic template",
      "PDF export",
      "ATS-friendly formatting",
    ],
    cta: "Start free",
    href: "/builder",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For active job seekers applying to multiple roles.",
    features: [
      "Unlimited resumes & cover letters",
      "All premium templates",
      "Advanced AI tailoring per job",
      "Unlimited PDF exports",
      "Keyword & ATS optimization",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/contact",
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    period: "for orgs & coaches",
    description: "For career coaches, bootcamps, and universities.",
    features: [
      "Everything in Pro",
      "Multiple seats & admin dashboard",
      "Branded templates",
      "Usage analytics",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 lg:py-20">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Start for free and upgrade only when you need more. No hidden fees,
            cancel anytime.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.featured
                  ? "border-brand-600 bg-white shadow-2xl shadow-brand-900/10 ring-1 ring-brand-600"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-slate-900">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                <span className="text-sm text-slate-500">/ {plan.period}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 ${plan.featured ? "btn-primary" : "btn-secondary"} w-full`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
