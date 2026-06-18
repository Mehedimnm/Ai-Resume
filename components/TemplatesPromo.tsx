import Link from "next/link";
import { templates, RenderTemplate } from "@/components/resume-templates";
import { sampleForm, sampleResult } from "@/lib/sample";

export default function TemplatesPromo() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
            Premium templates
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Pick a polished, ATS-friendly design
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Professionally crafted resume and CV templates in a sharp dark green
            and orange theme. Export to PDF in one click.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute left-1/2 top-3 w-[280px] -translate-x-1/2 origin-top scale-[0.34] overflow-hidden rounded shadow-lg">
                  <RenderTemplate id={t.id} form={sampleForm} result={sampleResult} />
                </div>
                {t.badge && (
                  <span className="absolute right-2 top-2 z-10 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    {t.badge}
                  </span>
                )}
              </div>
              <div className="border-t border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/templates" className="btn-primary">
            Browse all templates
          </Link>
        </div>
      </div>
    </section>
  );
}
