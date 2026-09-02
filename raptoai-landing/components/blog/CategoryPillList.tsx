import * as React from "react";
import Link from "next/link";
import { Category } from "@/lib/blog/types";
import { getAllCategories } from "@/lib/blog/categories";
import { getAllPosts } from "@/lib/blog/posts";

export interface CategoryPillListProps {
  activeCategorySlug?: string;
  className?: string;
}

export function CategoryPillList({
  activeCategorySlug,
  className = "",
}: CategoryPillListProps) {
  const categories = getAllCategories();
  const allPosts = getAllPosts();

  const getPostCount = (slug: string) => {
    return allPosts.filter((p) => p.category.slug === slug).length;
  };

  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}>
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] ${
          !activeCategorySlug || activeCategorySlug === "all"
            ? "bg-[var(--color-ink-900)] text-white shadow-sm"
            : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] border border-[var(--color-ink-900)]/10 hover:border-[var(--color-ink-900)]/30 hover:text-[var(--color-ink-900)]"
        }`}
      >
        <span>All Topics</span>
        <span className="opacity-60 text-[10px]">({allPosts.length})</span>
      </Link>

      {categories.map((category) => {
        const isActive = activeCategorySlug === category.slug;
        const count = getPostCount(category.slug);

        return (
          <Link
            key={category.id}
            href={`/blog/category/${category.slug}`}
            className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] ${
              isActive
                ? "bg-[var(--color-brand-500)] text-white shadow-sm"
                : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] border border-[var(--color-ink-900)]/10 hover:border-[var(--color-ink-900)]/30 hover:text-[var(--color-ink-900)]"
            }`}
          >
            <span>{category.title}</span>
            <span className={`text-[10px] ${isActive ? "text-white/80" : "text-[var(--color-ink-500)]"}`}>
              ({count})
            </span>
          </Link>
        );
      })}
    </div>
  );
}
