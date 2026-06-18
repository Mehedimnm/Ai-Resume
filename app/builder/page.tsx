import type { Metadata } from "next";
import ResumeBuilder from "@/components/ResumeBuilder";

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description:
    "Build a professional, ATS-friendly resume in minutes with MNM AI Resume's free AI resume builder.",
};

export default function BuilderPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-page py-10 lg:py-14">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            AI Resume Builder
          </h1>
          <p className="mt-3 text-slate-600">
            Fill in your details, let the AI write strong bullet points, and export
            a polished resume. Rough notes work fine — we handle the polish.
          </p>
        </div>
        <ResumeBuilder />
      </div>
    </div>
  );
}
