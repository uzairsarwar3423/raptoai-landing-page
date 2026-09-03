import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getCategoryBySlug } from "@/lib/blog/categories";
import { getPostsByCategory, getAllPosts } from "@/lib/blog/posts";
import { generateBreadcrumbSchema } from "@/lib/blog/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { CategoryPillList } from "@/components/blog/CategoryPillList";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { Layers, ArrowRight, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found | Rapto Blog",
      description: "The requested blog category could not be found.",
    };
  }

  const canonical = `${siteUrl}/blog/category/${category.slug}`;

  return {
    title: `${category.title} Guides & Research | Rapto Blog`,
    description: category.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${category.title} Articles — Rapto Blog`,
      description: category.description,
      type: "website",
      url: canonical,
      siteName: "Rapto",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} Articles — Rapto Blog`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(category.slug);
  const allPosts = getAllPosts();
  const pillarPost = posts.find((p) => p.topicCluster === "pillar");

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: category.title, url: `/blog/category/${category.slug}` },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} Topic Cluster`,
    description: category.description,
    url: `${siteUrl}/blog/category/${category.slug}`,
    isPartOf: {
      "@type": "Blog",
      name: "Rapto Blog",
      url: `${siteUrl}/blog`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <main className="min-h-screen bg-[var(--color-paper)] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: category.title }]} />
          </div>

          {/* Category Hero Header */}
          <header className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-xs font-mono font-semibold mb-4 border border-[var(--color-brand-100)]">
              <Layers className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              <span>TOPIC CLUSTER: {category.eyebrow.toUpperCase()}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-900)] mb-4 leading-tight">
              {category.title}
            </h1>

            <p className="text-lg text-[var(--color-ink-700)] leading-relaxed font-sans mb-6">
              {category.description}
            </p>

            {pillarPost && (
              <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-paper-raised)] border border-[var(--color-brand-500)]/30 shadow-tier-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-[var(--color-brand-700)] uppercase tracking-wider font-semibold block mb-1">
                    Featured Pillar Guide:
                  </span>
                  <Link
                    href={`/blog/${pillarPost.slug}`}
                    className="font-display text-base font-bold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors"
                  >
                    {pillarPost.title}
                  </Link>
                </div>
                <Link
                  href={`/blog/${pillarPost.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] text-xs font-semibold hover:bg-[var(--color-brand-100)] transition-colors flex-shrink-0"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </header>

          {/* Category navigation tabs */}
          <div className="mb-10 pb-4 border-b border-[var(--color-ink-900)]/10">
            <CategoryPillList activeCategorySlug={category.slug} />
          </div>

          {/* Articles Grid */}
          <section aria-label={`${category.title} Articles`} className="mb-16">
            <ArticleGrid
              posts={posts}
              emptyMessage={`No articles currently published under ${category.title}.`}
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
