import type { Metadata } from "next";
import { DPAHero } from "@/components/legal/DPAHero";
import { DPAHighlights } from "@/components/legal/DPAHighlights";
import { DPAContent } from "@/components/legal/DPAContent";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA) — Rapto AI Meeting Intelligence",
  description:
    "Rapto's Data Processing Agreement (DPA) incorporating GDPR Article 28 terms, EU 2021/914 Standard Contractual Clauses (SCCs), UK Addendum, CCPA Service Provider terms, and zero AI model training commitments.",
  openGraph: {
    title: "Data Processing Agreement (DPA) | Rapto",
    description:
      "GDPR Article 28 & Standard Contractual Clauses (SCCs) compliance, zero AI model training guarantee, and enterprise data protection standards.",
    type: "website",
    url: "https://rapto.cloud/legal/dpa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Processing Agreement (DPA) | Rapto",
    description: "Our binding commitment to enterprise data protection, GDPR Art. 28 compliance, and AI governance.",
  },
};

export default function DPAPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: "Rapto Data Processing Agreement (DPA)",
    description:
      "Official Data Processing Agreement and Standard Contractual Clauses addendum for Rapto Technologies, Inc.",
    publisher: {
      "@type": "Organization",
      name: "Rapto Technologies, Inc.",
      url: "https://rapto.cloud",
      address: {
        "@type": "PostalAddress",
        streetAddress: "548 Market St, Suite 39201",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        postalCode: "94104",
        addressCountry: "US",
      },
    },
    inLanguage: "en-US",
    datePublished: "2026-01-01",
    dateModified: "2026-08-25",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <DPAHero />
        <DPAHighlights />
        <DPAContent />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
