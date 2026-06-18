import type { TemplateId, TemplateProps } from "@/lib/types";
import EmeraldClassic from "./EmeraldClassic";
import ForestSidebar from "./ForestSidebar";
import MinimalPro from "./MinimalPro";
import Executive from "./Executive";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  badge?: string;
}

export const templates: TemplateMeta[] = [
  {
    id: "emerald-classic",
    name: "Emerald Classic",
    description: "Bold green header with orange accents. ATS-friendly single column.",
    badge: "Popular",
  },
  {
    id: "forest-sidebar",
    name: "Forest Sidebar",
    description: "Two-column layout with a deep green sidebar for skills & contact.",
    badge: "Premium",
  },
  {
    id: "minimal-pro",
    name: "Minimal Pro",
    description: "Clean, centered, elegant typography. Lots of whitespace.",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Refined serif headings for senior and leadership roles.",
    badge: "Premium",
  },
];

const components: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  "emerald-classic": EmeraldClassic,
  "forest-sidebar": ForestSidebar,
  "minimal-pro": MinimalPro,
  executive: Executive,
};

export function RenderTemplate({
  id,
  ...props
}: { id: TemplateId } & TemplateProps) {
  const Component = components[id] ?? EmeraldClassic;
  return <Component {...props} />;
}
