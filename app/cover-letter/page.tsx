import type { Metadata } from "next";
import CoverLetterBuilder from "@/components/CoverLetterBuilder";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator",
  description:
    "Generate a tailored, professional cover letter for any job in seconds with MNM AI Resume.",
};

export default function CoverLetterPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-page py-10 lg:py-14">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            AI Cover Letter Generator
          </h1>
          <p className="mt-3 text-slate-600">
            Tell us about the role and your strengths. The AI writes a tailored,
            professional cover letter you can edit and export.
          </p>
        </div>
        <CoverLetterBuilder />
      </div>
    </div>
  );
}
