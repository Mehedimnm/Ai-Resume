import type { TemplateProps } from "@/lib/types";
import { getContactItems, ContactIcon } from "./shared";

export default function EmeraldClassic({ form, result }: TemplateProps) {
  const contacts = getContactItems(form);

  return (
    <div className="resume-page font-sans text-slate-800">
      {/* Header band */}
      <header className="bg-brand-800 px-10 py-8 text-white">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {form.fullName || "Your Name"}
        </h1>
        <p className="mt-1 text-base font-medium text-accent-400">
          {form.targetRole || form.jobTitle}
        </p>
        {contacts.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-brand-100">
            {contacts.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ContactIcon type={c.icon} className="h-3.5 w-3.5 text-accent-400" />
                {c.value}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="px-10 py-8">
        <Section title="Professional Summary">
          <p className="text-sm leading-relaxed text-slate-700">{result.summary}</p>
        </Section>

        <Section title="Key Strengths">
          <ul className="space-y-1.5">
            {result.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                {h}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="space-y-1.5">
            {result.experienceBullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
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
          <div className="flex flex-wrap gap-2">
            {result.skills.map((s) => (
              <span
                key={s}
                className="rounded-md border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      </div>
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
    <section className="mb-6 last:mb-0">
      <h2 className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-brand-800">
        {title}
        <span className="h-0.5 flex-1 bg-accent-500/60" />
      </h2>
      {children}
    </section>
  );
}
