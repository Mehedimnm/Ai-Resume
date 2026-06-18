import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-300/40 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent-200/50 blur-3xl" />
      </div>

      <div className="container-page py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-500" />
              AI-powered · ATS-optimized · Free to start
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Land your next job with an{" "}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                AI-built resume
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              MNM AI Resume turns your experience into a polished, recruiter-ready
              resume and a tailored cover letter in minutes. Beat the bots, impress
              the humans.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/builder" className="btn-primary px-7 py-3.5 text-base">
                Build my resume free
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/cover-letter" className="btn-secondary px-7 py-3.5 text-base">
                Write a cover letter
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                No credit card
              </span>
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                Export to PDF
              </span>
            </div>
          </div>

          {/* Resume preview mockup */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-brand-200/40 to-accent-200/40 blur-2xl" />
            <div className="rotate-1 rounded-2xl border border-slate-200 bg-white p-7 shadow-2xl shadow-brand-900/10 transition-transform hover:rotate-0">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-lg font-bold text-slate-900">Ayesha Rahman</p>
                  <p className="text-sm text-brand-600">Senior Product Designer</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
                  AR
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="h-2.5 w-full rounded-full bg-slate-100" />
                <div className="h-2.5 w-11/12 rounded-full bg-slate-100" />
                <div className="h-2.5 w-4/5 rounded-full bg-slate-100" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Experience
              </p>
              <div className="mt-3 space-y-3">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-3/4 rounded-full bg-slate-100" />
                    <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Figma", "UX Research", "Design Systems", "Prototyping"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl animate-float">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900">ATS Score</p>
                <p className="text-xs text-green-600">94% match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
