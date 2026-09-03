import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllAuthors, getAuthorById } from "@/lib/blog/authors";
import { getPostsByAuthor } from "@/lib/blog/posts";
import { generateAuthorSchema, generateBreadcrumbSchema } from "@/lib/blog/seo";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { NewsletterCTA } from "@/components/blog/NewsletterCTA";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { BadgeCheck } from "lucide-react";
import { XTwitterIcon, LinkedInIcon, GitHubIcon } from "@/components/blog/SocialIcons";

interface PageProps {
  params: Promise<{ author: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((a) => ({
    author: a.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author: authorId } = await params;
  const author = getAuthorById(authorId);

  if (!author) {
    return {
      title: "Author Not Found | Rapto Blog",
      description: "The requested author profile could not be found.",
    };
  }

  const canonical = `${siteUrl}/blog/authors/${author.id}`;

  return {
    title: `${author.name} — Author Profile & Research | Rapto Blog`,
    description: `${author.name} (${author.role} at Rapto). ${author.bio}`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${author.name} — Author Profile | Rapto`,
      description: author.bio,
      type: "profile",
      url: canonical,
      siteName: "Rapto",
      images: [{ url: author.avatar, width: 256, height: 256, alt: author.name }],
    },
    twitter: {
      card: "summary",
      title: `${author.name} — Rapto Blog`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { author: authorId } = await params;
  const author = getAuthorById(authorId);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(author.id);
  const authorSchema = generateAuthorSchema(author);
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: author.name, url: `/blog/authors/${author.id}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <main className="min-h-screen bg-[var(--color-paper)] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[{ label: author.name }]} />
          </div>

          {/* Author Profile Header */}
          <header className="p-8 sm:p-10 rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-2 mb-14 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[var(--color-brand-500)]/30 flex-shrink-0 shadow-tier-1">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)] inline-flex items-center gap-2">
                    {author.name}
                    {author.verified && (
                      <BadgeCheck className="w-6 h-6 text-[var(--color-brand-500)] inline" aria-label="Verified Author" />
                    )}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[var(--color-brand-50)] text-[var(--color-brand-700)] font-semibold">
                    {author.role}
                  </span>
                  <span className="text-xs font-mono text-[var(--color-ink-500)]">
                    • Rapto Research &amp; Engineering
                  </span>
                </div>

                <p className="text-xs font-mono text-[var(--color-brand-600)] font-semibold mb-3">
                  {author.credentials}
                </p>

                <p className="text-sm sm:text-base text-[var(--color-ink-700)] leading-relaxed font-sans mb-5">
                  {author.bio}
                </p>

                <div className="flex items-center gap-3">
                  {author.twitter && (
                    <a
                      href={author.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                      aria-label={`${author.name}'s Twitter / X`}
                    >
                      <XTwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                      aria-label={`${author.name}'s LinkedIn`}
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  )}
                  {author.github && (
                    <a
                      href={author.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                      aria-label={`${author.name}'s GitHub`}
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}
                  <span className="text-xs font-mono text-[var(--color-ink-500)] ml-auto">
                    {posts.length} {posts.length === 1 ? "article published" : "articles published"}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Articles Written by Author */}
          <section aria-label={`Articles by ${author.name}`} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)]">
                Articles &amp; Research by {author.name}
              </h2>
            </div>

            <ArticleGrid
              posts={posts}
              emptyMessage={`No articles published by ${author.name} yet.`}
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
