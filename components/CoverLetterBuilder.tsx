"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CoverLetterInput, GeneratedCoverLetter } from "@/lib/types";
import { useAuth } from "@/components/AuthProvider";
import { downloadElementAsPdf } from "@/lib/pdf";

const initialState: CoverLetterInput = {
  fullName: "",
  jobTitle: "",
  company: "",
  hiringManager: "",
  jobDescription: "",
  skills: "",
  achievements: "",
  tone: "professional",
};

export default function CoverLetterBuilder() {
  const [form, setForm] = useState<CoverLetterInput>(initialState);
  const [result, setResult] = useState<GeneratedCoverLetter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  function update<K extends keyof CoverLetterInput>(
    key: K,
    value: CoverLetterInput[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      router.push(`/signin?next=${encodeURIComponent("/cover-letter")}`);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setResult(data.result as GeneratedCoverLetter);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleGenerate} className="card space-y-5 no-print">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label-field" htmlFor="fullName">Your name *</label>
            <input id="fullName" className="input-field" value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Ayesha Rahman" required />
          </div>
          <div>
            <label className="label-field" htmlFor="jobTitle">Role applying for *</label>
            <input id="jobTitle" className="input-field" value={form.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              placeholder="Product Designer" required />
          </div>
          <div>
            <label className="label-field" htmlFor="company">Company *</label>
            <input id="company" className="input-field" value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Acme Inc." required />
          </div>
          <div>
            <label className="label-field" htmlFor="hiringManager">Hiring manager</label>
            <input id="hiringManager" className="input-field" value={form.hiringManager}
              onChange={(e) => update("hiringManager", e.target.value)}
              placeholder="Optional" />
          </div>
        </div>

        <div>
          <label className="label-field" htmlFor="skills">Key skills * (comma separated)</label>
          <input id="skills" className="input-field" value={form.skills}
            onChange={(e) => update("skills", e.target.value)}
            placeholder="UX Research, Figma, Stakeholder management" required />
        </div>

        <div>
          <label className="label-field" htmlFor="achievements">Achievements (one per line)</label>
          <textarea id="achievements" className="input-field min-h-[90px]" value={form.achievements}
            onChange={(e) => update("achievements", e.target.value)}
            placeholder={"Increased signups by 40%\nLed redesign of core product"} />
        </div>

        <div>
          <label className="label-field" htmlFor="jobDescription">Paste the job description (optional)</label>
          <textarea id="jobDescription" className="input-field min-h-[110px]" value={form.jobDescription}
            onChange={(e) => update("jobDescription", e.target.value)}
            placeholder="Paste it here and we'll tailor the letter to match." />
        </div>

        <div>
          <label className="label-field" htmlFor="tone">Tone</label>
          <select id="tone" className="input-field" value={form.tone}
            onChange={(e) => update("tone", e.target.value as CoverLetterInput["tone"])}>
            <option value="professional">Professional</option>
            <option value="enthusiastic">Enthusiastic</option>
            <option value="confident">Confident</option>
          </select>
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
            "Generate cover letter with AI"
          ) : (
            "Sign in to generate"
          )}
        </button>
        {!user && (
          <p className="text-center text-xs text-slate-500">
            You&apos;ll need a free account to generate your cover letter.
          </p>
        )}
      </form>

      <div>
        {result ? (
          <CoverLetterPreview result={result} />
        ) : (
          <div className="card flex h-full min-h-[400px] flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <p className="mt-4 font-semibold text-slate-700">Your cover letter preview</p>
            <p className="mt-1 max-w-xs text-sm text-slate-500">
              Fill in the form and generate a tailored cover letter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CoverLetterPreview({ result }: { result: GeneratedCoverLetter }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    if (!pageRef.current) return;
    setDownloading(true);
    try {
      await downloadElementAsPdf(pageRef.current, "cover-letter.pdf");
    } catch {
      window.print();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between no-print">
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
        <article
          ref={pageRef}
          className="resume-page space-y-4 bg-white px-12 py-12 text-sm leading-relaxed text-slate-700"
        >
          <p className="font-medium text-slate-900">{result.greeting}</p>
          <p>{result.opening}</p>
          {result.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p>{result.closing}</p>
          <p className="whitespace-pre-line pt-2 font-medium text-slate-900">
            {result.signoff}
          </p>
        </article>
      </div>
    </div>
  );
}
