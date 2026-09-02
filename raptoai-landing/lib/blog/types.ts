export type TopicClusterType = "pillar" | "cluster" | "supporting";
export type PostStatus = "published" | "draft" | "scheduled";

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  verified: boolean;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  iconName: string;
  color: string;
  pillarSlug?: string;
}

export interface Tag {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface DirectAnswer {
  headline: string;
  summary: string;
  keyPoints: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  metaDescription: string;
  coverImage: string;
  coverImageAlt: string;
  coverImageGradient?: string;
  author: Author;
  category: Category;
  tags: string[];
  publishedAt: string; // ISO string
  updatedAt: string; // ISO string
  status: PostStatus;
  readingTime: string;
  wordCount: number;
  topicCluster: TopicClusterType;
  featured?: boolean;
  directAnswer: DirectAnswer;
  tableOfContents: TOCItem[];
  relatedSlugs: string[];
  faq: FAQItem[];
  content: string; // Rich semantic HTML / Markdown structure
  canonicalUrl?: string;
}

export interface BlogFilterOptions {
  category?: string;
  tag?: string;
  search?: string;
  author?: string;
}
