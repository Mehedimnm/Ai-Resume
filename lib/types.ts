export interface ResumeInput {
  fullName: string;
  jobTitle: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  summary?: string;
  skills: string;
  experience?: string;
  education?: string;
  targetRole?: string;
  aboutYou?: string;
  experienceLevel?: "student" | "entry" | "mid" | "senior" | "lead";
}

export interface GeneratedResume {
  summary: string;
  highlights: string[];
  skills: string[];
  experienceBullets: string[];
  closing: string;
}

export type TemplateId =
  | "emerald-classic"
  | "forest-sidebar"
  | "minimal-pro"
  | "executive";

export interface TemplateProps {
  form: ResumeInput;
  result: GeneratedResume;
}

export interface CoverLetterInput {
  fullName: string;
  jobTitle: string;
  company: string;
  hiringManager?: string;
  jobDescription?: string;
  skills: string;
  achievements?: string;
  tone?: "professional" | "enthusiastic" | "confident";
}

export interface GeneratedCoverLetter {
  greeting: string;
  opening: string;
  body: string[];
  closing: string;
  signoff: string;
}
