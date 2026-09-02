import * as React from "react";
import { BlogPost } from "@/lib/blog/types";
import { ArticleCard } from "./ArticleCard";
import { Compass } from "lucide-react";

export interface RelatedArticlesProps {
  posts: BlogPost[];
  className?: string;
}

export function RelatedArticles({ posts, className = "" }: RelatedArticlesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section
      aria-label="Related Articles"
      className={`my-16 pt-12 border-t border-[var(--color-ink-900)]/10 ${className}`}
    >
      <div className="flex items-center gap-2 mb-8">
        <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center">
          <Compass className="w-4 h-4" />
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)] tracking-[-0.01em]">
          Related Deep-Dives &amp; Guides
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
