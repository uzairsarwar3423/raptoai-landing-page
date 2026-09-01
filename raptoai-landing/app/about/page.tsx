import type { Metadata } from "next";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";

export const metadata: Metadata = {
  title: "About Us — The Mission to Turn Spoken Promises Into Execution",
  description:
    "Learn about Rapto's founding story, team principles, and our mission to solve the post-meeting follow-through problem for fast-moving engineering and product teams.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Rapto — Meeting Accountability Platform",
    description:
      "The story behind Rapto: Why we built the first AI platform that remembers meeting commitments and automates cross-meeting follow-through.",
    url: "https://rapto.ai/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rapto AI",
    description: "Building the intelligence layer for workplace meeting commitments and follow-through.",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Rapto AI",
    description:
      "The mission, principles, and team behind Rapto — the AI meeting accountability platform.",
    publisher: {
      "@type": "Organization",
      name: "Rapto AI",
      url: "https://rapto.ai",
      logo: "https://rapto.ai/rapto-ai.svg",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)]">
        <AboutHero />
        <AboutStory />
        <AboutPrinciples />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
