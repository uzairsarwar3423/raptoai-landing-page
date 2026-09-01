import type { Metadata } from "next";
import { ComparePageContent } from "@/components/compare/ComparePageContent";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Rapto vs Traditional Meeting Recorders — Comparison & Benchmarks",
  description:
    "An honest, factual breakdown of Rapto vs. Fireflies.ai, Otter.ai, Fathom, and Granola. See why engineering teams choose cross-meeting memory and flat squad pricing over passive note-taking.",
  openGraph: {
    title: "Rapto vs Traditional Note-Takers | Competitive Comparison",
    description:
      "Cross-meeting memory, bi-directional Linear/Jira sync, and flat squad rates vs per-seat transcription taxes.",
    type: "website",
    url: "https://rapto.ai/compare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapto vs Competitors — Compare AI Meeting Tools",
    description:
      "Why high-performing engineering squads choose active commitment intelligence over passive notes.",
  },
};

export default function ComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rapto vs Competitors Comparison Hub",
    description:
      "Side-by-side comparison of Rapto against Fireflies.ai, Otter.ai, Fathom, and Granola for engineering and product teams.",
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
        <ComparePageContent initialCompetitorId="all" />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
