export interface TermsSection {
  id: string;
  category: string;
  title: string;
  shortSummary: string;
  plainEnglishSummary: string[];
  content: {
    paragraphs?: string[];
    subsections?: {
      title: string;
      paragraphs?: string[];
      listItems?: string[];
    }[];
    listItems?: string[];
    callout?: {
      type: "highlight" | "security" | "legal" | "warning";
      title: string;
      message: string;
    };
  };
}

export interface TermsFAQ {
  question: string;
  answer: string;
}

export const TERMS_METADATA = {
  effectiveDate: "August 26, 2026",
  lastUpdated: "August 26, 2026",
  version: "2.4",
  legalEmail: "legal@rapto.cloud",
  supportEmail: "support@rapto.cloud",
  billingEmail: "billing@rapto.cloud",
  dpoEmail: "privacy@rapto.cloud",
  companyName: "Rapto Technologies, Inc.",
  companyAddress: "548 Market St, Suite 39201, San Francisco, CA 94104",
  jurisdiction: "State of California, United States",
  slaUptime: "99.9%",
};

export const TERMS_HIGHLIGHTS = [
  {
    icon: "Database",
    title: "You Own Your Data & IP",
    description:
      "You retain 100% intellectual property ownership of all your meeting recordings, audio, transcripts, action items, and team summaries.",
    badge: "100% Customer Ownership",
  },
  {
    icon: "ShieldCheck",
    title: "Zero AI Model Training",
    description:
      "We strictly NEVER use your customer meeting audio, transcripts, or proprietary code to train public or foundational AI models.",
    badge: "Binding Guarantee",
  },
  {
    icon: "Zap",
    title: "1-Click Cancellation",
    description:
      "Cancel your subscription anytime with zero hidden lock-ins or cancellation fees directly from your workspace billing dashboard.",
    badge: "No Lock-in",
  },
  {
    icon: "CheckCircle2",
    title: "99.9% Uptime & Security",
    description:
      "Backed by SOC 2 Type II controls, AES-256 encryption at rest, TLS 1.3 in transit, and commercial SLAs for business tiers.",
    badge: "Enterprise SLA",
  },
];

export const TERMS_FAQS: TermsFAQ[] = [
  {
    question: "Can I cancel my paid subscription at any time?",
    answer:
      "Yes. You can cancel your subscription at any time with a single click in your Workspace Settings > Billing. Your access will continue through the end of your current paid billing period, and you will not be billed again.",
  },
  {
    question: "Do you use our meeting recordings or transcripts to train AI models?",
    answer:
      "No. We have zero-data-retention (ZDR) and no-training agreements with all AI inference infrastructure providers. Your proprietary audio, transcripts, notes, and commitments are never used to train or tune LLMs.",
  },
  {
    question: "How does Rapto comply with meeting recording and consent laws?",
    answer:
      "Rapto provides customizable recording announcements, visible meeting bot indicators, and automated pre-call consent notifications. You are responsible for ensuring that all meeting participants have consented to recording in accordance with applicable local wiretapping and consent laws.",
  },
  {
    question: "What happens to our workspace data if we terminate our account?",
    answer:
      "Upon account termination, you have 30 calendar days to export all transcripts, summaries, and action item graphs in JSON/CSV format. After 30 days, all data, vector embeddings, and backups are permanently and irreversibly purged from our active databases.",
  },
  {
    question: "Can we execute a custom Master Services Agreement (MSA) or DPA?",
    answer:
      "Yes. For Business and Enterprise plan customers, we offer negotiated enterprise MSAs, customized Data Processing Agreements (DPAs) with Standard Contractual Clauses (SCCs), custom BAAs for HIPAA compliance, and custom payment terms via invoicing.",
  },
];

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "1-acceptance-and-eligibility",
    category: "Getting Started",
    title: "1. Acceptance of Terms & Eligibility",
    shortSummary: "How this binding agreement is formed, user eligibility, and corporate authorization.",
    plainEnglishSummary: [
      "By signing up, installing our bots, or using Rapto, you agree to these legal terms.",
      "You must be at least 18 years old and authorized to bind your company or organization.",
      "If you do not agree with any part of these terms, you must not use Rapto.",
    ],
    content: {
      paragraphs: [
        `These Terms of Service ("Terms") constitute a legally binding agreement between you (individually or on behalf of the entity you represent, "Customer", "you", or "your") and ${TERMS_METADATA.companyName} ("Rapto", "we", "us", or "our"), governing your access to and use of the Rapto meeting intelligence platform, website (rapto.cloud), desktop applications, browser extensions, APIs, and integrations (collectively, the "Services").`,
        "By clicking 'Sign Up', 'Start Free Trial', creating an account, or otherwise accessing or using our Services, you expressly acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.",
      ],
      subsections: [
        {
          title: "A. Corporate Authority & Representatives",
          paragraphs: [
            "If you are registering for or accessing the Services on behalf of an enterprise, company, partnership, or other legal entity, you represent and warrant that you possess full legal power and authority to bind that entity to these Terms. In such cases, 'Customer', 'you', and 'your' refers directly to that organization.",
          ],
        },
        {
          title: "B. Minimum Age Requirement",
          paragraphs: [
            "The Services are designed exclusively for business and professional use. You must be at least eighteen (18) years of age (or the age of legal majority in your jurisdiction) to create an account or use the Services.",
          ],
        },
      ],
      callout: {
        type: "highlight",
        title: "Enterprise Master Services Agreements (MSAs)",
        message:
          "If you have executed a separate, signed Master Services Agreement (MSA) or Order Form with Rapto, the terms of that signed agreement will supersede these online Terms of Service in the event of any direct conflict.",
      },
    },
  },
  {
    id: "2-accounts-and-workspace-administration",
    category: "Getting Started",
    title: "2. Account Registration & Workspace Security",
    shortSummary: "Account security, credential protection, workspace administrator roles, and team invites.",
    plainEnglishSummary: [
      "Keep your login credentials secure and enable Multi-Factor Authentication (MFA).",
      "Workspace Administrators control user access, billing, data export, and third-party integrations.",
      "You are responsible for all actions taken under your workspace accounts.",
    ],
    content: {
      paragraphs: [
        "To utilize the Services, you must register for an account by providing accurate, current, and complete corporate registration information. You agree to maintain and promptly update your account details to keep them accurate and complete.",
      ],
      subsections: [
        {
          title: "A. Credential Safeguards & Multi-Factor Authentication",
          paragraphs: [
            "You are strictly responsible for maintaining the confidentiality of your workspace login credentials, API keys, and OAuth integration tokens. We strongly encourage or enforce the activation of Multi-Factor Authentication (MFA) or SAML 2.0 Single Sign-On (SSO). You must immediately notify Rapto at security@rapto.cloud of any known or suspected unauthorized access.",
          ],
        },
        {
          title: "B. Administrator Powers & Team Permissions",
          paragraphs: [
            "Workspaces are managed by designated Administrators who have the authority to invite members, assign roles, configure automated recording rules, enable integrations (such as Linear, Jira, Slack), manage billing, and initiate workspace deletion or data export requests.",
          ],
        },
      ],
    },
  },
  {
    id: "3-subscriptions-billing-and-refunds",
    category: "Commercial Terms",
    title: "3. Subscriptions, Fees, Billing & Refunds",
    shortSummary: "Clear pricing, automated billing cycles, prorated upgrades, self-serve cancellation, and refund terms.",
    plainEnglishSummary: [
      "Paid plans are billed in advance on a recurring monthly or annual basis via Stripe.",
      "You can upgrade, downgrade, or cancel anytime directly in your billing settings.",
      "Annual plans include a 14-day money-back guarantee if you are unsatisfied.",
      "No hidden fees, surprise overages, or penalty charges.",
    ],
    content: {
      paragraphs: [
        "Rapto offers free tiers, promotional trials, and paid subscription plans (including Starter, Growth, Business, and Enterprise). By selecting a paid subscription, you agree to pay all applicable subscription fees in accordance with the billing terms presented at checkout or in your applicable Order Form.",
      ],
      subsections: [
        {
          title: "A. Recurring Billing & Payment Methods",
          paragraphs: [
            "Subscription fees are billed in advance on a recurring monthly or annual cycle. You authorize Rapto (and our PCI-DSS Level 1 payment processor, Stripe, Inc.) to automatically charge your designated payment method at the beginning of each billing period until you cancel.",
          ],
        },
        {
          title: "B. Upgrades, Downgrades & Proration",
          paragraphs: [
            "If you upgrade your subscription tier or add seats during a billing cycle, charges will be calculated on a prorated basis for the remainder of the current billing cycle. Downgrades take effect at the start of the next billing cycle.",
          ],
        },
        {
          title: "C. 14-Day Refund Guarantee & Cancellation",
          paragraphs: [
            "You may cancel your subscription at any time via your Workspace Settings. For annual subscriptions, we offer a hassle-free, full refund if you request cancellation within fourteen (14) days of your initial purchase or annual renewal by emailing billing@rapto.cloud. Monthly subscriptions are non-refundable for partial months once billed, but cancellation prevents any subsequent billing.",
          ],
          listItems: [
            "No cancellation fees or minimum commitment terms on standard monthly plans.",
            "Full data export capabilities remain active through the end of your prepaid billing term.",
            "Taxes and VAT are calculated and charged based on your organization's legal jurisdiction.",
          ],
        },
      ],
      callout: {
        type: "highlight",
        title: "Transparent Pricing Promise",
        message:
          "We will never increase your subscription pricing during an active billing term. Any future price changes require a minimum of 30 days advance written notice with full rights to cancel penalty-free.",
      },
    },
  },
  {
    id: "4-intellectual-property-and-data-ownership",
    category: "Data & IP",
    title: "4. Intellectual Property & Customer Data Ownership",
    shortSummary: "You own all your recordings and transcripts. We own our software. Zero AI training guarantee.",
    plainEnglishSummary: [
      "You retain 100% ownership of your audio, transcripts, action items, and team notes.",
      "Rapto only processes your data to provide meeting intelligence and workflow sync.",
      "We strictly do NOT use your data to train foundational or public AI models.",
      "Rapto owns its platform, algorithms, design, code, and documentation.",
    ],
    content: {
      paragraphs: [
        "We believe in unequivocal customer data sovereignty. Your intellectual property, proprietary business discussions, engineering syncs, and trade secrets belong strictly to you.",
      ],
      subsections: [
        {
          title: "A. Customer Data Ownership",
          paragraphs: [
            `As between you and Rapto, you retain sole and exclusive ownership of, and all intellectual property rights in, all meeting audio, video streams, transcripts, notes, custom prompts, commitment graphs, and integration payloads submitted to or generated within your workspace ("Customer Data").`,
          ],
        },
        {
          title: "B. Limited Processing License",
          paragraphs: [
            "You grant Rapto a limited, worldwide, non-exclusive, royalty-free license to host, copy, process, and transmit Customer Data solely to the extent necessary to deliver, maintain, secure, and support the Services in accordance with your instructions and your configured integrations.",
          ],
        },
        {
          title: "C. Zero AI Model Training Guarantee",
          paragraphs: [
            "Rapto covenants and agrees that Customer Data will NEVER be used to train, retrain, fine-tune, or calibrate public or foundational Large Language Models (LLMs) or commercial speech-to-text models. All inference pipelines operate under strict Zero Data Retention (ZDR) commercial parameters.",
          ],
        },
        {
          title: "D. Rapto Intellectual Property",
          paragraphs: [
            "Rapto retains all right, title, and interest (including all patent, copyright, trademark, and trade secret rights) in and to the Services, platform software, bot architectures, UI components, documentation, and all improvements or derivative works thereof.",
          ],
        },
      ],
      callout: {
        type: "security",
        title: "Zero Model Training Guarantee",
        message:
          "We contractually enforce zero-retention parameters across OpenAI, Anthropic, and AWS cloud inference endpoints. Your company data remains isolated and ephemeral in memory during real-time transcription.",
      },
    },
  },
  {
    id: "5-acceptable-use-and-recording-compliance",
    category: "Acceptable Use",
    title: "5. Acceptable Use & Recording Consent Compliance",
    shortSummary: "Compliance with call recording consent laws, anti-abuse rules, and prohibited activities.",
    plainEnglishSummary: [
      "You are responsible for notifying participants and getting consent before recording calls.",
      "Do not use Rapto for unlawful surveillance, harassment, malware distribution, or reverse engineering.",
      "Do not attempt to scrape, probe, or breach our security architecture.",
    ],
    content: {
      paragraphs: [
        "You agree to use the Services in full compliance with all applicable local, state, national, and international laws, regulations, and industry standards.",
      ],
      subsections: [
        {
          title: "A. Recording Consent & Two-Party Notification Laws",
          paragraphs: [
            "Various jurisdictions (including California, Illinois, Massachusetts, Germany, and the UK) enforce 'all-party' or 'two-party' wiretapping and recording consent laws. You represent and warrant that you will obtain all legally required consents, permissions, and notices from all meeting participants before initiating any recording or automated AI note-taking session.",
          ],
          listItems: [
            "Rapto provides customizable automated audio and chat announcements informing attendees of AI recording.",
            "You agree not to disable or obscure automated recording indicators where required by law.",
            "You agree to indemnify Rapto against any third-party claims arising from your failure to obtain required recording consent.",
          ],
        },
        {
          title: "B. Prohibited Activities",
          paragraphs: ["You agree not to engage in any of the following prohibited behaviors:"],
          listItems: [
            "Reverse engineer, decompile, disassemble, or derive the source code of the Services.",
            "Circumvent, bypass, or probe security controls, rate limits, or authentication mechanisms.",
            "Upload malware, viruses, malicious scripts, or unlawful/infringing content.",
            "Use the Services to develop a directly competing AI meeting intelligence product.",
            "Resell, sub-license, rent, or lease the Services to third parties without prior written authorization.",
          ],
        },
      ],
    },
  },
  {
    id: "6-ai-features-and-output-accuracy",
    category: "AI Technology",
    title: "6. AI Meeting Intelligence & Output Verification",
    shortSummary: "How AI commitment extraction works, verification of tasks, and accuracy disclosures.",
    plainEnglishSummary: [
      "Rapto uses state-of-the-art AI to extract action items, assignees, deadlines, and decisions.",
      "AI outputs can occasionally make mistakes—always review critical tasks before executing in Linear/Jira.",
      "You maintain final editorial control over any synced tasks or automations.",
    ],
    content: {
      paragraphs: [
        "Rapto utilizes advanced artificial intelligence models to transcribe spoken dialogue, identify speakers, detect commitments, and summarize meetings. While we pride ourselves on industry-leading transcription accuracy, artificial intelligence systems are probabilistic and not infallible.",
      ],
      subsections: [
        {
          title: "A. Customer Verification of AI Outputs",
          paragraphs: [
            "You acknowledge that summaries, extracted deadlines, action items, and task assignments generated by the Services ('Outputs') should be reviewed by human team members prior to taking critical business, financial, or engineering actions.",
          ],
        },
        {
          title: "B. Autonomous Task Syncing Controls",
          paragraphs: [
            "Rapto offers both 'Review Before Sync' and 'Automated Direct Sync' modes for ticketing integrations (such as Linear, Jira, GitHub Issues). You retain full granular control over whether action items require manual approval before tickets are created or modified.",
          ],
        },
      ],
    },
  },
  {
    id: "7-third-party-integrations",
    category: "Integrations",
    title: "7. Third-Party Platforms & Integrations",
    shortSummary: "Connecting Zoom, Meet, Teams, Linear, Jira, Slack, Notion, and associated API terms.",
    plainEnglishSummary: [
      "You can connect third-party apps (Zoom, Google Meet, Teams, Slack, Linear, Jira).",
      "We only access the permissions you explicitly grant during OAuth authorization.",
      "Third-party tools are subject to their own respective terms and privacy policies.",
    ],
    content: {
      paragraphs: [
        "The Services allow you to connect third-party video conferencing providers (Zoom, Google Meet, Microsoft Teams) and productivity platforms (Linear, Jira, Slack, Notion, GitHub, Asana).",
      ],
      subsections: [
        {
          title: "A. OAuth Authorizations & Scopes",
          paragraphs: [
            "When you enable an integration, you authorize Rapto to interact with that third-party service on your behalf using the minimum necessary OAuth scopes. You can revoke integration permissions at any time via your workspace settings or directly from the third-party application dashboard.",
          ],
        },
        {
          title: "B. Third-Party Service Availability",
          paragraphs: [
            "Rapto is not responsible for the availability, uptime, pricing changes, or policies of third-party platforms. Your use of third-party services remains subject to their independent terms and privacy agreements.",
          ],
        },
      ],
    },
  },
  {
    id: "8-service-availability-and-sla",
    category: "Service Levels",
    title: "8. Service Level Agreement (SLA) & Uptime",
    shortSummary: "99.9% uptime target, maintenance windows, performance commitments, and status monitoring.",
    plainEnglishSummary: [
      "We target 99.9% uptime for all paid workspace tiers.",
      "Live platform status and incident logs are publicly visible at status.rapto.cloud.",
      "Scheduled maintenance is performed during off-peak hours with advance notice.",
    ],
    content: {
      paragraphs: [
        `Rapto strives to maintain high availability and reliability. For paid subscription tiers (Growth, Business, Enterprise), we target an uptime availability of ninety-nine and nine-tenths percent (${TERMS_METADATA.slaUptime}) during each calendar month.`,
      ],
      listItems: [
        "Live System Health: Real-time service status, API latencies, and incident history are transparently tracked at status.rapto.cloud.",
        "Scheduled Maintenance: We perform routine infrastructure upgrades during off-peak weekend windows and provide advance notice in the dashboard.",
        "Emergency Maintenance: In rare cases of critical security patches, emergency maintenance may be performed with immediate notification.",
      ],
    },
  },
  {
    id: "9-termination-and-data-export",
    category: "Lifecycle",
    title: "9. Term, Termination & Post-Termination Data Retention",
    shortSummary: "How accounts end, 1-click cancellation, 30-day export window, and hard data purging.",
    plainEnglishSummary: [
      "You can terminate your account anytime in 1 click from your workspace settings.",
      "You have 30 days to export all your transcripts and meeting data.",
      "After 30 days, your data is permanently and irreversibly purged from our servers.",
      "We may suspend accounts that violate acceptable use or fail to pay past-due invoices.",
    ],
    content: {
      paragraphs: [
        "These Terms remain in effect until terminated by either you or Rapto in accordance with this Section.",
      ],
      subsections: [
        {
          title: "A. Termination by Customer",
          paragraphs: [
            "You may terminate your account and subscription at any time directly through your Workspace Settings > Billing or by contacting support@rapto.cloud.",
          ],
        },
        {
          title: "B. Termination for Cause by Rapto",
          paragraphs: [
            "We may immediately suspend or terminate your access if: (i) you materially breach these Terms or our Acceptable Use Policy; (ii) your account is more than 30 days delinquent on unpaid invoices; or (iii) we are required to do so by applicable law or regulatory authority.",
          ],
        },
        {
          title: "C. 30-Day Data Export Grace Period & Permanent Deletion",
          paragraphs: [
            "Upon termination, your account will enter a 30-day grace period during which Workspace Administrators may export all transcripts, summaries, and action item graphs. Following the 30-day period, all Customer Data, vector embeddings, and backups will be permanently and irreversibly deleted from our active production systems.",
          ],
        },
      ],
    },
  },
  {
    id: "10-confidentiality-and-security",
    category: "Security",
    title: "10. Confidentiality & Security Standards",
    shortSummary: "Mutual confidentiality obligations, AES-256 encryption, SOC 2 controls, and data protection.",
    plainEnglishSummary: [
      "Both parties agree to protect each other's confidential information.",
      "Rapto maintains SOC 2 Type II controls and AES-256 encryption at rest.",
      "We will notify you within 48 hours in the unlikely event of a confirmed security incident.",
    ],
    content: {
      paragraphs: [
        "Each party agrees that all code, customer transcripts, business plans, technical architecture, and financial information disclosed by one party ('Disclosing Party') to the other ('Receiving Party') constitute confidential information.",
      ],
      subsections: [
        {
          title: "A. Protection Obligations",
          paragraphs: [
            "The Receiving Party will protect the Disclosing Party's Confidential Information with the same degree of care it uses for its own confidential materials (and not less than reasonable care), and will not disclose it to third parties except as authorized under these Terms.",
          ],
        },
        {
          title: "B. Technical & Organizational Security Safeguards",
          paragraphs: [
            "Rapto maintains comprehensive administrative, technical, and physical safeguards designed to ensure the security, confidentiality, and integrity of Customer Data, including SOC 2 Type II compliance, AES-256 encryption at rest, TLS 1.3 encryption in transit, and continuous vulnerability scanning.",
          ],
        },
      ],
    },
  },
  {
    id: "11-disclaimers-and-warranties",
    category: "Legal Protections",
    title: "11. Warranties & Disclaimers",
    shortSummary: "Standard commercial software warranty disclaimers and statutory limitations.",
    plainEnglishSummary: [
      "We warrant that Rapto will operate in material accordance with our official documentation.",
      "Except as explicitly stated, services are provided 'as is' without implied warranties.",
    ],
    content: {
      paragraphs: [
        `Rapto warrants that the Services will perform materially in accordance with applicable documentation under normal use. Except as expressly provided herein, the Services, AI outputs, and documentation are provided "AS IS" and "AS AVAILABLE".`,
        "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, RAPTO AND ITS AFFILIATES, LICENSORS, AND SUPPLIERS DISCLAIM ALL OTHER WARRANTIES, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.",
      ],
    },
  },
  {
    id: "12-limitation-of-liability-and-indemnity",
    category: "Legal Protections",
    title: "12. Limitation of Liability & Indemnification",
    shortSummary: "Balanced liability caps, exclusion of indirect damages, and mutual IP indemnification.",
    plainEnglishSummary: [
      "Liability is capped at the total amount you paid to Rapto in the preceding 12 months.",
      "Neither party is liable for indirect or consequential damages (such as lost profits).",
      "We indemnify you if our software infringes a third party's valid patent or copyright.",
    ],
    content: {
      paragraphs: [
        "To provide our high-speed AI meeting intelligence at accessible subscription rates, both parties agree to standard, balanced limitations of liability.",
      ],
      subsections: [
        {
          title: "A. Exclusion of Consequential Damages",
          paragraphs: [
            "NEITHER PARTY NOR ITS AFFILIATES OR SUPPLIERS SHALL BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, COVER, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS REPUTATION), REGARDLESS OF THE THEORY OF LIABILITY.",
          ],
        },
        {
          title: "B. Liability Cap",
          paragraphs: [
            "EXCEPT FOR WILLFUL MISCONDUCT OR INDEMNIFICATION OBLIGATIONS, EACH PARTY'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID BY CUSTOMER TO RAPTO IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.",
          ],
        },
        {
          title: "C. Rapto Intellectual Property Indemnification",
          paragraphs: [
            "Rapto will defend and indemnify Customer against third-party legal claims alleging that Customer's authorized use of the Services directly infringes any valid United States patent, copyright, or trademark, subject to prompt written notice and control of defense.",
          ],
        },
      ],
    },
  },
  {
    id: "13-dispute-resolution-and-governing-law",
    category: "Legal Protections",
    title: "13. Dispute Resolution, Arbitration & Governing Law",
    shortSummary: "30-day informal resolution, AAA binding arbitration, California jurisdiction, and class waiver.",
    plainEnglishSummary: [
      "If a dispute arises, we commit to a 30-day informal good-faith negotiation first.",
      "Unresolved claims are settled via confidential binding arbitration under AAA rules in San Francisco, CA.",
      "Governed by the laws of the State of California, United States.",
      "You can opt out of arbitration within 30 days of opening your account.",
    ],
    content: {
      paragraphs: [
        "We strive to resolve customer concerns quickly and informally. If any dispute arises out of or relating to these Terms, the parties agree to engage in good-faith informal negotiations for at least thirty (30) days by emailing legal@rapto.cloud.",
      ],
      subsections: [
        {
          title: "A. Binding Arbitration & AAA Rules",
          paragraphs: [
            "If the dispute is not resolved within 30 days, any claim will be settled by confidential, binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules, held in San Francisco, California (or virtually by mutual consent).",
          ],
        },
        {
          title: "B. Class Action Waiver",
          paragraphs: [
            "YOU AND RAPTO AGREE THAT ALL DISPUTES MUST BE RESOLVED ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, OR REPRESENTATIVE PROCEEDING.",
          ],
        },
        {
          title: "C. 30-Day Arbitration Opt-Out",
          paragraphs: [
            `You have the right to opt out of binding arbitration by sending written notice to ${TERMS_METADATA.legalEmail} within thirty (30) days of first accepting these Terms, specifying your name, workspace domain, and clear statement of opt-out.`,
          ],
        },
      ],
    },
  },
  {
    id: "14-general-provisions-and-contact",
    category: "General",
    title: "14. General Provisions & Legal Contact",
    shortSummary: "Entire agreement, severability, assignment rules, updates to terms, and official legal contact.",
    plainEnglishSummary: [
      "These terms represent the full agreement between you and Rapto.",
      "We will notify you at least 30 days in advance of any material changes to these terms.",
      "Contact our legal team at legal@rapto.cloud with any questions.",
    ],
    content: {
      paragraphs: [
        "These Terms, together with the Privacy Policy, DPA (if applicable), and any executed Order Forms, constitute the entire agreement between the parties regarding the subject matter hereof and supersede all prior agreements or understandings.",
      ],
      subsections: [
        {
          title: "A. Updates to Terms",
          paragraphs: [
            "We may modify these Terms periodically. If we make material modifications, we will provide at least thirty (30) days advance notice via email to your registered workspace administrator and by posting a notice in the platform. Continued use of the Services after the effective date constitutes acceptance.",
          ],
        },
        {
          title: "B. Legal & Compliance Contact",
          listItems: [
            `Legal & Compliance Inquiries: ${TERMS_METADATA.legalEmail}`,
            `Billing & Subscription Support: ${TERMS_METADATA.billingEmail}`,
            `Data Protection Officer (DPO): ${TERMS_METADATA.dpoEmail}`,
            `Mailing Address: ${TERMS_METADATA.companyName}, ${TERMS_METADATA.companyAddress}`,
          ],
        },
      ],
    },
  },
];
