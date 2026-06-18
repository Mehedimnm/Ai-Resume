"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ResumeInput, GeneratedResume, TemplateId } from "@/lib/types";
import { templates, RenderTemplate } from "@/components/resume-templates";
import { useAuth } from "@/components/AuthProvider";
import { downloadElementAsPdf } from "@/lib/pdf";

const initialState: ResumeInput = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
  targetRole: "",
  aboutYou: "",
  experienceLevel: "mid",
};

export default function ResumeBuilder() {
  const [form, setForm] = useState<ResumeInput>(initialState);
  const [result, setResult] = useState<GeneratedResume | null>(null);
  const [template, setTemplate] = useState<TemplateId>("emerald-classic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  function update<K extends keyof ResumeInput>(key: K, value: ResumeInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    // Require authentication before generating.
    if (!user) {
      router.push(`/signin?next=${encodeURIComponent("/builder")}`);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResult(data.result as GeneratedResume);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleGenerate} className="card space-y-5 no-print">
        <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-900">
              Don&apos;t know what to write? Let AI do it.
            </p>
            <p className="mt-0.5 text-xs text-brand-800/80">
              Just enter your <strong>name</strong> and <strong>target role</strong>.
              AI writes a complete, professional resume for you — fill the optional
              fields only if you want more accuracy.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="fullName">Full name *</label>
            <input id="fullName" className="input-field" value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Ayesha Rahman" required />
          </div>
          <div>
            <label className="label-field" htmlFor="jobTitle">Current job title *</label>
            <input id="jobTitle" className="input-field" value={form.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              placeholder="Product Designer" required />
          </div>
          <div>
            <label className="label-field" htmlFor="email">Email *</label>
            <input id="email" type="email" className="input-field" value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com" required />
          </div>
          <div>
            <label className="label-field" htmlFor="phone">Phone</label>
            <input id="phone" className="input-field" value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+880 1XXX-XXXXXX" />
          </div>
          <div>
            <label className="label-field" htmlFor="location">Location</label>
            <input id="location" className="input-field" value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Dhaka, Bangladesh" />
          </div>
          <div>
            <label className="label-field" htmlFor="website">Website / LinkedIn</label>
            <input id="website" className="input-field" value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="linkedin.com/in/you" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="targetRole">Target role *</label>
            <input id="targetRole" className="input-field" value={form.targetRole}
              onChange={(e) => update("targetRole", e.target.value)}
              placeholder="Senior Product Designer" />
          </div>
          <div>
            <label className="label-field" htmlFor="experienceLevel">Experience level</label>
            <select id="experienceLevel" className="input-field"
              value={form.experienceLevel}
              onChange={(e) => update("experienceLevel", e.target.value as ResumeInput["experienceLevel"])}>
              <option value="student">Student / Intern</option>
              <option value="entry">Entry level (0-2 yrs)</option>
              <option value="mid">Mid level (2-5 yrs)</option>
              <option value="senior">Senior (5-10 yrs)</option>
              <option value="lead">Lead / Manager (10+ yrs)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor="aboutYou">
            Tell us anything about yourself{" "}
            <span className="font-normal text-slate-400">(optional — any language)</span>
          </label>
          <textarea id="aboutYou" className="input-field min-h-[90px]" value={form.aboutYou}
            onChange={(e) => update("aboutYou", e.target.value)}
            placeholder="Write freely — your background, what you've done, what you want. AI will turn it into a polished resume. Or leave blank." />
        </div>

        <div>
          <label className="label-field" htmlFor="skills">
            Skills <span className="font-normal text-slate-400">(optional — AI will suggest if empty)</span>
          </label>
          <input id="skills" className="input-field" value={form.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder="Figma, UX Research, Design Systems, Prototyping" />
        </div>

        <div>
          <label className="label-field" htmlFor="summary">Professional summary (optional)</label>
          <textarea id="summary" className="input-field min-h-[80px]" value={form.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="Leave blank to let AI write one for you." />
        </div>

        <div>
          <label className="label-field" htmlFor="experience">Experience notes (optional, one per line)</label>
          <textarea id="experience" className="input-field min-h-[120px]" value={form.experience}
            onChange={(e) => update("experience", e.target.value)}
            placeholder={"Leave blank and AI will write realistic bullet points, or add notes like:\nDesigned onboarding flow that cut drop-off by 30%\nLed a team of 4 designers"} />
        </div>

        <div>
          <label className="label-field" htmlFor="education">Education</label>
          <textarea id="education" className="input-field min-h-[70px]" value={form.education}
            onChange={(e) => update("education", e.target.value)}
            placeholder="B.Sc. in Computer Science, University of Dhaka (2019)" />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <button type="submit" className="btn-primary w-full py-3.5 text-base" disabled={loading}>
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Generating…
            </>
          ) : user ? (
            "✨ Build my resume with AI"
          ) : (
            "Sign in to generate"
          )}
        </button>
        {!user && (
          <p className="text-center text-xs text-slate-500">
            You&apos;ll need a free account to generate and download your resume.
          </p>
        )}
      </form>

      {/* Preview */}
      <div>
        {result ? (
          <ResumePreview
            form={form}
            result={result}
            template={template}
            onTemplateChange={setTemplate}
          />
        ) : (
          <div className="card flex h-full min-h-[400px] flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </span>
            <p className="mt-4 font-semibold text-slate-700">Your resume preview</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Fill in the form and click “Generate resume with AI” to see your
              polished resume here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResumePreview({
  form,
  result,
  template,
  onTemplateChange,
}: {
  form: ResumeInput;
  result: GeneratedResume;
  template: TemplateId;
  onTemplateChange: (id: TemplateId) => void;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (!pageRef.current) return;
    setDownloading(true);
    try {
      const name = (form.fullName || "resume").trim().replace(/\s+/g, "-");
      await downloadElementAsPdf(pageRef.current, `${name}-resume.pdf`);
    } catch {
      // If capture fails for any reason, fall back to the browser print dialog.
      window.print();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      {/* Template selector */}
      <div className="no-print mb-4">
        <p className="mb-2 text-sm font-medium text-slate-500">
          Choose a premium template
        </p>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTemplateChange(t.id)}
              className={`relative rounded-xl border p-3 text-left transition-all ${
                template === t.id
                  ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                  : "border-slate-200 bg-white hover:border-brand-300"
              }`}
            >
              {t.badge && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-accent-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                  {t.badge}
                </span>
              )}
              <TemplateThumb id={t.id} />
              <p className="mt-2 text-xs font-semibold text-slate-800">{t.name}</p>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {templates.find((t) => t.id === template)?.description}
        </p>
      </div>

      <div className="no-print mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Live preview</p>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-primary py-2 text-xs"
        >
          {downloading ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
              </svg>
              Preparing…
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
              </svg>
              Download PDF
            </>
          )}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
        <div ref={pageRef}>
          <RenderTemplate id={template} form={form} result={result} />
        </div>
      </div>
    </div>
  );
}

/** Tiny visual thumbnail representing each template's layout. */
function TemplateThumb({ id }: { id: TemplateId }) {
  if (id === "forest-sidebar") {
    return (
      <div className="flex h-12 overflow-hidden rounded-md border border-slate-200">
        <div className="w-1/3 bg-brand-800" />
        <div className="flex-1 space-y-1 bg-white p-1.5">
          <div className="h-1 w-3/4 rounded bg-accent-400" />
          <div className="h-0.5 w-full rounded bg-slate-200" />
          <div className="h-0.5 w-5/6 rounded bg-slate-200" />
        </div>
      </div>
    );
  }
  if (id === "minimal-pro") {
    return (
      <div className="h-12 space-y-1 overflow-hidden rounded-md border border-slate-200 bg-white p-1.5">
        <div className="mx-auto h-1 w-1/2 rounded bg-slate-700" />
        <div className="mx-auto h-0.5 w-6 rounded bg-accent-500" />
        <div className="mt-1 h-0.5 w-full rounded bg-slate-200" />
        <div className="h-0.5 w-4/5 rounded bg-slate-200" />
      </div>
    );
  }
  if (id === "executive") {
    return (
      <div className="h-12 space-y-1 overflow-hidden rounded-md border border-slate-200 bg-white p-1.5">
        <div className="flex items-end justify-between border-b-2 border-double border-brand-700 pb-1">
          <div className="h-1.5 w-1/2 rounded bg-brand-900" />
          <div className="h-0.5 w-1/4 rounded bg-accent-500" />
        </div>
        <div className="h-0.5 w-full rounded bg-slate-200" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-0.5 rounded bg-slate-200" />
          <div className="h-0.5 rounded bg-slate-200" />
        </div>
      </div>
    );
  }
  // emerald-classic
  return (
    <div className="h-12 overflow-hidden rounded-md border border-slate-200 bg-white">
      <div className="h-4 bg-brand-800" />
      <div className="space-y-1 p-1.5">
        <div className="h-0.5 w-1/3 rounded bg-accent-500" />
        <div className="h-0.5 w-full rounded bg-slate-200" />
        <div className="h-0.5 w-5/6 rounded bg-slate-200" />
      </div>
    </div>
  );
}
