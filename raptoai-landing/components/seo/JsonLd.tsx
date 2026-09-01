import * as React from "react";

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.ai";

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
    sameAs: [
      "https://twitter.com/raptoai",
      "https://linkedin.com/company/raptoai",
      "https://github.com/raptoai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@rapto.ai",
      url: `${siteUrl}/about`,
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rapto",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, macOS, Windows, iOS, Android",
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
        name: "Pro Team Tier",
        price: "39",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "39",
          priceCurrency: "USD",
          unitCode: "MON",
        },
        description: "Unlimited meetings, full team accountability scoring, Slack and Linear sync.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "148",
      bestRating: "5",
      worstRating: "1",
    },
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
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Rapto different from transcription tools like Otter or Fireflies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Traditional tools only transcribe and summarize audio. Rapto focuses on what happens after the meeting: it extracts concrete commitments, assigns owners, tracks deadlines, and follows up autonomously in subsequent meetings until each promise is fulfilled.",
        },
      },
      {
        "@type": "Question",
        name: "Which video conferencing platforms does Rapto support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rapto works seamlessly with Zoom, Google Meet, and Microsoft Teams, supporting both botless recording (via calendar sync and audio capture) and AI bot assistants.",
        },
      },
      {
        "@type": "Question",
        name: "Is customer meeting audio used to train AI models?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Rapto enforces a strict zero-data-retention training policy. Your meeting audio and transcripts are never used to train public or foundation AI models, and all data is encrypted at rest and in transit (SOC-2 Type II compliant).",
        },
      },
      {
        "@type": "Question",
        name: "How does Rapto sync with project management tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rapto bi-directionally syncs commitments and action items directly into Slack channels, Linear issues, Jira tickets, and Notion databases without manual note-taking.",
        },
      },
    ],
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
    </>
  );
}
