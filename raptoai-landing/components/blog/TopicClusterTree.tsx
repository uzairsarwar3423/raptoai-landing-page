import * as React from "react";
import Link from "next/link";
import { Network, ArrowRight, Layers, Cpu, ShieldCheck, CheckCircle2, GitMerge } from "lucide-react";
import { Category, BlogPost } from "@/lib/blog/types";

export interface TopicClusterTreeProps {
  categories: Category[];
  posts: BlogPost[];
  className?: string;
}

export function TopicClusterTree({
  categories,
  posts,
  className = "",
}: TopicClusterTreeProps) {
  return (
    <section
      aria-label="Topic Cluster Architecture"
      className={`p-8 sm:p-10 rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 my-12 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center">
          <Network className="w-4 h-4" />
        </span>
        <div>
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--color-brand-700)]">
            Information Architecture
          </span>
          <h3 className="font-display text-2xl font-bold text-[var(--color-ink-900)] leading-snug">
            Topic Clusters &amp; Technical Domains
          </h3>
        </div>
      </div>

      <p className="text-sm text-[var(--color-ink-700)] max-w-2xl mb-8 font-sans leading-relaxed">
        Our content is organized into strategic topical hubs. Explore fundamental pillar guides, deep-dive cluster articles, and workflow integrations below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const clusterPosts = posts.filter((p) => p.category.slug === cat.slug);
          const pillarPost = clusterPosts.find((p) => p.topicCluster === "pillar") || clusterPosts[0];

          return (
            <div
              key={cat.id}
              className="flex flex-col justify-between p-6 rounded-[var(--radius-lg)] bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 hover:border-[var(--color-brand-500)]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] px-2 py-0.5 rounded bg-[var(--color-brand-50)] border border-[var(--color-brand-100)]">
                    {cat.eyebrow}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-ink-500)]">
                    {clusterPosts.length} {clusterPosts.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-[var(--color-ink-900)] mb-2">
                  <Link
                    href={`/blog/category/${cat.slug}`}
                    className="hover:text-[var(--color-brand-600)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
                  >
                    {cat.title}
                  </Link>
                </h4>

                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed font-sans mb-4">
                  {cat.description}
                </p>

                {pillarPost && (
                  <div className="pt-3 border-t border-[var(--color-ink-900)]/5 mb-4">
                    <span className="text-[11px] font-mono text-[var(--color-ink-500)] uppercase tracking-wider block mb-1">
                      Pillar Article:
                    </span>
                    <Link
                      href={`/blog/${pillarPost.slug}`}
                      className="text-xs font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors line-clamp-2"
                    >
                      {pillarPost.title}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href={`/blog/category/${cat.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] transition-colors mt-auto pt-2"
              >
                <span>Browse cluster articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
