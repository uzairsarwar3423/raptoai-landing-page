import type { Metadata } from "next";
import { getAllPosts, getFeaturedPost } from "@/lib/blog/posts";
import { getAllCategories } from "@/lib/blog/categories";
import { generateBlogHubSchema, generateBreadcrumbSchema } from "@/lib/blog/seo";
import { FeaturedArticleCard } from "@/components/blog/FeaturedArticleCard";
import { BlogSearchFilter } from "@/components/blog/BlogSearchFilter";
import { TopicClusterTree } from "@/components/blog/TopicClusterTree";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { Sparkles, Layers } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

export const metadata: Metadata = {
  title: "Rapto Blog — AI Meeting Accountability & Engineering Intelligence",
  description:
    "Architectural deep-dives, engineering execution guides, and benchmarks on turning spoken meeting commitments into tracked Linear and Jira issues.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Rapto Blog — AI Meeting Accountability & Engineering Intelligence",
    description:
      "Deep technical articles on cross-meeting memory, deterministic state machines, standup optimization, and enterprise SOC-2 compliance.",
    type: "website",
    url: `${siteUrl}/blog`,
    siteName: "Rapto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapto Blog — AI Meeting Accountability & Engineering Intelligence",
    description:
      "Deep technical articles on cross-meeting memory, deterministic state machines, and engineering follow-through.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const featuredPost = getFeaturedPost();
  const nonFeaturedPosts = posts.filter((p) => p.id !== featuredPost.id);

  const blogHubSchema = generateBlogHubSchema(posts);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogHubSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <main className="min-h-screen bg-[var(--color-paper)] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[]} />
          </div>

          {/* Hero Header */}
          <header className="mb-14 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-xs font-mono font-semibold mb-4 border border-[var(--color-brand-100)]">
              <Layers className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              <span>THE RAPTO EDITORIAL DISPATCH</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-[var(--color-ink-900)] mb-5 leading-[1.08]">
              Meeting Accountability, Engineering Velocity &amp; AI Systems
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-ink-700)] leading-relaxed font-sans">
              Rigorous, evidence-backed guides for engineering leaders and high-output product squads. No fluff, no generic AI summaries—just architecture, culture, and execution.
            </p>
          </header>

          {/* Featured Post Showcase */}
          {featuredPost && (
            <section aria-label="Featured Article" className="mb-16">
              <FeaturedArticleCard post={featuredPost} />
            </section>
          )}

          {/* Interactive Search, Topic Filters & Article Grid */}
          <section aria-label="All Articles" className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--color-brand-700)]">
                  Explore The Archive
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)]">
                  All Articles &amp; Research
                </h2>
              </div>
              <span className="text-xs font-mono text-[var(--color-ink-500)] hidden sm:inline">
                {posts.length} Publications
              </span>
            </div>

            <BlogSearchFilter
              initialPosts={posts}
              categories={categories}
              initialCategory="all"
            />
          </section>

          {/* Topic Cluster Architectural Map */}
          <TopicClusterTree categories={categories} posts={posts} />

          {/* Newsletter Subscription Card */}
          <NewsletterCTA />
        </div>

        {/* Global Final CTA & Footer */}
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
