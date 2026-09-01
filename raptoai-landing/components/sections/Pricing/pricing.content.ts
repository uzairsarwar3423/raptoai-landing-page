export interface PlanFeature {
  text: string;
  isHighlight?: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: "free" | "starter" | "growth" | "business";
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  teamMembers: string;
  maxMembers: number;
  meetingsLimit: string;
  maxMeetings: number;
  meetingsSubtext: string;
  historyRetention: string;
  isPopular?: boolean;
  ctaText: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary" | "ghost";
  features: PlanFeature[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For small teams testing core AI meeting extraction workflows and individual trial validation.",
    monthlyPrice: 0,
    annualPrice: 0,
    teamMembers: "Up to 3 members",
    maxMembers: 3,
    meetingsLimit: "5 meetings / mo",
    maxMeetings: 5,
    meetingsSubtext: "Trial validation limit",
    historyRetention: "7-day retention",
    ctaText: "Get started for free",
    ctaHref: "https://app.rapto.cloud/register",
    ctaVariant: "secondary",
    features: [
      { text: "Auto-joins Zoom, Google Meet & Microsoft Teams" },
      { text: "Core AI commitment & action item extraction" },
      { text: "Slack integration (single workspace channel)" },
      { text: "Google & Microsoft Calendar auto-detection" },
      { text: "Searchable transcript viewer (7-day history)" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Optimized for early-stage startups and small engineering squads (3–10 members).",
    monthlyPrice: 49,
    annualPrice: 39,
    teamMembers: "Up to 10 members",
    maxMembers: 10,
    meetingsLimit: "40 meetings / mo",
    maxMeetings: 40,
    meetingsSubtext: "~2 meetings / work day",
    historyRetention: "90-day retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=starter",
    ctaVariant: "secondary",
    features: [
      { text: "Everything in Free, plus:" },
      { text: "Bi-directional Jira, Linear, Notion & Slack sync", isHighlight: true },
      { text: "Automated Slack DMs & Email commitment nudges" },
      { text: "Post-meeting AI email & digest generator" },
      { text: "Commitment completion rate tracking dashboard" },
      { text: "Priority Email Support (48-hour SLA)" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    tagline: "Engineered for fast-growing product and engineering teams (10–25 members).",
    monthlyPrice: 99,
    annualPrice: 79,
    isPopular: true,
    teamMembers: "Up to 25 members",
    maxMembers: 25,
    meetingsLimit: "120 meetings / mo",
    maxMeetings: 120,
    meetingsSubtext: "~6 meetings / work day",
    historyRetention: "1-year retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=growth",
    ctaVariant: "primary",
    features: [
      { text: "Everything in Starter, plus:" },
      { text: "Interactive team health & velocity trends", isHighlight: true },
      { text: "Weekly Sunday manager summary digest", isHighlight: true },
      { text: "GitHub & Asana bi-directional integration" },
      { text: "Standup, 1:1 & sprint review AI classification models" },
      { text: "Full CSV & JSON data export for internal reporting" },
      { text: "Priority Support (24-hour response via Email & Slack)" },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Built for scaling organizations and multi-team engineering departments (25–60 members).",
    monthlyPrice: 199,
    annualPrice: 159,
    teamMembers: "Up to 60 members",
    maxMembers: 60,
    meetingsLimit: "300 meetings / mo",
    maxMeetings: 300,
    meetingsSubtext: "~15 meetings / work day",
    historyRetention: "Unlimited retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=business",
    ctaVariant: "secondary",
    features: [
      { text: "Everything in Growth, plus:" },
      { text: "Up to 5 distinct team workspaces under 1 billing account", isHighlight: true },
      { text: "Full REST API access & Webhook subscriptions" },
      { text: "Detailed audit logs & compliance access tracking" },
      { text: "Custom AI commitment category tagging & prompt tuning" },
      { text: "Dedicated Slack support channel + quarterly QBR calls" },
    ],
  },
];

export const ENTERPRISE_PLAN = {
  name: "Enterprise",
  badge: "Security & Scale",
  price: "Custom",
  startingPrice: "Starting at $500/mo (Annual Only)",
  tagline: "Designed for security-conscious, enterprise-scale organizations (60+ members).",
  ctaText: "Contact Enterprise Sales",
  ctaHref: "mailto:sales@rapto.cloud?subject=Enterprise%20Plan%20Inquiry%20-%20Rapto",
  highlights: [
    "Unlimited team members, meetings & workspaces",
    "SAML 2.0, Okta, Azure AD & Google Workspace SSO + SCIM auto-provisioning",
    "SOC 2 Type II compliance reports, custom GDPR DPA & HIPAA compliance options",
    "Dedicated high-throughput processing pipeline & zero data retention for LLM training",
    "99.9% Uptime SLA & 4-hour emergency response SLA",
    "Dedicated Technical Account Manager (TAM) & custom onboarding",
  ],
};

export interface MatrixRow {
  feature: string;
  tooltip?: string;
  free: string | boolean;
  starter: string | boolean;
  growth: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export interface MatrixCategory {
  category: string;
  rows: MatrixRow[];
}

export const FEATURE_MATRIX_CATEGORIES: MatrixCategory[] = [
  {
    category: "Capacity & Workspaces",
    rows: [
      {
        feature: "Max Team Members",
        tooltip: "Flat team tier limit. No per-seat line items or incremental fees.",
        free: "Up to 3",
        starter: "Up to 10",
        growth: "Up to 25",
        business: "Up to 60",
        enterprise: "Unlimited",
      },
      {
        feature: "Monthly Meetings Processed",
        tooltip: "Total meetings transcribed, extracted, and indexed per calendar month.",
        free: "5 / mo",
        starter: "40 / mo",
        growth: "120 / mo",
        business: "300 / mo",
        enterprise: "Unlimited",
      },
      {
        feature: "Transcript & Commitment Retention",
        tooltip: "How long search indexing, transcripts, and commitments remain accessible.",
        free: "7 Days",
        starter: "90 Days",
        growth: "1 Year",
        business: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        feature: "Distinct Workspaces Included",
        tooltip: "Separate squads or business units managed under a single centralized billing account.",
        free: "1",
        starter: "1",
        growth: "1",
        business: "Up to 5",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "AI Extraction & Meeting Intelligence",
    rows: [
      {
        feature: "Zoom, Google Meet & Teams Auto-Bot",
        tooltip: "Zero-latency recording bot that auto-joins calendar-scheduled meetings.",
        free: true,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "Automatic Commitment & Action Item Extraction",
        tooltip: "LLM pipeline parses who promised what, deadlines, and dependencies.",
        free: "Basic",
        starter: "Full AI Engine",
        growth: "Full AI Engine",
        business: "Full AI Engine",
        enterprise: "Custom High-Throughput",
      },
      {
        feature: "Multi-Meeting Type Classification",
        tooltip: "Tailored extraction models for standups, sprint retros, 1:1s, and architecture reviews.",
        free: false,
        starter: false,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "Custom AI Commitment Rules & Prompt Tuning",
        tooltip: "Define custom tags, domain-specific acronyms, and priority heuristics.",
        free: false,
        starter: false,
        growth: false,
        business: true,
        enterprise: true,
      },
      {
        feature: "Automated Post-Meeting Follow-Up Drafts",
        tooltip: "Generates tailored Slack messages and email drafts ready for 1-click dispatch.",
        free: false,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Integrations & Automation",
    rows: [
      {
        feature: "Slack Bi-Directional Integration",
        tooltip: "Real-time sync to public channels, private channels, and personal DMs.",
        free: "Basic (1 channel)",
        starter: "Full Workspace",
        growth: "Full Workspace",
        business: "Full Workspace",
        enterprise: "Multi-Workspace",
      },
      {
        feature: "Jira, Linear & Notion Task Sync",
        tooltip: "Turns extracted commitments into native issues, tickets, and database records.",
        free: false,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "GitHub & Asana Integration",
        tooltip: "Auto-links commits, PRs, and project boards with discussed commitments.",
        free: false,
        starter: false,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "Google Calendar & Outlook Calendar Sync",
        tooltip: "Discovers scheduled calls and auto-configures attendance without manual invites.",
        free: true,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "REST API & Webhooks Access",
        tooltip: "Programmatic access to extracted items, transcript streams, and event triggers.",
        free: false,
        starter: false,
        growth: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Analytics, Reporting & Digests",
    rows: [
      {
        feature: "Weekly Sunday Manager Digest",
        tooltip: "Executive summary highlighting open risks, cross-team blockers, and completions.",
        free: false,
        starter: false,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "Team Health & Commitment Velocity Dashboard",
        tooltip: "Interactive analytics showing delivery cadence, follow-through rates, and trends.",
        free: false,
        starter: "Basic Stats",
        growth: "Full Interactive",
        business: "Full Interactive",
        enterprise: "Custom Dashboards",
      },
      {
        feature: "CSV & JSON Data Export",
        tooltip: "Export complete meeting transcripts, decision logs, and metrics for external BI.",
        free: false,
        starter: false,
        growth: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Security, Privacy & Governance",
    rows: [
      {
        feature: "Zero Data Retention for LLM Model Training",
        tooltip: "Your audio, video, transcripts, and metadata are NEVER used to train foundational AI models.",
        free: true,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "AES-256 & TLS 1.3 Encryption",
        tooltip: "Military-grade encryption at rest and in transit.",
        free: true,
        starter: true,
        growth: true,
        business: true,
        enterprise: true,
      },
      {
        feature: "Detailed Audit Logs & Access History",
        tooltip: "Immutable log of member actions, exports, views, and data lifecycle events.",
        free: false,
        starter: false,
        growth: false,
        business: true,
        enterprise: true,
      },
      {
        feature: "SAML 2.0, Okta, Azure AD & Google SSO",
        tooltip: "Single Sign-On integration for enterprise identity providers.",
        free: false,
        starter: false,
        growth: false,
        business: false,
        enterprise: true,
      },
      {
        feature: "SCIM User Auto-Provisioning",
        tooltip: "Automated user onboarding and offboarding via identity management directories.",
        free: false,
        starter: false,
        growth: false,
        business: false,
        enterprise: true,
      },
      {
        feature: "SOC 2 Type II, GDPR DPA & HIPAA Readiness",
        tooltip: "Full compliance audit reports, signed DPAs, and BAA agreements upon request.",
        free: false,
        starter: false,
        growth: false,
        business: false,
        enterprise: true,
      },
      {
        feature: "Dedicated Single-Tenant Deployment Option",
        tooltip: "Isolated infrastructure instance in your choice of AWS or GCP region.",
        free: false,
        starter: false,
        growth: false,
        business: false,
        enterprise: "Optional Add-on",
      },
    ],
  },
  {
    category: "Support & Customer Success",
    rows: [
      {
        feature: "Support Level & Channel",
        tooltip: "Assistance access channels and response commitments.",
        free: "Community Forum",
        starter: "Email (48h SLA)",
        growth: "Priority Email & Slack (24h SLA)",
        business: "Dedicated Slack Channel",
        enterprise: "24/7 Dedicated Channel",
      },
      {
        feature: "Uptime & Emergency Response SLA",
        tooltip: "Contractual uptime guarantee and severity-1 incident response times.",
        free: "Best Effort",
        starter: "99.0% Uptime",
        growth: "99.5% Uptime",
        business: "99.9% Uptime",
        enterprise: "99.99% Uptime (4h SLA)",
      },
      {
        feature: "Dedicated Technical Account Manager (TAM)",
        tooltip: "Named engineering liaison for workflow design, custom integrations, and QBRs.",
        free: false,
        starter: false,
        growth: false,
        business: "Quarterly QBRs",
        enterprise: "Dedicated TAM",
      },
    ],
  },
];

export interface PricingFaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Billing" | "Product & Usage" | "Security & Privacy" | "Enterprise";
}

export const PRICING_FAQS: PricingFaqItem[] = [
  {
    id: "flat-pricing-philosophy",
    category: "Billing",
    question: "Why does Rapto use Flat Team Pricing instead of charging per seat?",
    answer:
      "Per-seat pricing creates toxic friction inside engineering organizations. Managers end up gatekeeping licenses, leaving juniors or contractors out of the loop, and missing critical cross-functional alignment. Our infrastructure costs are driven by AI meeting minutes processed—not by how many teammates read transcripts. Flat team tiers let you invite everyone without billing headaches.",
  },
  {
    id: "meeting-limits-overage",
    category: "Product & Usage",
    question: "What happens if our team exceeds the monthly meeting limit?",
    answer:
      "We never cut off your active meetings mid-call. If your team approaches 90% of your plan's monthly limit, the workspace admin receives an alert. If you exceed the tier limit, you can easily upgrade to the next tier with one click, or add flexible meeting booster packs without losing a single transcript.",
  },
  {
    id: "trial-details",
    category: "Billing",
    question: "How does the 14-day free trial work? Do I need a credit card?",
    answer:
      "You can start exploring any paid tier (Starter, Growth, or Business) free for 14 days with zero risk. No credit card is required to sign up. If you decide not to upgrade at the end of 14 days, your workspace automatically switches to the Free tier without losing historical data created during the trial.",
  },
  {
    id: "ai-training-privacy",
    category: "Security & Privacy",
    question: "Is our meeting audio or transcript data used to train AI models?",
    answer:
      "Strictly and absolutely NO. Rapto maintains a zero-data-retention policy for AI model training across all tiers—from Free to Enterprise. Your transcripts, audio streams, and metadata are processed through isolated, encrypted pipelines and are never fed into foundational LLM training sets.",
  },
  {
    id: "annual-vs-monthly",
    category: "Billing",
    question: "Can we switch between monthly and annual billing, or cancel anytime?",
    answer:
      "Yes. You can switch between monthly and annual billing at any time in your workspace billing settings. Annual billing includes an immediate ~20% discount. If you cancel, your access remains active until the end of your prepaid billing period, with zero cancellation fees.",
  },
  {
    id: "integrations-included",
    category: "Product & Usage",
    question: "Which meeting platforms and task trackers does Rapto support?",
    answer:
      "Rapto natively joins Zoom, Google Meet, and Microsoft Teams. On the sync side, commitments and action items automatically bi-directionally sync into Jira, Linear, Notion, Slack, GitHub, and Asana depending on your plan tier.",
  },
  {
    id: "enterprise-procurement",
    category: "Enterprise",
    question: "Do you support custom Invoicing, POs, and Vendor Security Questionnaires?",
    answer:
      "Yes. For our Enterprise tier, we accept ACH, wire transfers, and automated procurement POs with Net-30 or Net-60 terms. Our security team will gladly complete your organization's custom Vendor Security Questionnaires, provide SOC 2 Type II reports, and sign custom Data Processing Agreements (DPAs).",
  },
  {
    id: "multiple-workspaces",
    category: "Billing",
    question: "How does multi-workspace support work on the Business plan?",
    answer:
      "The Business plan lets you spin up up to 5 distinct team workspaces (e.g. Frontend Squad, Backend Core, Mobile Team, Design Ops, Product) with isolated channels and permissions, all consolidated under a single monthly invoice and company admin dashboard.",
  },
];

export const ROI_CONSTANTS = {
  averageHoursPerWeekInMeetings: 6,
  hoursSavedPerEngineerPerWeek: 2.5,
  defaultHourlyRate: 75, // Average loaded engineering compensation ($150k/yr)
};

export const PRICING_TESTIMONIALS = [
  {
    quote:
      "Per-seat pricing killed our adoption with previous tools because we couldn't justify $30/seat for product managers who only attended 3 meetings a week. Rapto's flat squad pricing let us invite all 24 engineers and designers on day one. It paid for itself in the first sprint.",
    author: "David Chen",
    role: "VP of Engineering",
    company: "HyperScale Tech",
    metric: "18.4x ROI",
    metricLabel: "measured in developer hours saved",
  },
  {
    quote:
      "The automatic Linear and Slack follow-up saves each team lead at least 30 minutes after every single architecture review. Zero commitments fall through the cracks.",
    author: "Elena Rostova",
    role: "Director of Product Operations",
    company: "CloudVanguard",
    metric: "99.2%",
    metricLabel: "commitment follow-through rate",
  },
];
