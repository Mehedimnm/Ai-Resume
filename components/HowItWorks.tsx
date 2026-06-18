const steps = [
  {
    step: "01",
    title: "Add your details",
    desc: "Enter your experience, skills, and the role you're targeting. Rough notes are fine — our AI handles the polish.",
  },
  {
    step: "02",
    title: "Let AI do the writing",
    desc: "MNM AI Resume generates strong, ATS-friendly bullet points, a sharp summary, and a tailored cover letter.",
  },
  {
    step: "03",
    title: "Review & export",
    desc: "Tweak anything you like, pick a template, and export a polished PDF ready to send to recruiters.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From blank page to interview-ready in 3 steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              <div className="card h-full">
                <span className="text-4xl font-extrabold text-brand-200">
                  {s.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-brand-200 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
