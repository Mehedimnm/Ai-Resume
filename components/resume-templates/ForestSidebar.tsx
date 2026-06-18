import type { TemplateProps } from "@/lib/types";
import { getContactItems, ContactIcon } from "./shared";

export default function ForestSidebar({ form, result }: TemplateProps) {
  const contacts = getContactItems(form);
  const initials = (form.fullName || "Your Name")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="resume-page grid grid-cols-[34%_66%] font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="bg-brand-800 px-6 py-8 text-brand-50">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-500 text-2xl font-extrabold text-white">
            {initials}
          </div>
        </div>

        {contacts.length > 0 && (
          <SidebarSection title="Contact">
            <ul className="space-y-2.5">
              {contacts.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] leading-snug text-brand-100">
                  <ContactIcon type={c.icon} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-400" />
                  <span className="break-all">{c.value}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        <SidebarSection title="Skills">
          <div className="flex flex-col gap-2">
            {result.skills.map((s) => (
              <span key={s} className="text-xs text-brand-50">
                <span className="mr-1.5 text-accent-400">▪</span>
                {s}
              </span>
            ))}
          </div>
        </SidebarSection>

        {form.education && (
          <SidebarSection title="Education">
            <p className="whitespace-pre-line text-[11px] leading-relaxed text-brand-100">
              {form.education}
            </p>
          </SidebarSection>
        )}
      </aside>

      {/* Main */}
      <main className="px-8 py-8">
        <header className="border-b-2 border-accent-500 pb-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-900">
            {form.fullName || "Your Name"}
          </h1>
          <p className="mt-1 font-semibold text-accent-600">
            {form.targetRole || form.jobTitle}
          </p>
        </header>

        <MainSection title="Profile">
          <p className="text-sm leading-relaxed text-slate-700">{result.summary}</p>
        </MainSection>

        <MainSection title="Key Strengths">
          <ul className="space-y-1.5">
            {result.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                {h}
              </li>
            ))}
          </ul>
        </MainSection>

        <MainSection title="Experience">
          <ul className="space-y-1.5">
            {result.experienceBullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                {b}
              </li>
            ))}
          </ul>
        </MainSection>
      </main>
    </div>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-3 border-b border-brand-600 pb-1 text-xs font-bold uppercase tracking-[0.15em] text-accent-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-brand-800">
        {title}
      </h2>
      {children}
    </section>
  );
}
