import { Tag } from "./types";

export type TagId =
  | "ai-action-items"
  | "cross-meeting-memory"
  | "linear-integration"
  | "botless-recording"
  | "accountability-score"
  | "soc2-compliance"
  | "engineering-standups";

export const tags: Record<TagId, Tag> = {
  "ai-action-items": {
    id: "ai-action-items",
    slug: "ai-action-items",
    title: "AI Action Items",
    description: "Automated extraction and verification of spoken commitments in technical and product meetings.",
  },
  "cross-meeting-memory": {
    id: "cross-meeting-memory",
    slug: "cross-meeting-memory",
    title: "Cross-Meeting Memory",
    description: "Multi-session context graph algorithms connecting past promises to subsequent meetings.",
  },
  "linear-integration": {
    id: "linear-integration",
    slug: "linear-integration",
    title: "Linear & Jira Sync",
    description: "Bi-directional synchronization between spoken meeting tasks and issue tracking backlogs.",
  },
  "botless-recording": {
    id: "botless-recording",
    slug: "botless-recording",
    title: "Botless Recording",
    description: "Native audio capture and calendar sync without embarrassing third-party bots in your video calls.",
  },
  "accountability-score": {
    id: "accountability-score",
    slug: "accountability-score",
    title: "Accountability Score",
    description: "Quantifying team follow-through, task completion rates, and organizational execution velocity.",
  },
  "soc2-compliance": {
    id: "soc2-compliance",
    slug: "soc2-compliance",
    title: "SOC-2 Compliance",
    description: "Enterprise data privacy, zero-data-retention AI inference, and cryptographic transit security.",
  },
  "engineering-standups": {
    id: "engineering-standups",
    slug: "engineering-standups",
    title: "Engineering Standups",
    description: "Optimizing synchronous developer rituals for maximum clarity, speed, and accountability.",
  },
};

export const getTagBySlug = (slug: string): Tag | undefined => {
  if (slug in tags) {
    return tags[slug as TagId];
  }
  return undefined;
};

export const getAllTags = (): Tag[] => Object.values(tags);
