import type { Metadata } from "next";
import { TermsPageClient } from "@/components/legal/TermsPageClient";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Rapto AI Meeting Intelligence",
  description:
    "Read Rapto's clear, plain-English Terms of Service: 100% customer data and IP ownership, zero AI model training, simple 1-click cancellation, and 99.9% uptime SLA.",
  openGraph: {
    title: "Terms of Service | Rapto AI",
    description:
      "Customer data ownership, zero AI foundation model training, 1-click cancellation, and enterprise SLA commitments.",
    type: "website",
    url: "https://rapto.ai/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Rapto AI",
    description:
      "Transparent and simple terms of service for high-trust engineering and product teams.",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rapto Terms of Service",
    description:
      "Official terms of service, customer IP ownership terms, zero AI training guarantees, and commercial agreements for Rapto Technologies, Inc.",
    publisher: {
      "@type": "Organization",
      name: "Rapto Technologies, Inc.",
      url: "https://rapto.ai",
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
    dateModified: "2026-08-26",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <TermsPageClient />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
