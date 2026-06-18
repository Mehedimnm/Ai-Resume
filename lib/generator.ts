import type {
  ResumeInput,
  GeneratedResume,
  CoverLetterInput,
  GeneratedCoverLetter,
} from "./types";

/**
 * Smart, deterministic content generator.
 *
 * This produces high-quality, ATS-friendly resume and cover letter content
 * WITHOUT requiring any external API key, so the product is fully functional
 * out of the box. When an LLM provider is configured (see lib/llm.ts), the API
 * routes will prefer the LLM and fall back to this generator on failure.
 */

const ACTION_VERBS = [
  "Led",
  "Built",
  "Designed",
  "Delivered",
  "Improved",
  "Streamlined",
  "Launched",
  "Optimized",
  "Drove",
  "Spearheaded",
];

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/[\n,;•]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function clean(value: string | undefined, fallback = ""): string {
  return (value || fallback).trim();
}

export function generateResume(input: ResumeInput): GeneratedResume {
  const role = clean(input.targetRole || input.jobTitle, "professional");
  const skills = splitList(input.skills);
  const topSkills = skills.slice(0, 6);
  const experienceLines = splitList(input.experience);

  const summary =
    clean(input.summary) ||
    `Results-driven ${role} with a track record of delivering measurable impact. ` +
      `Skilled in ${topSkills.slice(0, 3).join(", ") || "core technical and collaborative competencies"}, ` +
      `with a focus on quality, ownership, and continuous improvement. ` +
      `Adept at translating goals into outcomes and collaborating across teams to ship reliable solutions.`;

  const highlights: string[] = [];
  if (topSkills.length) {
    highlights.push(
      `Proficient across ${topSkills.length} key areas including ${topSkills
        .slice(0, 3)
        .join(", ")}.`
    );
  }
  highlights.push(
    `Strong communicator who partners with stakeholders to align on priorities and outcomes.`
  );
  highlights.push(
    `Detail-oriented problem solver focused on measurable results and clean execution.`
  );

  const experienceBullets =
    experienceLines.length > 0
      ? experienceLines.map((line, i) => {
          const verb = ACTION_VERBS[i % ACTION_VERBS.length];
          // Avoid duplicating a verb if the user already started with one.
          const startsWithVerb = /^[A-Z][a-z]+ed\b|^Led\b|^Built\b/.test(line);
          return startsWithVerb ? line : `${verb} ${line.charAt(0).toLowerCase()}${line.slice(1)}`;
        })
      : [
          `${ACTION_VERBS[0]} initiatives that improved efficiency and quality for the team.`,
          `${ACTION_VERBS[1]} reusable processes and documentation that accelerated delivery.`,
          `${ACTION_VERBS[4]} key metrics through data-informed decisions and iteration.`,
        ];

  const closing = `${clean(input.fullName, "Candidate")} is seeking a ${role} role where strong execution and collaboration drive real business value.`;

  return {
    summary,
    highlights,
    skills: skills.length ? skills : ["Communication", "Problem Solving", "Teamwork"],
    experienceBullets,
    closing,
  };
}

export function generateCoverLetter(
  input: CoverLetterInput
): GeneratedCoverLetter {
  const tone = input.tone || "professional";
  const skills = splitList(input.skills).slice(0, 4);
  const achievements = splitList(input.achievements);
  const company = clean(input.company, "your company");
  const role = clean(input.jobTitle, "the open role");

  const greeting = input.hiringManager
    ? `Dear ${input.hiringManager.trim()},`
    : `Dear Hiring Manager,`;

  const toneOpeners: Record<string, string> = {
    professional: `I am writing to express my strong interest in the ${role} position at ${company}.`,
    enthusiastic: `I was thrilled to discover the ${role} opening at ${company} — it is exactly the kind of role I have been working toward.`,
    confident: `I am confident that my background makes me an excellent fit for the ${role} position at ${company}.`,
  };

  const opening = `${toneOpeners[tone]} With proven strengths in ${
    skills.join(", ") || "the core areas this role demands"
  }, I am excited about the opportunity to contribute to your team.`;

  const body: string[] = [];

  if (input.jobDescription && input.jobDescription.trim()) {
    body.push(
      `After reviewing the role, I see a clear match between what you need and what I bring. ` +
        `I focus on ${skills.slice(0, 2).join(" and ") || "delivering reliable, high-quality work"}, ` +
        `and I take ownership from problem definition through to measurable results.`
    );
  } else {
    body.push(
      `Throughout my career, I have focused on ${
        skills.slice(0, 2).join(" and ") || "delivering reliable, high-quality work"
      }. I take ownership of problems end-to-end and care deeply about outcomes, not just output.`
    );
  }

  if (achievements.length) {
    body.push(
      `A few highlights from my experience: ${achievements
        .map((a) => a.replace(/\.$/, ""))
        .join("; ")}.`
    );
  } else {
    body.push(
      `In previous roles I have consistently improved processes, supported teammates, and delivered work that stakeholders could rely on.`
    );
  }

  body.push(
    `What draws me to ${company} is the chance to apply these strengths to meaningful problems and to grow alongside a team that values quality and collaboration.`
  );

  const closing = `I would welcome the opportunity to discuss how I can contribute to ${company}. Thank you for considering my application — I look forward to speaking with you.`;

  return {
    greeting,
    opening,
    body,
    closing,
    signoff: `Sincerely,\n${clean(input.fullName, "Your Name")}`,
  };
}
