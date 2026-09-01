import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparePageContent } from "@/components/compare/ComparePageContent";
import { COMPETITORS, CompetitorProfile } from "@/components/compare/compare.content";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

interface PageProps {
  params: Promise<{ competitor: string }>;
}

export function generateStaticParams() {
  const params: { competitor: string }[] = [];

  COMPETITORS.forEach((comp) => {
    params.push({ competitor: comp.slug });
    params.push({ competitor: comp.id });
  });

  return params;
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
      url: `https://rapto.ai/compare/${competitor.slug}`,
      type: "website",
    },
  };
}

export default async function CompetitorComparePage({ params }: PageProps) {
  const { competitor: competitorParam } = await params;
  const competitor = resolveCompetitor(competitorParam);

  if (!competitor) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Rapto vs ${competitor.name} Comparison`,
    description: competitor.verdictDescription,
    publisher: {
      "@type": "Organization",
      name: "Rapto Technologies, Inc.",
      url: "https://rapto.ai",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <ComparePageContent initialCompetitorId={competitor.id} />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
