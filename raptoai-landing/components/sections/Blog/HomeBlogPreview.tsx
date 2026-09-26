"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, User } from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

interface FeaturedArticle {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  readingTime: string;
  tag: string;
}

const FEATURED_ARTICLES: FeaturedArticle[] = [
  {
    title: "Rapto AI System Design: Inside Our Distributed Backend Architecture",
    slug: "rapto-ai-backend-architecture-system-design",
    excerpt:
      "A code-level teardown of Rapto's Node.js API gateway, Python FastAPI LLM pipeline, BullMQ workers, and polyglot persistence engine.",
    author: "Sarah Chen",
    readingTime: "14 min read",
    tag: "Systems Design",
  },
  {
    title: "The Definitive Guide to AI Meeting Accountability",
    slug: "ai-meeting-accountability-guide",
    excerpt:
      "Why 70% of spoken meeting promises drift into backlog oblivion, and how engineering teams build automated follow-through systems.",
    author: "Sarah Chen",
    readingTime: "10 min read",
    tag: "Engineering Velocity",
  },
  {
    title: "Cross-Meeting Memory Architecture: How Rapto Links Commitments Across Calls",
    slug: "cross-meeting-memory-architecture",
    excerpt:
      "How semantic vector similarity, sliding-window chunking, and deterministic state machines connect Monday commitments to Thursday delivery.",
    author: "Alex Vance",
    readingTime: "12 min read",
    tag: "AI Architecture",
  },
];

export function HomeBlogPreview() {
  return (
    <section
      id="engineering-insights"
      aria-labelledby="insights-heading"
      className="relative bg-[var(--color-paper)] py-24 sm:py-32 border-t border-[var(--color-ink-900)]/5 overflow-hidden content-auto"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[var(--color-brand-100)]/20 blur-[130px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <motion.div variants={revealUp} className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-[var(--color-brand-500)]" />
              <span className="inline-flex items-center gap-1.5 text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase font-mono">
                <BookOpen className="w-3.5 h-3.5" />
                Engineering & Research
              </span>
            </motion.div>

            <motion.h2
              id="insights-heading"
              variants={revealUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.1]"
            >
              Inside our architecture &amp;{" "}
              <span className="text-[var(--color-brand-600)]">meeting intelligence.</span>
            </motion.h2>
          </div>

          <motion.div variants={revealUp}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-sm text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline whitespace-nowrap"
            >
              View all architecture articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* 3-Card Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {FEATURED_ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-2xl bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 p-6 sm:p-7 shadow-tier-1 hover:shadow-tier-2 hover:border-[var(--color-brand-500)]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-200)]/40">
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-ink-500)]">
                    <Clock className="w-3 h-3" />
                    {article.readingTime}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-display font-semibold text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-600)] transition-colors leading-snug mb-3">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-ink-600)] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-ink-900)]/10 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-500)]">
                  <User className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                  {article.author}
                </span>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-brand-700)] group-hover:translate-x-0.5 transition-transform"
                >
                  Read guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
