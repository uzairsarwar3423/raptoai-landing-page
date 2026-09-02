import { Author } from "./types";

export type AuthorId = "sarah-chen" | "alex-vance" | "marcus-reyes";

export const authors: Record<AuthorId, Author> = {
  "sarah-chen": {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Head of AI & Systems Architecture",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Sarah leads AI systems architecture at Rapto, specializing in large language model reasoning, real-time audio pipeline synthesis, and deterministic state extraction from multi-party conversations. Former Senior Staff Research Engineer at DeepMind and MIT EECS alum.",
    credentials: "Ex-DeepMind Research, MIT EECS, 12+ Distributed AI Patents",
    twitter: "https://twitter.com/sarahchen_ai",
    linkedin: "https://linkedin.com/in/sarahchen-systems",
    github: "https://github.com/sarahchen",
    verified: true,
  },
  "alex-vance": {
    id: "alex-vance",
    name: "Alex Vance",
    role: "VP of Product & Engineering Operations",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Alex oversees product velocity and engineering accountability systems at Rapto. He has spent over a decade scaling engineering organizations at Stripe and Linear, focusing on cross-functional alignment and eliminating async coordination friction.",
    credentials: "Ex-Linear, Ex-Stripe Engineering Operations, Author of 'The High-Output Standup'",
    twitter: "https://twitter.com/alexvance_ops",
    linkedin: "https://linkedin.com/in/alexvance-product",
    github: "https://github.com/avance",
    verified: true,
  },
  "marcus-reyes": {
    id: "marcus-reyes",
    name: "Marcus Reyes",
    role: "Lead Security Architect & Compliance Fellow",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Marcus is responsible for zero-data-retention security protocols, enterprise data sovereignty, and SOC-2 Type II cryptographic guarantees at Rapto. He previously audited enterprise infrastructure for Fortune 500 defense and financial firms.",
    credentials: "CISSP, CISA, Former Enterprise Security Principal at Cloudflare",
    twitter: "https://twitter.com/marcusreyes_sec",
    linkedin: "https://linkedin.com/in/marcusreyes-infosec",
    github: "https://github.com/mreyes-sec",
    verified: true,
  },
};

export const getAuthorById = (id: string): Author | undefined => {
  if (id in authors) {
    return authors[id as AuthorId];
  }
  return undefined;
};

export const getAllAuthors = (): Author[] => Object.values(authors);
