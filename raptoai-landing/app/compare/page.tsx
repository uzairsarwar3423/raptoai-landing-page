import type { Metadata } from "next";
import { ComparePageContent } from "@/components/compare/ComparePageContent";
import { COMPARE_FAQS } from "@/components/compare/compare.content";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Rapto vs Fireflies, Otter, Fathom & Granola — Best AI Meeting Tool for Engineering Teams [2026]",
  description:
    "Honest comparison: Rapto vs Fireflies.ai, Otter.ai, Fathom, and Granola. See why engineering teams switch to cross-meeting memory, flat $79/mo squad pricing, and bi-directional Jira/Linear sync.",
  alternates: {
    canonical: "https://rapto.cloud/compare",
  },
  openGraph: {
    title: "Rapto vs Traditional Note-Takers | Competitive Comparison",
    description:
      "Cross-meeting memory, bi-directional Linear/Jira sync, and flat squad rates vs per-seat transcription taxes.",
    type: "website",
    url: "https://rapto.cloud/compare",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rapto vs Traditional Note-Takers Competitive Comparison Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapto vs Competitors — Compare AI Meeting Tools",
    description:
      "Why high-performing engineering squads choose active commitment intelligence over passive notes.",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "Rapto vs Competitors — Compare AI Meeting Tools",
      },
    ],
  },
};

export default function ComparePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rapto vs Competitors Comparison Hub",
    description:
      "Side-by-side comparison of Rapto against Fireflies.ai, Otter.ai, Fathom, and Granola for engineering and product teams.",
    url: `${siteUrl}/compare`,
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
        <ComparePageContent initialCompetitorId="all" />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
