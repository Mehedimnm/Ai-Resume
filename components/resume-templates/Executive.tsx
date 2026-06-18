import type { TemplateProps } from "@/lib/types";
import { getContactItems, ContactIcon } from "./shared";

export default function Executive({ form, result }: TemplateProps) {
  const contacts = getContactItems(form);

  return (
    <div className="resume-page px-11 py-10 font-sans text-slate-800">
      <header className="flex items-end justify-between border-b-4 border-double border-brand-700 pb-4">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-900">
            {form.fullName || "Your Name"}
          </h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-accent-600">
            {form.targetRole || form.jobTitle}
          </p>
        </div>
        <div className="space-y-1 text-right text-[11px] text-slate-500">
          {contacts.map((c, i) => (
            <span key={i} className="flex items-center justify-end gap-1.5">
              {c.value}
              <ContactIcon type={c.icon} className="h-3 w-3 text-brand-600" />
            </span>
          ))}
        </div>
      </header>

      <Section title="Executive Summary">
        <p className="text-sm leading-relaxed text-slate-700">{result.summary}</p>
      </Section>

      <Section title="Core Competencies">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {result.highlights.map((h, i) => (
            <p key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-accent-500">◆</span>
              {h}
            </p>
          ))}
        </div>
      </Section>

      <Section title="Professional Experience">
        <ul className="space-y-2">
          {result.experienceBullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-700" />
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-6 grid grid-cols-2 gap-8">
        {form.education && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <p className="whitespace-pre-line text-sm text-slate-700">
              {form.education}
            </p>
          </section>
        )}
        <section>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {result.skills.map((s) => (
              <span
                key={s}
                className="rounded-sm bg-brand-800 px-2 py-0.5 text-[11px] font-medium text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 font-serif text-base font-bold text-brand-900">
      <span className="border-b-2 border-accent-500 pb-0.5">{children}</span>
    </h2>
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
    <section className="mt-6">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}
