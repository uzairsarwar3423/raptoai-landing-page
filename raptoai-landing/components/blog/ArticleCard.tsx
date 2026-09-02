import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { BlogPost } from "@/lib/blog/types";

export interface ArticleCardProps {
  post: BlogPost;
  className?: string;
}

export function ArticleCard({ post, className = "" }: ArticleCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={`group flex flex-col rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 overflow-hidden shadow-tier-1 hover:shadow-tier-2 hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-[var(--color-canvas-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
      >
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-white/90 text-[var(--color-brand-900)] backdrop-blur-md shadow-sm">
            {post.category.title}
          </span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-ink-500)] mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-ink-300)]" />
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[var(--color-ink-300)]" />
            <span>{post.readingTime}</span>
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-600)] transition-colors leading-snug mb-2.5">
          <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-[var(--color-ink-700)] leading-relaxed font-sans line-clamp-3 mb-6 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-ink-900)]/5 mt-auto">
          <Link
            href={`/blog/authors/${post.author.id}`}
            className="flex items-center gap-2.5 group/author focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--color-brand-500)]/20">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>
            <span className="text-xs font-medium text-[var(--color-ink-900)] group-hover/author:text-[var(--color-brand-600)] transition-colors">
              {post.author.name}
            </span>
          </Link>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-600)] group-hover:text-[var(--color-brand-700)] transition-colors"
            aria-label={`Read ${post.title}`}
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
