import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/blog/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { DirectAnswerBox } from "@/components/blog/DirectAnswerBox";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { AuthorBioCard } from "@/components/blog/AuthorBioCard";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import { ArticleShareBar } from "@/components/blog/ArticleShareBar";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { InlineCTA } from "@/components/blog/InlineCTA";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { Calendar, Clock, RotateCcw, BadgeCheck } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.ai";

export async function generateStaticParams() {
  const posts = getAllPosts({ includeDrafts: false });
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Rapto Blog",
      description: "The requested blog article could not be found.",
    };
  }

  const canonical = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription,
    alternates: {
      canonical,
    },
    authors: [{ name: post.author.name, url: `${siteUrl}/blog/authors/${post.author.id}` }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      siteName: "Rapto",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category.title,
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
      creator: "@raptoai",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const articleSchema = generateArticleSchema(post);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.category.title, url: `/blog/category/${post.category.slug}` },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const faqSchema = generateFAQSchema(post.faq);

  const formattedPublishDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedUpdatedDate = new Date(post.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      <main className="min-h-screen bg-[var(--color-paper)] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: post.category.title, href: `/blog/category/${post.category.slug}` },
                { label: post.title },
              ]}
            />
          </div>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-10 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4">
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-xs font-mono font-semibold hover:bg-[var(--color-brand-100)] transition-colors"
              >
                {post.category.title}
              </Link>
              {post.topicCluster === "pillar" && (
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] border border-[var(--color-ink-900)]/10 text-xs font-mono font-medium">
                  ★ Pillar Guide
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-900)] mb-6 leading-[1.12]">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-ink-700)] leading-relaxed font-sans mb-8">
              {post.excerpt}
            </p>

            {/* Author and Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-[var(--color-ink-900)]/10">
              <div className="flex items-center gap-3">
                <Link
                  href={`/blog/authors/${post.author.id}`}
                  className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--color-brand-500)]/30 group"
                >
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="44px"
                  />
                </Link>
                <div className="text-left">
                  <Link
                    href={`/blog/authors/${post.author.id}`}
                    className="text-sm font-bold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors inline-flex items-center gap-1"
                  >
                    {post.author.name}
                    {post.author.verified && (
                      <BadgeCheck className="w-4 h-4 text-[var(--color-brand-500)] inline" />
                    )}
                  </Link>
                  <p className="text-xs font-mono text-[var(--color-ink-500)]">
                    {post.author.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--color-ink-500)]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.publishedAt}>{formattedPublishDate}</time>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </span>
                {post.updatedAt !== post.publishedAt && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[var(--color-brand-600)]">
                      <RotateCcw className="w-3 h-3" />
                      <span>Updated {formattedUpdatedDate}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Hero Cover Image */}
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full max-w-5xl mx-auto rounded-[var(--radius-xl)] overflow-hidden bg-[var(--color-canvas-dark)] shadow-tier-2 mb-12">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Article Layout Grid (Content + Sticky Sidebar) */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8 min-w-0">
              {/* Direct Answer Box (AEO & LLM Citation optimization) */}
              {post.directAnswer && (
                <DirectAnswerBox directAnswer={post.directAnswer} />
              )}

              {/* Mobile Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="block lg:hidden mb-8">
                  <TableOfContents items={post.tableOfContents} />
                </div>
              )}

              {/* Main Editorial Article Body */}
              <ArticleRenderer content={post.content} />

              {/* Contextual Product CTA */}
              <InlineCTA />

              {/* Article FAQ Accordion */}
              {post.faq && post.faq.length > 0 && (
                <ArticleFAQ items={post.faq} />
              )}

              {/* Tags Cloud */}
              <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--color-ink-900)]/10 my-8">
                <span className="text-xs font-mono text-[var(--color-ink-500)] uppercase tracking-wider font-semibold mr-2">
                  Tagged in:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-700)] border border-[var(--color-ink-900)]/10 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Share Bar */}
              <div className="py-4 border-y border-[var(--color-ink-900)]/10 mb-10 flex items-center justify-between flex-wrap gap-4">
                <ArticleShareBar title={post.title} slug={post.slug} />
              </div>

              {/* Author Bio Card */}
              <AuthorBioCard author={post.author} />
            </div>

            {/* Desktop Sticky Sidebar (TOC + Author Quick Card + Mini CTA) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-8">
              <div className="sticky top-28 space-y-6">
                {post.tableOfContents && post.tableOfContents.length > 0 && (
                  <TableOfContents items={post.tableOfContents} />
                )}

                {/* Sidebar Quick Share */}
                <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1">
                  <ArticleShareBar title={post.title} slug={post.slug} />
                </div>

                {/* Sidebar Mini Product Card */}
                <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-canvas-dark)] text-white border border-white/10 shadow-tier-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-600)] rounded-full blur-2xl opacity-20 pointer-events-none" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-brand-300)] font-semibold block mb-2">
                    Try Rapto Free
                  </span>
                  <h4 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                    Turn your next meeting promises into Linear issues.
                  </h4>
                  <p className="text-xs text-white/70 font-sans mb-4 leading-relaxed">
                    Zero bot on calls. Bi-directional sync. Flat squad pricing ($39/mo).
                  </p>
                  <a
                    href="https://app.rapto.cloud/register"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white text-xs font-semibold shadow-cta-glow transition-all"
                  >
                    Start Free 14-Day Trial →
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles in Topic Cluster */}
          <RelatedArticles posts={relatedPosts} />
        </div>

        {/* Global Final CTA & Footer */}
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
