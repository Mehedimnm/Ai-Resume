import type { ResumeInput, GeneratedResume } from "./types";

export const sampleForm: ResumeInput = {
  fullName: "Ayesha Rahman",
  jobTitle: "Senior Product Designer",
  email: "ayesha@example.com",
  phone: "+880 1700-000000",
  location: "Dhaka, Bangladesh",
  website: "linkedin.com/in/ayesha",
  skills: "Figma, UX Research, Design Systems, Prototyping, Accessibility",
  experience: "",
  education: "B.Sc. in Computer Science\nUniversity of Dhaka (2019)",
  targetRole: "Senior Product Designer",
};

export const sampleResult: GeneratedResume = {
  summary:
    "Results-driven product designer with 6+ years crafting intuitive digital experiences. Skilled in design systems, user research, and cross-functional collaboration, with a track record of shipping products that lift engagement and retention.",
  highlights: [
    "Led design for a flagship app used by 200k+ monthly users.",
    "Built a scalable design system adopted across 5 product teams.",
    "Partners closely with engineering and product to ship reliably.",
  ],
  skills: [
    "Figma",
    "UX Research",
    "Design Systems",
    "Prototyping",
    "Accessibility",
  ],
  experienceBullets: [
    "Designed an onboarding flow that reduced drop-off by 30%.",
    "Led a team of 4 designers across two product lines.",
    "Launched a redesigned checkout that grew conversion by 18%.",
    "Drove accessibility improvements to meet WCAG AA standards.",
  ],
  closing:
    "Seeking a senior product design role where craft and collaboration drive measurable impact.",
};
