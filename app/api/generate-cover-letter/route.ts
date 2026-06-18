import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/generator";
import { callLLM } from "@/lib/llm";
import { parseJsonLoose } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/auth/current";
import type { CoverLetterInput, GeneratedCoverLetter } from "@/lib/types";

export const runtime = "nodejs";

function validate(body: Partial<CoverLetterInput>): string | null {
  if (!body.fullName || !body.fullName.trim()) return "Please enter your name.";
  if (!body.jobTitle || !body.jobTitle.trim())
    return "Please enter the role you're applying for.";
  if (!body.company || !body.company.trim())
    return "Please enter the company name.";
  return null;
}

function buildPrompt(input: CoverLetterInput): string {
  return `Write the BEST possible professional cover letter for this applicant.

The user may have given little or messy information. Produce a complete, compelling,
specific cover letter anyway. Where details are missing, infer strong, realistic
content appropriate for the role. Keep it concise (3 short paragraphs). Natural,
confident, professional English. No placeholders.

INPUT:
- Applicant: ${input.fullName}
- Role: ${input.jobTitle}
- Company: ${input.company}
- Hiring manager: ${input.hiringManager || "unknown — use a polite generic greeting"}
- Skills (may be empty): ${input.skills || "(infer relevant skills for the role)"}
- Achievements (may be empty): ${input.achievements || "(infer realistic, relevant achievements)"}
- Tone: ${input.tone || "professional"}
- Job description (may be empty): ${input.jobDescription || "(none)"}

Return STRICT JSON with exactly this shape:
{
  "greeting": "e.g. Dear Hiring Manager,",
  "opening": "strong opening paragraph",
  "body": ["1-2 body paragraphs as array items"],
  "closing": "closing paragraph",
  "signoff": "Sincerely,\\n<applicant name>"
}

Output JSON only.`;
}

export async function POST(req: NextRequest) {
  if (!(await getCurrentUser())) {
    return NextResponse.json(
      { error: "Please sign in to generate a cover letter." },
      { status: 401 }
    );
  }

  let body: Partial<CoverLetterInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const input = body as CoverLetterInput;

  const raw = await callLLM(buildPrompt(input));
  const parsed = parseJsonLoose<GeneratedCoverLetter>(raw);
  if (parsed && parsed.opening && Array.isArray(parsed.body)) {
    return NextResponse.json({ result: parsed, source: "ai" });
  }

  const result = generateCoverLetter(input);
  return NextResponse.json({ result, source: "builtin" });
}
