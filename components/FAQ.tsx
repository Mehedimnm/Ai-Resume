const faqs = [
  {
    q: "Is MNM AI Resume free to use?",
    a: "Yes. You can build a complete resume and cover letter on the free plan, no credit card required. Paid plans unlock unlimited exports, premium templates, and advanced AI tailoring.",
  },
  {
    q: "Will my resume pass applicant tracking systems (ATS)?",
    a: "Our resumes use clean, parseable formatting and role-specific keywords designed to score well with the ATS software most companies use to screen applications.",
  },
  {
    q: "Do I need to write my own bullet points?",
    a: "No. Just add rough notes about your experience and our AI rewrites them into strong, achievement-focused statements. You can always edit the output.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. Your information is processed securely on AWS infrastructure, never sold, and you can delete it at any time.",
  },
  {
    q: "Can I create a different cover letter for each job?",
    a: "Yes. Paste the job description and our AI tailors a unique cover letter matched to that specific role and company.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Questions, answered
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-slate-900">
                {f.q}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 text-brand-500 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
