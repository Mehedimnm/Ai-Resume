import type { Metadata } from "next";
import Link from "next/link";
import { templates, RenderTemplate } from "@/components/resume-templates";
import { sampleForm, sampleResult } from "@/lib/sample";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Premium Resume & CV Templates",
  description:
    "Browse premium, ATS-friendly resume and CV templates in a dark green and orange theme. Pick one and export to PDF in minutes.",
};

export default function TemplatesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 lg:py-20">
        <div className="container-page max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
            Premium templates
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Resume &amp; CV templates that get noticed
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Professionally designed, ATS-friendly, and ready to export as a
            polished PDF. Pick a layout, fill in your details, and download.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {templates.map((t) => (
            <div key={t.id} className="flex flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    {t.name}
                    {t.badge && (
                      <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        {t.badge}
                      </span>
                    )}
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">{t.description}</p>
                </div>
                <Link
                  href="/builder"
                  className="btn-secondary shrink-0 py-2 text-xs"
                >
                  Use template
                </Link>
              </div>

              {/* Scaled preview */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm">
                <div className="mx-auto origin-top scale-[0.82] overflow-hidden rounded-lg shadow-xl">
                  <RenderTemplate id={t.id} form={sampleForm} result={sampleResult} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
