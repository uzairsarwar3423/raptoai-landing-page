import type { Metadata } from "next";
import { SecurityHero } from "@/components/security/SecurityHero";
import { SecurityCertifications } from "@/components/security/SecurityCertifications";
import { SecurityPipeline } from "@/components/security/SecurityPipeline";
import { SecurityPillars } from "@/components/security/SecurityPillars";
import { SecurityControlsMatrix } from "@/components/security/SecurityControlsMatrix";
import { SecuritySubprocessors } from "@/components/security/SecuritySubprocessors";
import { SecurityFaq } from "@/components/security/SecurityFaq";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Security, Privacy & Trust — SOC 2 Type II Certified",
  description:
    "Enterprise-grade security by design: SOC 2 Type II certified, zero AI model training on customer data, FIPS 140-3 AES-256 encryption, TLS 1.3, SAML 2.0 SSO, and isolated dedicated cloud architecture.",
  openGraph: {
    title: "Security & Trust at Rapto — SOC 2 Type II & Zero AI Model Training",
    description:
      "Explore Rapto's security architecture: SOC 2 Type II compliance, zero foundation model training on customer transcripts, end-to-end encryption, and enterprise sub-processor governance.",
    type: "website",
    url: "https://rapto.cloud/security",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security & Trust | Rapto AI Meeting Intelligence",
    description: "Enterprise security by design: SOC 2 Type II, zero AI model training, and AES-256 encryption.",
  },
};

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Rapto Security, Privacy & Trust Center",
    description:
      "Official security architecture, compliance certifications, and data protection practices for Rapto Technologies, Inc.",
    publisher: {
      "@type": "Organization",
      name: "Rapto Technologies, Inc.",
      url: "https://rapto.cloud",
      sameAs: [
        "https://status.rapto.cloud",
        "https://github.com/rapto-ai",
      ],
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
        <SecurityHero />
        <SecurityCertifications />
        <SecurityPipeline />
        <SecurityPillars />
        <SecurityControlsMatrix />
        <SecuritySubprocessors />
        <SecurityFaq />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
