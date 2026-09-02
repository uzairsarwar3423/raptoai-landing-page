"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { BlogPost, Category } from "@/lib/blog/types";
import { ArticleGrid } from "./ArticleGrid";

export interface BlogSearchFilterProps {
  initialPosts: BlogPost[];
  categories: Category[];
  initialCategory?: string;
}

export function BlogSearchFilter({
  initialPosts,
  categories,
  initialCategory = "all",
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory);

  const filteredPosts = React.useMemo(() => {
    return initialPosts.filter((post) => {
      if (selectedCategory !== "all" && post.category.slug !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-500)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, architecture topics, Linear sync, SOC-2..."
            className="w-full pl-10 pr-10 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)] transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] p-1 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills inside filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-[var(--color-ink-900)] text-white shadow-sm"
                : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
            }`}
          >
            All ({initialPosts.length})
          </button>
          {categories.map((cat) => {
            const count = initialPosts.filter((p) => p.category.slug === cat.slug).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-[var(--color-brand-500)] text-white shadow-sm"
                    : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
                }`}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header if searching/filtering */}
      {(searchQuery || selectedCategory !== "all") && (
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-500)] px-1">
          <span>
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            {selectedCategory !== "all" && ` in ${categories.find(c => c.slug === selectedCategory)?.title}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-[var(--color-brand-600)] hover:underline font-semibold"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Article Grid */}
      <ArticleGrid
        posts={filteredPosts}
        emptyMessage={
          searchQuery
            ? `No articles found matching "${searchQuery}". Try searching for terms like "Linear", "Memory", "Scoring", or "SOC-2".`
            : "No articles found in this category yet."
        }
      />
    </div>
  );
}
