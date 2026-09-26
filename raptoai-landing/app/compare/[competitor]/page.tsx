import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparePageContent } from "@/components/compare/ComparePageContent";
import { COMPETITORS, CompetitorProfile, COMPARE_FAQS } from "@/components/compare/compare.content";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export function generateStaticParams() {
  return COMPETITORS.map((comp) => ({
    competitor: comp.slug,
  }));
}

function resolveCompetitor(slugOrId: string): CompetitorProfile | undefined {
  const clean = slugOrId.toLowerCase().replace(/^vs-/, "");
  return COMPETITORS.find(
    (c) => c.id.toLowerCase() === clean || c.slug.toLowerCase() === slugOrId.toLowerCase()
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { competitor: competitorParam } = await params;
  const competitor = resolveCompetitor(competitorParam);

  if (!competitor) {
    return {
      title: "Rapto Comparison — Meeting Accountability vs Traditional Tools",
    };
  }

  return {
    title: `Rapto vs ${competitor.name} — Honest Feature & Pricing Comparison`,
    description: `Compare Rapto and ${competitor.name} side-by-side. See why engineering teams choose cross-meeting memory, Linear/Jira sync, and flat squad rates.`,
    alternates: {
      canonical: `/compare/${competitor.slug}`,
    },
    openGraph: {
      title: `Rapto vs ${competitor.name} — Feature & Pricing Breakdown`,
      description: competitor.verdictDescription,
      url: `https://rapto.cloud/compare/${competitor.slug}`,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Rapto vs ${competitor.name} Feature and Pricing Comparison`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Rapto vs ${competitor.name} — Feature & Pricing Breakdown`,
      description: competitor.verdictDescription,
      images: [
        {
          url: "/twitter-image",
          width: 1200,
          height: 630,
          alt: `Rapto vs ${competitor.name} Feature and Pricing Comparison`,
        },
      ],
    },
  };
}

export default async function CompetitorComparePage({ params }: PageProps) {
  const { competitor: competitorParam } = await params;
  const competitor = resolveCompetitor(competitorParam);

  if (!competitor) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Rapto vs ${competitor.name} Comparison`,
    description: competitor.verdictDescription,
    url: `${siteUrl}/compare/${competitor.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Rapto AI",
      url: siteUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: `${siteUrl}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Rapto vs ${competitor.name}`,
        item: `${siteUrl}/compare/${competitor.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COMPARE_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <ComparePageContent initialCompetitorId={competitor.id} />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
