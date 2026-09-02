import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { BlogPost } from "@/lib/blog/types";
import { Button } from "@/components/ui/Button";

export interface FeaturedArticleCardProps {
  post: BlogPost;
  className?: string;
}

export function FeaturedArticleCard({ post, className = "" }: FeaturedArticleCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`relative rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border-2 border-[var(--color-brand-500)]/30 overflow-hidden shadow-tier-3 group transition-all duration-300 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left / Top: Hero Visual */}
        <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-[var(--color-canvas-dark)]">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60" />

          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[var(--color-brand-500)] text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              FEATURED PILLAR
            </span>
          </div>
        </div>

        {/* Right / Bottom: Content */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-ink-500)] mb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] font-semibold">
                {post.category.title}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={post.publishedAt}>{formattedDate}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime}</span>
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-3xl font-bold text-[var(--color-ink-900)] leading-tight mb-4 group-hover:text-[var(--color-brand-600)] transition-colors">
              <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded">
                {post.title}
              </Link>
            </h2>

            <p className="text-base text-[var(--color-ink-700)] leading-relaxed font-sans mb-6">
              {post.excerpt}
            </p>

            {post.directAnswer && (
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] mb-6">
                <p className="text-xs font-mono font-semibold text-[var(--color-brand-700)] uppercase tracking-wider mb-1">
                  Key Takeaway:
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-ink-900)] font-sans leading-relaxed">
                  {post.directAnswer.summary}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[var(--color-ink-900)]/10 mt-4">
            <Link
              href={`/blog/authors/${post.author.id}`}
              className="flex items-center gap-3 group/author focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--color-brand-500)]/30">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-ink-900)] group-hover/author:text-[var(--color-brand-600)] transition-colors">
                  {post.author.name}
                </p>
                <p className="text-xs font-mono text-[var(--color-ink-500)]">
                  {post.author.role}
                </p>
              </div>
            </Link>

            <Button
              asChild
              size="sm"
              className="bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] shadow-sm"
            >
              <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
