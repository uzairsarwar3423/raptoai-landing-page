export interface PlanFeature {
  text: string;
  isHighlight?: boolean;
}

export interface PricingPlan {
  id: "free" | "starter" | "growth" | "business";
  name: string;
  badge?: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  teamMembers: string;
  meetingsLimit: string;
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
    tagline: "For small teams testing core AI meeting extraction workflows.",
    monthlyPrice: 0,
    annualPrice: 0,
    teamMembers: "Up to 3 members",
    meetingsLimit: "5 meetings / mo",
    meetingsSubtext: "Trial validation limit",
    historyRetention: "7-day retention",
    ctaText: "Get started for free",
    ctaHref: "https://app.rapto.cloud/register",
    ctaVariant: "secondary",
    features: [
      { text: "Auto-joins Zoom, Meet & Teams" },
      { text: "Basic action item & decision extraction" },
      { text: "Slack integration (1 channel)" },
      { text: "Google Calendar auto-detection" },
      { text: "Searchable transcript viewer" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Optimized for early startups & small engineering squads.",
    monthlyPrice: 49,
    annualPrice: 39,
    teamMembers: "Up to 10 members",
    meetingsLimit: "40 meetings / mo",
    meetingsSubtext: "~2 meetings / work day",
    historyRetention: "90-day retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=starter",
    ctaVariant: "secondary",
    features: [
      { text: "Everything in Free, plus:" },
      { text: "Jira, Linear, Notion & Slack sync", isHighlight: true },
      { text: "Automated Slack DMs & Email nudges" },
      { text: "Post-meeting AI email & digest generator" },
      { text: "Commitment completion tracking" },
      { text: "Priority Email Support (48h SLA)" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most Popular",
    tagline: "Engineered for fast-growing product & engineering teams.",
    monthlyPrice: 99,
    annualPrice: 79,
    isPopular: true,
    teamMembers: "Up to 25 members",
    meetingsLimit: "120 meetings / mo",
    meetingsSubtext: "~6 meetings / work day",
    historyRetention: "1-year retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=growth",
    ctaVariant: "primary",
    features: [
      { text: "Everything in Starter, plus:" },
      { text: "Team health & velocity trends", isHighlight: true },
      { text: "Weekly Sunday manager digest", isHighlight: true },
      { text: "GitHub & Asana integration support" },
      { text: "Standup, 1:1 & sprint review AI models" },
      { text: "Full CSV data export" },
      { text: "Priority Support (24h response)" },
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Built for scaling organizations & multi-team setups.",
    monthlyPrice: 199,
    annualPrice: 159,
    teamMembers: "Up to 60 members",
    meetingsLimit: "300 meetings / mo",
    meetingsSubtext: "~15 meetings / work day",
    historyRetention: "Unlimited retention",
    ctaText: "Start 14-day trial",
    ctaHref: "https://app.rapto.cloud/register?plan=business",
    ctaVariant: "secondary",
    features: [
      { text: "Everything in Growth, plus:" },
      { text: "Up to 5 distinct team workspaces", isHighlight: true },
      { text: "Full REST API & Webhooks access" },
      { text: "Detailed audit logs & compliance" },
      { text: "Custom AI commitment rules & tagging" },
      { text: "Dedicated Slack channel + QBR calls" },
    ],
  },
];

export const ENTERPRISE_PLAN = {
  name: "Enterprise",
  badge: "Security & Scale",
  price: "Custom",
  startingPrice: "Starting at $500/mo (Annual Only)",
  tagline: "Designed for security-conscious, enterprise-scale organizations (60+ members).",
  ctaText: "Contact Sales",
  ctaHref: "mailto:sales@rapto.cloud?subject=Enterprise%20Plan%20Inquiry",
  highlights: [
    "Unlimited team members, meetings & workspaces",
    "SAML 2.0 / Okta / Azure AD SSO & SCIM auto-provisioning",
    "SOC 2 Type II compliance, custom GDPR DPA & HIPAA options",
    "Dedicated high-throughput pipeline & zero data retention for training",
    "99.9% Uptime SLA & 4-hour emergency response SLA",
    "Dedicated Technical Account Manager (TAM)",
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
    category: "Capacity & Limits",
    rows: [
      { feature: "Max Team Members", free: "3", starter: "10", growth: "25", business: "60", enterprise: "Unlimited" },
      { feature: "Monthly Meetings Limit", free: "5", starter: "40", growth: "120", business: "300", enterprise: "Unlimited" },
      { feature: "History Retention", free: "7 Days", starter: "90 Days", growth: "1 Year", business: "Unlimited", enterprise: "Unlimited" },
      { feature: "Workspaces Included", free: "1", starter: "1", growth: "1", business: "Up to 5", enterprise: "Unlimited" },
    ],
  },
  {
    category: "Integrations & Automation",
    rows: [
      { feature: "Zoom / Meet / Teams Bot", free: true, starter: true, growth: true, business: true, enterprise: true },
      { feature: "Slack Integration", free: "Basic (1 ch)", starter: "Full Sync", growth: "Full Sync", business: "Full Sync", enterprise: "Full Sync" },
      { feature: "Jira / Linear / Notion Sync", free: false, starter: true, growth: true, business: true, enterprise: true },
      { feature: "GitHub & Asana Support", free: false, starter: false, growth: true, business: true, enterprise: true },
      { feature: "Automated Reminders & Drafts", free: false, starter: true, growth: true, business: true, enterprise: true },
    ],
  },
  {
    category: "Analytics & Developer Ecosystem",
    rows: [
      { feature: "Weekly Manager Digest", free: false, starter: false, growth: true, business: true, enterprise: true },
      { feature: "Team Health & Velocity Dashboard", free: false, starter: false, growth: true, business: true, enterprise: true },
      { feature: "CSV Data Export", free: false, starter: false, growth: true, business: true, enterprise: true },
      { feature: "REST API & Webhooks Access", free: false, starter: false, growth: false, business: true, enterprise: true },
      { feature: "Custom AI Commitment Rules", free: false, starter: false, growth: false, business: true, enterprise: true },
    ],
  },
  {
    category: "Security, Governance & Support",
    rows: [
      { feature: "Audit Logs & Compliance", free: false, starter: false, growth: false, business: true, enterprise: true },
      { feature: "SAML 2.0 / Okta / Azure SSO", free: false, starter: false, growth: false, business: false, enterprise: true },
      { feature: "SCIM Provisioning", free: false, starter: false, growth: false, business: false, enterprise: true },
      { feature: "SOC 2 Type II & Custom DPA", free: false, starter: false, growth: false, business: false, enterprise: true },
      { feature: "Support SLA Level", free: "Community", starter: "48h Email", growth: "24h Priority", business: "Dedicated Slack", enterprise: "4h Emergency SLA" },
      { feature: "Dedicated TAM & QBRs", free: false, starter: false, growth: false, business: "QBR Calls", enterprise: "Dedicated TAM" },
    ],
  },
];
