export interface PrivacySection {
  id: string;
  title: string;
  shortSummary: string;
  content: {
    paragraphs?: string[];
    subsections?: {
      title: string;
      paragraphs?: string[];
      listItems?: string[];
    }[];
    listItems?: string[];
    callout?: {
      type: "highlight" | "security" | "legal";
      title: string;
      message: string;
    };
  };
}

export const PRIVACY_METADATA = {
  effectiveDate: "August 16, 2026",
  lastUpdated: "August 16, 2026",
  version: "2.4",
  dpoEmail: "privacy@rapto.cloud",
  securityEmail: "security@rapto.cloud",
  companyName: "Rapto Technologies, Inc.",
  companyAddress: "548 Market St, Suite 39201, San Francisco, CA 94104",
};

export const PRIVACY_HIGHLIGHTS = [
  {
    icon: "ShieldCheck",
    title: "Zero AI Model Training",
    description:
      "We strictly NEVER use your customer meeting audio, transcripts, summaries, or metadata to train foundational AI models.",
  },
  {
    icon: "Lock",
    title: "End-to-End Encryption",
    description:
      "All audio streams and database records are encrypted using AES-256 at rest and TLS 1.3 in transit.",
  },
  {
    icon: "Database",
    title: "Strict Customer Data Ownership",
    description:
      "You retain 100% ownership of your meeting intelligence. You can export or hard-delete all records at any time.",
  },
  {
    icon: "FileCheck",
    title: "SOC 2 Type II & GDPR Compliant",
    description:
      "Audited by independent third-party assessors with comprehensive DPAs and Standard Contractual Clauses (SCCs).",
  },
];

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "1-introduction-and-scope",
    title: "1. Introduction & Core Principles",
    shortSummary: "Our binding commitment to transparency, data minimization, and user privacy.",
    content: {
      paragraphs: [
        `This Privacy Policy explains how ${PRIVACY_METADATA.companyName} ("Rapto", "we", "us", or "our") collects, uses, processes, stores, and protects information when you access or use our AI meeting intelligence platform, website (rapto.ai, rapto.cloud), desktop apps, browser extensions, and integrations (collectively, the "Services").`,
        "Rapto is engineered from the ground up for high-trust engineering and product teams. We believe that privacy is not an afterthought, but a core architectural requirement. We adhere strictly to the principle of data minimization—we only collect and process the information strictly required to deliver accurate meeting summaries, commitment tracking, and workflow automation.",
      ],
      callout: {
        type: "highlight",
        title: "Our Fundamental Privacy Guarantee",
        message:
          "We do not sell, rent, or monetize your data. We do not use your proprietary meeting transcripts, audio files, or team discussions to train public or foundational Large Language Models.",
      },
    },
  },
  {
    id: "2-information-we-collect",
    title: "2. Information We Collect",
    shortSummary: "Details on account credentials, meeting audio streams, calendar metadata, and integration tokens.",
    content: {
      paragraphs: [
        "We collect information in three primary ways: information you directly provide, data automatically captured during authorized meeting sessions, and data received from third-party integrations you explicitly enable.",
      ],
      subsections: [
        {
          title: "A. Account & Profile Information",
          paragraphs: [
            "When you create an account, register your workspace, or communicate with us, we collect:",
          ],
          listItems: [
            "Name, business email address, avatar photo, job title, and team name.",
            "Authentication credentials (hashed passwords or OAuth identity tokens from Google, Microsoft, Okta, or SAML 2.0).",
            "Billing contact details, company VAT/tax IDs, and payment transaction metadata (card numbers are securely handled via PCI-DSS Level 1 processors and never stored on our servers).",
          ],
        },
        {
          title: "B. Meeting Audio, Video & Transcript Data",
          paragraphs: [
            "When you authorize Rapto's bot to join a video conference (Zoom, Google Meet, Microsoft Teams) or upload recordings, we process:",
          ],
          listItems: [
            "Raw audio and video streams solely for the real-time duration required to transcribe the speech.",
            "Time-stamped verbatim text transcripts, speaker identifications, and dialogue turns.",
            "Derived meeting intelligence, including extracted commitments, action items, decision logs, and team velocity metrics.",
          ],
        },
        {
          title: "C. Calendar & Workspace Integration Data",
          paragraphs: [
            "To identify upcoming meetings and sync action items, we process authorized integration data:",
          ],
          listItems: [
            "Google Calendar and Microsoft Outlook event titles, scheduled times, attendee email lists, and conferencing links.",
            "OAuth tokens and API keys for issue trackers (Jira, Linear, Notion, GitHub, Asana) and messaging tools (Slack).",
          ],
        },
      ],
    },
  },
  {
    id: "3-how-we-use-your-information",
    title: "3. How We Use & Process Your Data",
    shortSummary: "Legal bases and functional objectives for extracting commitments and syncing workflows.",
    content: {
      paragraphs: [
        "We process your data exclusively to deliver, maintain, protect, and improve our meeting intelligence platform, based on explicit contractual necessity and legitimate business interests:",
      ],
      listItems: [
        "Transcribing spoken audio into high-accuracy, searchable text.",
        "Parsing commitments, assignees, deadlines, and technical dependencies using dedicated LLM extraction pipelines.",
        "Automatically creating or updating issues in connected trackers (Jira, Linear, Notion, GitHub, Asana) as requested by team members.",
        "Generating weekly manager digests, sprint velocity reports, and post-meeting follow-up emails.",
        "Detecting and preventing security incidents, unauthorized workspace access, and platform abuse.",
        "Providing dedicated customer support, uptime monitoring, and billing administration.",
      ],
    },
  },
  {
    id: "4-ai-pipeline-and-zero-training-policy",
    title: "4. AI Architecture & Zero Model Training Policy",
    shortSummary: "Architectural proof that your proprietary data is never fed into foundational LLMs.",
    content: {
      paragraphs: [
        "Rapto operates strict zero-data-retention (ZDR) agreements with all enterprise AI inference infrastructure providers.",
      ],
      subsections: [
        {
          title: "A. Zero Training Guarantee",
          paragraphs: [
            "Under no circumstances is any customer data—including raw audio, transcript snippets, custom prompts, code snippets, or team metadata—used to train, retrain, or fine-tune foundational AI models (such as OpenAI GPT, Anthropic Claude, or open-weight models).",
          ],
        },
        {
          title: "B. Ephemeral Inference Pipelines",
          paragraphs: [
            "When audio is transcribed or commitments are extracted, data is transmitted over TLS 1.3 encrypted connections directly into memory-isolated inference enclaves. Once the structured JSON response is returned to our database, the inference cache is immediately purged.",
          ],
        },
      ],
      callout: {
        type: "security",
        title: "Enterprise Data Isolation",
        message:
          "Enterprise tier customers can select dedicated single-tenant pipelines with regional data residency guarantees in the US, EU, or APAC regions.",
      },
    },
  },
  {
    id: "5-third-party-sub-processors",
    title: "5. Third-Party Sub-Processors",
    shortSummary: "Vetted infrastructure vendors and data processing terms.",
    content: {
      paragraphs: [
        "We partner with industry-leading infrastructure providers to deliver high-availability cloud services. All sub-processors undergo rigorous SOC 2 security evaluations and are bound by signed Data Processing Agreements (DPAs) with strict confidentiality clauses:",
      ],
      listItems: [
        "Amazon Web Services (AWS) — Cloud hosting, compute enclaves, encrypted database storage (US & EU regions).",
        "Google Cloud Platform (GCP) — Secondary cloud infrastructure and backup storage.",
        "OpenAI Enterprise API — Real-time LLM inference (governed by commercial Zero Data Retention DPAs).",
        "Stripe, Inc. — Payment processing and subscription billing (PCI-DSS Level 1 compliant).",
        "Postmark / Resend — Transactional email delivery and automated meeting digests.",
        "Datadog — Systems monitoring, aggregate performance metrics, and error telemetry (no audio/transcripts ingested).",
      ],
    },
  },
  {
    id: "6-data-retention-and-deletion",
    title: "6. Data Retention & Automated Deletion",
    shortSummary: "Retention schedules per plan tier and 1-click hard deletion options.",
    content: {
      paragraphs: [
        "We retain your data only for as long as necessary to fulfill the purposes outlined in this policy, or in accordance with your workspace configuration:",
      ],
      listItems: [
        "Free Plan: Audio and transcripts are retained for 7 calendar days before automated irreversible deletion.",
        "Starter Plan: Transcripts and commitment histories are retained for 90 calendar days.",
        "Growth Plan: Historical records are retained for 1 year.",
        "Business & Enterprise Plans: Retained for the lifetime of your active subscription, or customizable according to your organization's legal retention schedule.",
      ],
      subsections: [
        {
          title: "Hard Deletion on Demand",
          paragraphs: [
            "Workspace administrators can delete specific meetings, transcripts, or the entire organization's data at any time via the Workspace Settings dashboard. Upon deletion, all associated records, vector embeddings, and backups are permanently purged within 30 days.",
          ],
        },
      ],
    },
  },
  {
    id: "7-security-and-governance",
    title: "7. Security Safeguards & Governance",
    shortSummary: "SOC 2 Type II controls, cryptographic encryption, and identity federation.",
    content: {
      paragraphs: [
        "We maintain comprehensive administrative, technical, and physical safeguards designed to prevent accidental loss, unauthorized access, alteration, or disclosure of customer data:",
      ],
      listItems: [
        "Encryption in Transit: All data transferred between users, bots, and our servers utilizes TLS 1.3 encryption with Perfect Forward Secrecy.",
        "Encryption at Rest: All persistent databases, transcript records, and vector indices are encrypted using AES-256 with rotating keys via AWS KMS.",
        "Identity & Access Control: Role-based access controls (RBAC), multi-factor authentication (MFA) enforcement, SAML 2.0 / Okta SSO, and SCIM automated deprovisioning.",
        "Vulnerability Management: Continuous automated vulnerability scanning, independent annual penetration testing, and a responsible bug bounty program.",
      ],
    },
  },
  {
    id: "8-your-global-privacy-rights",
    title: "8. Your Global Privacy Rights (GDPR & CCPA/CPRA)",
    shortSummary: "How to exercise your rights to access, portability, rectification, and erasure.",
    content: {
      paragraphs: [
        "Regardless of your location, Rapto affords all customers robust privacy controls. Under the European General Data Protection Regulation (GDPR), UK GDPR, and California Consumer Privacy Act (CCPA/CPRA), you have the right to:",
      ],
      listItems: [
        "Right of Access: Request a copy of all personal data and transcripts stored in your account.",
        "Right to Portability: Export your meeting logs, decisions, and commitment graphs in structured JSON or CSV formats.",
        "Right to Rectification: Correct inaccurate or outdated profile and workspace records.",
        "Right to Erasure ('Right to be Forgotten'): Request the permanent destruction of your personal data.",
        "Right to Restrict or Object to Processing: Restrict certain automation workflows or opt out of non-essential communications.",
        "Non-Discrimination: We will never deny services, charge different prices, or degrade service quality for exercising your privacy rights.",
      ],
      subsections: [
        {
          title: "How to Exercise Your Rights",
          paragraphs: [
            `To submit a verifiable data privacy request, email our Data Protection Officer at ${PRIVACY_METADATA.dpoEmail}. We acknowledge all requests within 48 hours and fulfill them within 30 calendar days at no charge.`,
          ],
        },
      ],
    },
  },
  {
    id: "9-international-data-transfers",
    title: "9. International Data Transfers",
    shortSummary: "Cross-border data protection mechanisms and Standard Contractual Clauses.",
    content: {
      paragraphs: [
        "Rapto operates globally. When personal data originating in the European Economic Area (EEA), United Kingdom, or Switzerland is transferred outside these regions, we ensure appropriate safeguards are implemented in compliance with Chapter V of the GDPR.",
        "We execute the European Commission's standard contractual clauses (SCCs) with our sub-processors and enterprise customers, supplemented by technical measures including robust end-to-end encryption.",
      ],
    },
  },
  {
    id: "10-cookies-and-tracking",
    title: "10. Cookies & Tracking Technologies",
    shortSummary: "How we use essential session tokens and performance measurement cookies.",
    content: {
      paragraphs: [
        "We use cookies and similar browser storage mechanisms solely to authenticate sessions, remember preferences, and analyze aggregate platform health:",
      ],
      listItems: [
        "Essential Cookies: Required for secure login authentication, CSRF token validation, and workspace routing. These cannot be disabled.",
        "Functional Cookies: Remember UI preferences (such as dark mode, sidebar states, and currency selections).",
        "Analytics Cookies: Measure aggregate page load speeds and feature utilization to optimize performance (only set with your explicit consent).",
      ],
    },
  },
  {
    id: "11-changes-and-dpo-contact",
    title: "11. Policy Updates & Contacting Us",
    shortSummary: "Notification procedures for material updates and direct DPO contact channels.",
    content: {
      paragraphs: [
        "We may update this Privacy Policy periodically to reflect new platform capabilities, legal requirements, or security enhancements. When material updates occur, we will notify workspace administrators via email and display a prominent banner in the platform at least 30 days prior to changes taking effect.",
        `If you have questions, feedback, or compliance inquiries regarding our privacy architecture, please reach out directly:`,
      ],
      subsections: [
        {
          title: "Contact Details",
          listItems: [
            `Data Protection Officer (DPO): ${PRIVACY_METADATA.dpoEmail}`,
            `Security & Compliance Team: ${PRIVACY_METADATA.securityEmail}`,
            `Mailing Address: ${PRIVACY_METADATA.companyName}, ${PRIVACY_METADATA.companyAddress}`,
          ],
        },
      ],
    },
  },
];
