const testimonials = [
  {
    quote:
      "I rewrote my resume in 10 minutes and started getting callbacks the same week. The AI bullet points were sharper than anything I'd written myself.",
    name: "Tanvir Ahmed",
    role: "Software Engineer",
  },
  {
    quote:
      "The tailored cover letters saved me hours. Each one actually felt specific to the company instead of a generic template.",
    name: "Sadia Islam",
    role: "Marketing Manager",
  },
  {
    quote:
      "As a career switcher, I struggled to frame my experience. MNM AI Resume helped me tell a clear, confident story.",
    name: "Rahim Khan",
    role: "Data Analyst",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Loved by job seekers
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Real results from real applicants
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex gap-1 text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
