import { NextRequest, NextResponse } from "next/server";
import { generateResume } from "@/lib/generator";
import { callLLM } from "@/lib/llm";
import { parseJsonLoose } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/auth/current";
import type { ResumeInput, GeneratedResume } from "@/lib/types";

export const runtime = "nodejs";

function validate(body: Partial<ResumeInput>): string | null {
  // Minimal requirement: a name and a role/target. Everything else is optional —
  // the AI fills in strong, professional content for whatever the user leaves blank.
  if (!body.fullName || !body.fullName.trim()) return "Please enter your name.";
  if (
    (!body.jobTitle || !body.jobTitle.trim()) &&
    (!body.targetRole || !body.targetRole.trim())
  ) {
    return "Please enter the role you want (e.g. 'Software Engineer').";
  }
  return null;
}

function buildPrompt(input: ResumeInput): string {
  const role = input.targetRole || input.jobTitle;
  return `Write the BEST possible professional, ATS-friendly resume for this person.

The user may have given very little, messy, or incomplete information. That is fine —
your job is to produce a complete, polished, recruiter-ready resume anyway. Where
details are missing, generate strong, realistic, role-appropriate content that a
capable candidate for this role would plausibly have. Never leave a section empty.
Never output placeholders like "[Your achievement]". Write in confident, natural,
professional English.

CANDIDATE INPUT (use whatever is provided; infer the rest):
- Name: ${input.fullName}
- Target role: ${role}
- Experience level: ${input.experienceLevel || "infer from the input"}
- Skills (may be empty): ${input.skills || "(none given — infer the most relevant skills for the target role)"}
- Experience notes (may be empty/messy): ${input.experience || "(none given — write 4 strong, realistic bullet points for the target role)"}
- Education (may be empty): ${input.education || "(none given)"}
- Free description from the user (any language, may be empty): ${input.aboutYou || "(none given)"}

Return STRICT JSON with exactly this shape:
{
  "summary": "3-4 sentence professional summary tailored to the target role",
  "highlights": ["3-4 short key strength statements"],
  "skills": ["6-10 relevant skills for the target role"],
  "experienceBullets": ["4-6 achievement-focused bullet points starting with strong action verbs, with realistic metrics"],
  "closing": "one-sentence objective statement"
}

Output JSON only.`;
}

export async function POST(req: NextRequest) {
  if (!(await getCurrentUser())) {
    return NextResponse.json(
      { error: "Please sign in to generate a resume." },
      { status: 401 }
    );
  }

  let body: Partial<ResumeInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const error = validate(body);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const input = body as ResumeInput;

  // Prefer the LLM (Gemini -> OpenAI). Fall back to the deterministic generator.
  const raw = await callLLM(buildPrompt(input));
  const parsed = parseJsonLoose<GeneratedResume>(raw);
  if (parsed && parsed.summary && Array.isArray(parsed.experienceBullets)) {
    // Ensure skills is always a populated array.
    if (!Array.isArray(parsed.skills) || parsed.skills.length === 0) {
      parsed.skills = generateResume(input).skills;
    }
    return NextResponse.json({ result: parsed, source: "ai" });
  }

  const result = generateResume(input);
  return NextResponse.json({ result, source: "builtin" });
}
