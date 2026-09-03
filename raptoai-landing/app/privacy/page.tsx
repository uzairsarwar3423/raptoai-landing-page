import type { Metadata } from "next";
import { PrivacyHero } from "@/components/legal/PrivacyHero";
import { PrivacyHighlights } from "@/components/legal/PrivacyHighlights";
import { PrivacyContent } from "@/components/legal/PrivacyContent";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Rapto AI Meeting Intelligence",
  description:
    "Learn about Rapto's strict privacy standards: zero AI model training on customer data, AES-256 encryption, SOC 2 Type II compliance, and transparent customer data ownership.",
  openGraph: {
    title: "Privacy Policy | Rapto",
    description:
      "Zero AI training on customer transcripts, end-to-end encryption, and full GDPR/CCPA compliance.",
    type: "website",
    url: "https://rapto.cloud/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Rapto",
    description: "Our binding commitment to customer data privacy and AI governance.",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rapto Privacy Policy",
    description:
      "Official privacy policy and data governance practices for Rapto Technologies, Inc.",
    publisher: {
      "@type": "Organization",
      name: "Rapto Technologies, Inc.",
      url: "https://rapto.cloud",
    },
    inLanguage: "en-US",
    datePublished: "2026-01-01",
    dateModified: "2026-08-16",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <PrivacyHero />
        <PrivacyHighlights />
        <PrivacyContent />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
