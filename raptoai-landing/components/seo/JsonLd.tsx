import * as React from "react";
import { HOME_FAQS } from "@/components/sections/FAQ/faq.content";

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rapto AI",
    alternateName: "Rapto",
    url: siteUrl,
    logo: `${siteUrl}/rapto-ai.svg`,
    description:
      "Rapto is an AI meeting accountability platform that captures every spoken commitment and follows up automatically across meetings.",
    foundingDate: "2025",
    knowsAbout: [
      "AI Meeting Intelligence",
      "Meeting Accountability",
      "Automated Action Items",
      "Linear Jira Slack Integration",
      "Cross-Meeting Memory",
      "Engineering Productivity"
    ],
    sameAs: [
      "https://twitter.com/raptoai",
      "https://linkedin.com/company/raptoai",
      "https://github.com/raptoai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@rapto.cloud",
      url: `${siteUrl}/about`,
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rapto AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, macOS, Windows",
    url: siteUrl,
    image: `${siteUrl}/rapto-ai.svg`,
    description:
      "AI Meeting Accountability Platform. Remembers every meeting commitment and automates follow-through across Zoom, Google Meet, and Microsoft Teams.",
    offers: [
      {
        "@type": "Offer",
        name: "Free Tier",
        price: "0",
        priceCurrency: "USD",
        description: "5 free recorded meetings per month with automated commitment extraction.",
      },
      {
        "@type": "Offer",
        name: "Starter Squad Tier",
        price: "39",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "39",
          priceCurrency: "USD",
          unitCode: "MON",
        },
        description: "Flat squad rate for up to 10 members, 40 meetings/mo, full Slack and Linear sync.",
      },
      {
        "@type": "Offer",
        name: "Growth Squad Tier",
        price: "99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "99",
          priceCurrency: "USD",
          unitCode: "MON",
        },
        description: "Flat squad rate for up to 25 members, unlimited meetings, Jira and Notion bi-directional sync.",
      },
    ],
    featureList: [
      "Autonomous Promise & Commitment Extraction",
      "Cross-Meeting Automated Follow-Ups",
      "Accountability & Fulfilment Scoring",
      "Botless and Bot Recording for Zoom, Meet, and Teams",
      "Bi-directional Integrations with Slack, Linear, Jira, and Notion",
      "Enterprise SOC-2 Type II Certified Data Privacy",
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rapto",
    url: siteUrl,
    description:
      "Meeting accountability, not just meeting notes. Rapto ensures every meeting promise is fulfilled.",
    publisher: {
      "@type": "Organization",
      name: "Rapto AI",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/rapto-ai.svg`,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Pricing",
        description: "Flat team pricing tiers with zero per-seat anxiety",
        url: `${siteUrl}/pricing`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Competitor Comparison",
        description: "Rapto vs Fireflies, Otter, Fathom, and Granola",
        url: `${siteUrl}/compare`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Security & Compliance",
        description: "SOC-2 Type II compliance, zero AI training, and AES-256 encryption",
        url: `${siteUrl}/security`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Engineering Blog",
        description: "Architecture deep-dives, systems design, and meeting intelligence",
        url: `${siteUrl}/blog`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Integrations",
        description: "Two-way integrations with Zoom, Teams, Linear, Slack, and Jira",
        url: `${siteUrl}/#integrations`,
      },
    ],
  };

  /**
   * HowTo Schema — targets step-by-step rich results in Google Search
   * and is heavily cited by AI Overviews / Perplexity for procedural queries
   * like "how does AI meeting accountability work".
   * Maps directly to the 5-step pipeline shown in the WorkflowFeature section.
   */
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Rapto AI Tracks Meeting Commitments Automatically",
    description:
      "Rapto converts spoken meeting promises into tracked, verified deliverables using a 5-step autonomous AI pipeline — from call recording to confirmed follow-through.",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Record",
        text: "Rapto auto-joins your Zoom, Google Meet, or Microsoft Teams call via calendar sync. It supports both botless device-level audio capture and a standard AI meeting bot, depending on your organization's security policy.",
        url: `${siteUrl}/#integrations`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Extract",
        text: "Rapto's high-precision neural parser analyzes the live transcript in real time, extracting every spoken commitment, its owner, and any stated deadlines — with 99.4% extraction accuracy.",
        url: `${siteUrl}/#why-rapto`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Assign",
        text: "Each extracted commitment is auto-assigned to the responsible team member and immediately synced into your project management stack: Jira, Linear, Notion, or Slack — without any manual copy-paste.",
        url: `${siteUrl}/#workflow-feature`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Sync",
        text: "Rapto's cross-meeting neural memory links each open commitment across every subsequent call. When a standup or retro references a prior promise, Rapto automatically matches it to the original action item.",
        url: `${siteUrl}/#workflow-feature`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Resolve",
        text: "When a team member verbally confirms fulfillment in a subsequent meeting, Rapto automatically closes the linked Jira/Linear issue, updates the team accountability dashboard, and adjusts the individual's commitment score — zero manual entry required.",
        url: `${siteUrl}/#why-rapto`,
      },
    ],
  };

  /**
   * Product Schema — enables AggregateOffer display in Google Shopping-style
   * knowledge panels and AI Overviews for "best AI meeting tool" comparison queries.
   * Distinct from SoftwareApplication — both should be present.
   */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Rapto AI — Meeting Accountability Platform",
    description:
      "Autonomous AI meeting accountability software that converts spoken commitments into tracked deliverables with bi-directional Linear, Jira, Slack, and Notion sync.",
    brand: {
      "@type": "Brand",
      name: "Rapto",
    },
    url: siteUrl,
    image: `${siteUrl}/rapto-ai.svg`,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "199",
      priceCurrency: "USD",
      offerCount: "4",
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "39",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Growth Plan",
          price: "79",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Business Plan",
          price: "159",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/pricing`,
        },
      ],
    },
    /**
     * aggregateRating — ADD THIS once you have real G2/Capterra reviews.
     * CAUTION: Do NOT fabricate ratings. Google can penalise for fake structured data.
     *
     * aggregateRating: {
     *   "@type": "AggregateRating",
     *   ratingValue: "4.8",
     *   reviewCount: "47",
     *   bestRating: "5",
     *   worstRating: "1",
     * },
     */
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />
      {/* HowTo: triggers step-by-step rich results + AI Overview citations */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* Product: enables AggregateOffer in knowledge panels + comparison AI Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
