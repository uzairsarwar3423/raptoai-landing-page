import { Category } from "./types";

export type CategoryId =
  | "meeting-accountability"
  | "engineering-execution"
  | "ai-architecture"
  | "productivity-scoring"
  | "security-governance";

export const categories: Record<CategoryId, Category> = {
  "meeting-accountability": {
    id: "meeting-accountability",
    slug: "meeting-accountability",
    title: "Meeting Accountability",
    eyebrow: "Pillar Topic",
    description: "Architectural strategies, psychological frameworks, and tools to turn verbal commitments into fulfilled business outcomes.",
    iconName: "CheckCircle2",
    color: "var(--color-brand-500)",
    pillarSlug: "ai-meeting-accountability-guide",
  },
  "engineering-execution": {
    id: "engineering-execution",
    slug: "engineering-execution",
    title: "Engineering & Execution",
    eyebrow: "Engineering Ops",
    description: "How high-performing technical squads streamline standups, sprint retros, Linear/Jira sync, and async handoffs.",
    iconName: "GitMerge",
    color: "#2563eb",
    pillarSlug: "engineering-standups-commitment-tracking",
  },
  "ai-architecture": {
    id: "ai-architecture",
    slug: "ai-architecture",
    title: "AI & Systems Architecture",
    eyebrow: "Technical Deep-Dives",
    description: "Deep technical breakdowns of cross-meeting memory graph resolution, deterministic LLM extraction, and botless recording pipelines.",
    iconName: "Cpu",
    color: "#7c3aed",
    pillarSlug: "cross-meeting-memory-architecture",
  },
  "productivity-scoring": {
    id: "productivity-scoring",
    slug: "productivity-scoring",
    title: "Productivity & Scoring",
    eyebrow: "Metrics & Culture",
    description: "Designing fair, recency-weighted commitment metrics that reward follow-through without encouraging toxic surveillance.",
    iconName: "BarChart3",
    color: "var(--color-ember-500)",
    pillarSlug: "team-commitment-scoring-metrics-vs-surveillance",
  },
  "security-governance": {
    id: "security-governance",
    slug: "security-governance",
    title: "Security & Governance",
    eyebrow: "Enterprise Trust",
    description: "Zero-data-retention AI compliance, SOC-2 Type II controls, GDPR adherence, and meeting data privacy standards.",
    iconName: "ShieldCheck",
    color: "#059669",
    pillarSlug: "soc2-meeting-privacy-governance-enterprise-guide",
  },
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  if (slug in categories) {
    return categories[slug as CategoryId];
  }
  return undefined;
};

export const getAllCategories = (): Category[] => Object.values(categories);
