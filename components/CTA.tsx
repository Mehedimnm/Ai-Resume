import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-16 text-center shadow-2xl shadow-brand-900/20 sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
          >
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          </div>

          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your next interview starts here
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
            Join thousands of job seekers using MNM AI Resume to stand out. Build
            your resume free — no credit card needed.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-900/30 transition-transform hover:scale-[1.03] hover:bg-accent-600"
            >
              Build my resume free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
