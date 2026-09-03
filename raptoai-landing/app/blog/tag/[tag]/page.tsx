import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getTagBySlug } from "@/lib/blog/tags";
import { getPostsByTag } from "@/lib/blog/posts";
import { generateBreadcrumbSchema } from "@/lib/blog/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { CategoryPillList } from "@/components/blog/CategoryPillList";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { Tag as TagIcon } from "lucide-react";

interface PageProps {
  params: Promise<{ tag: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({
    tag: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    return {
      title: "Tag Not Found | Rapto Blog",
      description: "The requested tag could not be found.",
    };
  }

  const canonical = `${siteUrl}/blog/tag/${tag.slug}`;

  return {
    title: `${tag.title} Articles & Resources | Rapto Blog`,
    description: tag.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${tag.title} — Rapto Blog`,
      description: tag.description,
      type: "website",
      url: canonical,
      siteName: "Rapto",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tag.title} — Rapto Blog`,
      description: tag.description,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTag(tag.slug);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: `#${tag.title}`, url: `/blog/tag/${tag.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <main className="min-h-screen bg-[var(--color-paper)] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: `#${tag.title}` }]} />
          </div>

          {/* Tag Header */}
          <header className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-xs font-mono font-semibold mb-4 border border-[var(--color-brand-100)]">
              <TagIcon className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              <span>TAG ARCHIVE</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-900)] mb-4 leading-tight">
              #{tag.title}
            </h1>

            <p className="text-lg text-[var(--color-ink-700)] leading-relaxed font-sans mb-6">
              {tag.description}
            </p>

            <span className="text-xs font-mono text-[var(--color-ink-500)]">
              {posts.length} {posts.length === 1 ? "article" : "articles"} indexed under this tag
            </span>
          </header>

          {/* Topic Pills */}
          <div className="mb-10 pb-4 border-b border-[var(--color-ink-900)]/10">
            <CategoryPillList />
          </div>

          {/* Articles Grid */}
          <section aria-label={`Articles tagged with #${tag.title}`} className="mb-16">
            <ArticleGrid
              posts={posts}
              emptyMessage={`No articles currently tagged under #${tag.title}.`}
            />
          </section>

          {/* Newsletter CTA */}
          <NewsletterCTA />
        </div>

        {/* Global Final CTA & Footer */}
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
