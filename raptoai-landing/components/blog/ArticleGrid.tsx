import * as React from "react";
import { BlogPost } from "@/lib/blog/types";
import { ArticleCard } from "./ArticleCard";
import { Search } from "lucide-react";

export interface ArticleGridProps {
  posts: BlogPost[];
  className?: string;
  emptyMessage?: string;
}

export function ArticleGrid({
  posts,
  className = "",
  emptyMessage = "No articles found matching your criteria.",
}: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <div className="py-16 px-6 text-center rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 my-8">
        <div className="w-12 h-12 rounded-full bg-[var(--color-paper-sunken)] flex items-center justify-center mx-auto mb-4 text-[var(--color-ink-500)]">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="font-display text-xl font-bold text-[var(--color-ink-900)] mb-2">
          No articles found
        </h3>
        <p className="text-sm text-[var(--color-ink-700)] max-w-md mx-auto">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
    >
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  );
}
