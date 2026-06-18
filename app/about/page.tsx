import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MNM AI Resume — our mission to help every job seeker present their best self with AI.",
};

const values = [
  {
    title: "Accessibility first",
    desc: "A great resume shouldn't cost a fortune or require professional writing skills. We make career tools available to everyone.",
  },
  {
    title: "Built on trust",
    desc: "Your data is yours. We process it securely on AWS, never sell it, and give you full control to delete it anytime.",
  },
  {
    title: "Results that matter",
    desc: "We measure success by interviews booked and offers landed — not vanity metrics.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 lg:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            About {siteConfig.name}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We help people tell their professional story
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {siteConfig.name} is an AI-powered platform that helps job seekers
            create professional, ATS-friendly resumes and tailored cover letters
            in minutes. We started in {siteConfig.founded} with a simple belief:
            everyone deserves a fair shot at the job they want, regardless of how
            good they are at writing about themselves.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our mission
            </h2>
            <p className="mt-4 text-slate-600">
              Hiring is increasingly automated. Most applications are filtered by
              software before a human ever reads them. That puts talented people —
              especially career switchers, new graduates, and non-native English
              speakers — at a disadvantage.
            </p>
            <p className="mt-4 text-slate-600">
              We use modern AI to level the playing field: turning real experience
              into clear, compelling, machine-readable resumes that get past the
              filters and in front of decision makers.
            </p>
          </div>
          <div className="grid gap-4">
            {values.map((v) => (
              <div key={v.title} className="card">
                <h3 className="font-semibold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Built on a modern, scalable stack
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {siteConfig.name} is built with Next.js and runs on AWS cloud
            infrastructure, with AI generation designed to integrate with Amazon
            Bedrock foundation models for reliable, secure, and scalable results.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            {["Next.js", "React", "TypeScript", "AWS", "Amazon Bedrock", "Tailwind CSS"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-2xl font-extrabold text-accent-400">
                MH
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                  Founder
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {siteConfig.author}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {siteConfig.name} is founded and built by {siteConfig.author},
                  a software developer passionate about using AI to make career
                  tools accessible to everyone. Connect on{" "}
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand-700 hover:underline"
                  >
                    LinkedIn
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
