import type { Metadata } from "next";
import { PricingPageContent } from "@/components/pricing/PricingPageContent";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Rapto AI Pricing — Flat Team Rates, No Per-Seat Fees | From $39/mo",
  description:
    "Rapto's flat squad pricing starts at $39/mo for up to 10 members. No per-seat tax. Compare tiers, calculate your ROI, and start a free 14-day trial. No credit card required.",
  alternates: {
    canonical: "https://rapto.cloud/pricing",
  },
  openGraph: {
    title: "Rapto Pricing — Flat Team Rates, Zero Seat Anxiety",
    description:
      "Onboard every engineer, designer, and PM without per-seat line-item friction. Explore flat team plans with a 14-day free trial.",
    type: "website",
    url: "https://rapto.cloud/pricing",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rapto AI Pricing — Transparent Flat Squad Rates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapto Pricing — Flat Team Rates, Zero Seat Anxiety",
    description:
      "Predictable team rates for AI meeting intelligence and commitment tracking. No seat taxes.",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "Rapto AI Pricing — Transparent Flat Squad Rates",
      },
    ],
  },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rapto",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud, Zoom, Google Meet, Microsoft Teams",
    description:
      "AI meeting intelligence platform that tracks commitments and syncs tasks into Jira, Linear, Notion, and Slack.",
    offers: [
      {
        "@type": "Offer",
        name: "Free Plan",
        price: "0",
        priceCurrency: "USD",
        description: "For small teams testing core AI meeting extraction workflows.",
      },
      {
        "@type": "Offer",
        name: "Starter Plan",
        price: "39",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description: "Optimized for early startups & small engineering squads up to 10 members.",
      },
      {
        "@type": "Offer",
        name: "Growth Plan",
        price: "79",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description: "Engineered for fast-growing product & engineering teams up to 25 members.",
      },
      {
        "@type": "Offer",
        name: "Business Plan",
        price: "159",
        priceCurrency: "USD",
        billingDuration: "P1M",
        description: "Built for scaling organizations up to 60 members across 5 team workspaces.",
      },
      {
        "@type": "Offer",
        name: "Enterprise Plan",
        price: "500",
        priceCurrency: "USD",
        description: "Unlimited members, SAML SSO, SOC 2 Type II, SCIM, and dedicated TAM.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[var(--color-paper)] min-h-screen">
        <PricingPageContent />
        <FinalCTA />
        <Footer finalCtaSelector="#final-cta" />
      </main>
    </>
  );
}
