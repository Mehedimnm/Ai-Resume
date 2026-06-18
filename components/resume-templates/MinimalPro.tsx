import type { TemplateProps } from "@/lib/types";
import { getContactItems } from "./shared";

export default function MinimalPro({ form, result }: TemplateProps) {
  const contacts = getContactItems(form).map((c) => c.value).join("  ·  ");

  return (
    <div className="resume-page px-12 py-10 font-sans text-slate-800">
      <header className="text-center">
        <h1 className="text-4xl font-light tracking-wide text-slate-900">
          {form.fullName || "Your Name"}
        </h1>
        <div className="mx-auto mt-3 h-px w-16 bg-accent-500" />
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-700">
          {form.targetRole || form.jobTitle}
        </p>
        {contacts && (
          <p className="mt-3 text-xs text-slate-500">{contacts}</p>
        )}
      </header>

      <Section title="Summary">
        <p className="text-sm leading-relaxed text-slate-700">{result.summary}</p>
      </Section>

      <Section title="Strengths">
        <ul className="grid grid-cols-1 gap-1.5">
          {result.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-accent-500">—</span>
              {h}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Experience">
        <ul className="space-y-1.5">
          {result.experienceBullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-brand-600">—</span>
              {b}
            </li>
          ))}
        </ul>
      </Section>

      {form.education && (
        <Section title="Education">
          <p className="whitespace-pre-line text-sm text-slate-700">
            {form.education}
          </p>
        </Section>
      )}

      <Section title="Skills">
        <p className="text-sm leading-relaxed text-slate-700">
          {result.skills.join("  ·  ")}
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
        {title}
      </h2>
      {children}
    </section>
  );
}
