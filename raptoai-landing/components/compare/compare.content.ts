export interface CompetitorProfile {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  primaryFocus: string;
  pricingModel: string;
  startingPrice: string;
  averageSquadCost15Users: number;
  verdictHeadline: string;
  verdictDescription: string;
  bestFor: string;
  keyWeaknessesForEngineering: string[];
  keyStrengths: string[];
}

export interface ComparisonFeatureRow {
  feature: string;
  category: "Core Philosophy" | "Memory & Intelligence" | "Task Sync & Follow-Through" | "Team Health & Analytics" | "Pricing & Licensing" | "Privacy & Security";
  tooltip?: string;
  raptoValue: string | boolean;
  raptoDetail?: string;
  competitorValues: Record<string, string | boolean>;
}

export interface SwitchStory {
  competitorId: string;
  competitorName: string;
  author: string;
  role: string;
  company: string;
  teamSize: string;
  quote: string;
  savingsMetric: string;
  savingsLabel: string;
}

export const COMPETITORS: CompetitorProfile[] = [
  {
    id: "fireflies",
    slug: "vs-fireflies",
    name: "Fireflies.ai",
    tagline: "Sales-heavy conversation intelligence and meeting transcription bot.",
    category: "Sales & RevOps Transcription",
    primaryFocus: "Sales call recording, CRM field mapping, and keyword analytics.",
    pricingModel: "$18 – $39 / seat / mo (Per-seat pricing)",
    startingPrice: "$18/user/mo",
    averageSquadCost15Users: 4320, // $24 avg * 15 * 12
    verdictHeadline: "Great for Sales & RevOps calls, missing engineering accountability.",
    verdictDescription:
      "Fireflies is optimized for sales reps updating Salesforce and HubSpot fields. However, for product and engineering squads, it leaves commitments trapped in transcripts without cross-meeting memory, Jira ticket validation, or delivery velocity scoring.",
    bestFor: "Outbound sales teams needing CRM sync and call analytics.",
    keyStrengths: ["Broad CRM integrations (Salesforce, HubSpot)", "Conversation intelligence keywords", "Soundbite clipping"],
    keyWeaknessesForEngineering: [
      "No cross-meeting memory across sprints",
      "Per-seat license tax penalizes adding the whole engineering squad",
      "Action items are static text without automated follow-through",
      "Cold, sales-pipeline oriented UI",
    ],
  },
  {
    id: "otter",
    slug: "vs-otter",
    name: "Otter.ai",
    tagline: "Individual meeting transcription and live note-taking assistant.",
    category: "General Meeting Transcription",
    primaryFocus: "Live speech-to-text transcription and post-call summaries.",
    pricingModel: "$16.99 – $30 / seat / mo (Per-seat pricing)",
    startingPrice: "$16.99/user/mo",
    averageSquadCost15Users: 3600, // $20 avg * 15 * 12
    verdictHeadline: "Fast transcription for individuals, disconnected from team workflows.",
    verdictDescription:
      "Otter produces rapid transcripts for students and individuals, but lacks team issue-tracker sync (Linear/Jira), sprint memory, and automated commitment verification.",
    bestFor: "Individual journalists, students, and basic 1:1 call notes.",
    keyStrengths: ["High-speed live transcription", "Easy mobile app recording", "Basic slide capture"],
    keyWeaknessesForEngineering: [
      "No bi-directional sync with Linear or Jira",
      "Zero cross-meeting context or promise resolution",
      "Per-user pricing causes license gatekeeping",
      "Transcripts quickly become cluttered unread documents",
    ],
  },
  {
    id: "fathom",
    slug: "vs-fathom",
    name: "Fathom",
    tagline: "Free Zoom recorder with AI highlights for individuals and small sales teams.",
    category: "Video Call Highlight Recorder",
    primaryFocus: "AI-generated highlight summaries for Zoom/Meet calls.",
    pricingModel: "$24 – $32 / seat / mo for Teams",
    startingPrice: "$24/user/mo (Team Edition)",
    averageSquadCost15Users: 4320, // $24 * 15 * 12
    verdictHeadline: "Clean personal call summaries, no squad commitment tracking.",
    verdictDescription:
      "Fathom is loved for its clean personal call summaries and Zoom integration. However, it operates in isolated single-meeting silos without multi-sprint memory, commitment scoring, or developer issue graphs.",
    bestFor: "Consultants and solo founders wanting quick personal meeting summaries.",
    keyStrengths: ["Fast setup for Zoom", "Clean call summaries", "Generous individual free tier"],
    keyWeaknessesForEngineering: [
      "No memory linking promises made across multiple meetings",
      "Expensive per-seat team upgrade ($24-$32/user)",
      "Lacks recency-weighted commitment velocity scoring",
      "No developer ecosystem (REST API / Webhooks on base plans)",
    ],
  },
  {
    id: "granola",
    slug: "vs-granola",
    name: "Granola",
    tagline: "Notepad app with AI audio enhancement for macOS power users.",
    category: "AI Notepad & Meeting Scribe",
    primaryFocus: "Enhancing personal meeting notes with AI speech snippets on Mac.",
    pricingModel: "$10 – $20 / user / mo",
    startingPrice: "$10/user/mo",
    averageSquadCost15Users: 2700, // $15 * 15 * 12
    verdictHeadline: "Great personal Mac notepad, no automated team follow-through.",
    verdictDescription:
      "Granola is a beautifully crafted note-taking client for individual Mac users. But meeting notes remain private documents that require manual copying and pasting into issue trackers without automated team-wide accountability.",
    bestFor: "Individual executives and Mac power users who take active notes.",
    keyStrengths: ["Elegant Mac-native UI", "Seamless blending of typed notes with AI audio", "Clean typography"],
    keyWeaknessesForEngineering: [
      "Restricted to individual desktop note-taking (no team bot)",
      "Zero cross-meeting commitment memory across the organization",
      "Manual copy-pasting required to update Jira or Linear tickets",
      "No manager Sunday digests or delivery health scoring",
    ],
  },
];

export const COMPARISON_FEATURES: ComparisonFeatureRow[] = [
  {
    category: "Core Philosophy",
    feature: "Primary Product Wedge",
    tooltip: "What the tool actually optimizes for.",
    raptoValue: "Accountability & Follow-Through",
    raptoDetail: "Tracks promises made and ensures execution across meetings.",
    competitorValues: {
      fireflies: "Sales Call Recording & CRM Field Sync",
      otter: "Speech-to-Text Transcription",
      fathom: "Meeting Video Snippets & Summaries",
      granola: "Personal AI Notepad on macOS",
    },
  },
  {
    category: "Core Philosophy",
    feature: "Pricing Model & Seat Tax",
    tooltip: "How the tool charges your organization.",
    raptoValue: "Flat Squad Rates ($79/mo flat for 25 users)",
    raptoDetail: "Zero seat anxiety. Add all engineers, designers, and PMs.",
    competitorValues: {
      fireflies: "$18 – $39 / seat / mo (Per-seat tax)",
      otter: "$16.99 – $30 / seat / mo (Per-seat tax)",
      fathom: "$24 – $32 / seat / mo (Per-seat tax)",
      granola: "$10 – $20 / user / mo (Per-seat tax)",
    },
  },
  {
    category: "Memory & Intelligence",
    feature: "Cross-Meeting Memory Graph",
    tooltip: "Resolves promises made last week against discussions today.",
    raptoValue: true,
    raptoDetail: "Maintains ongoing commitment state across sprints and standups.",
    competitorValues: {
      fireflies: false,
      otter: false,
      fathom: false,
      granola: false,
    },
  },
  {
    category: "Memory & Intelligence",
    feature: "Commitment Velocity & Accountability Scoring",
    tooltip: "Fair, recency-weighted completion metrics per squad member.",
    raptoValue: true,
    raptoDetail: "Measures follow-through percentage without invasive surveillance.",
    competitorValues: {
      fireflies: "Basic Keyword Counters",
      otter: false,
      fathom: false,
      granola: false,
    },
  },
  {
    category: "Memory & Intelligence",
    feature: "Zero AI Model Training Guarantee",
    tooltip: "Customer meeting transcripts are NEVER used to train foundational AI.",
    raptoValue: true,
    raptoDetail: "SOC 2 Type II backed Zero Data Retention enclaves.",
    competitorValues: {
      fireflies: "Enterprise Tier Only",
      otter: "Opt-out Required",
      fathom: true,
      granola: "Varies by Model Provider",
    },
  },
  {
    category: "Task Sync & Follow-Through",
    feature: "Bi-directional Jira, Linear & Notion Sync",
    tooltip: "Creates and auto-resolves tickets in developer trackers.",
    raptoValue: true,
    raptoDetail: "Links discussions to active issue IDs and auto-updates status.",
    competitorValues: {
      fireflies: "Linear/Jira (One-way Zapier / Premium)",
      otter: "Basic Zapier export",
      fathom: "Basic Zapier / Asana",
      granola: "Manual Copy-Paste",
    },
  },
  {
    category: "Task Sync & Follow-Through",
    feature: "Automated Slack & Email Follow-Up Nudges",
    tooltip: "Dispatches personalized, contextual reminders before due dates.",
    raptoValue: true,
    raptoDetail: "Pings assignees with exact context and 1-click status update.",
    competitorValues: {
      fireflies: "Channel summary drop",
      otter: "Channel summary drop",
      fathom: "Channel summary drop",
      granola: false,
    },
  },
  {
    category: "Team Health & Analytics",
    feature: "Weekly Sunday Manager Summary Digest",
    tooltip: "Aggregates open risks, blockers, and completions across all meetings.",
    raptoValue: true,
    raptoDetail: "Saves engineering managers 2.5 hours of manual status collation.",
    competitorValues: {
      fireflies: false,
      otter: false,
      fathom: false,
      granola: false,
    },
  },
  {
    category: "Team Health & Analytics",
    feature: "Standup, Sprint Retro & 1:1 Classification Models",
    tooltip: "Tailored AI extractors fine-tuned for engineering meeting cadences.",
    raptoValue: true,
    raptoDetail: "Distinguishes technical architecture blockers from casual banter.",
    competitorValues: {
      fireflies: "Sales call centric",
      otter: "Generic summary",
      fathom: "Generic summary",
      granola: "Personal prompt",
    },
  },
  {
    category: "Pricing & Licensing",
    feature: "Annual Cost for a 15-Person Squad",
    tooltip: "Total software expense per year for a typical engineering squad.",
    raptoValue: "$948 / year flat (Growth Plan)",
    raptoDetail: "Includes up to 25 members, 120 meetings/mo, 1-yr retention.",
    competitorValues: {
      fireflies: "$4,320 / year ($24/mo × 15)",
      otter: "$3,600 / year ($20/mo × 15)",
      fathom: "$4,320 / year ($24/mo × 15)",
      granola: "$2,700 / year ($15/mo × 15)",
    },
  },
];

export const SWITCH_STORIES: SwitchStory[] = [
  {
    competitorId: "fireflies",
    competitorName: "Fireflies.ai",
    author: "Marcus Vance",
    role: "Head of Engineering",
    company: "Nexus Platform",
    teamSize: "22 Engineers & PMs",
    quote:
      "With Fireflies, we had 5 licenses for team leads and everyone else was locked out because of the seat cost. We ended up with endless email summaries that nobody read. Rapto gave our entire squad access for a flat $79/mo, and the cross-meeting memory actually holds people accountable in Linear.",
    savingsMetric: "$4,800/yr saved",
    savingsLabel: "in seat licenses alone",
  },
  {
    competitorId: "otter",
    competitorName: "Otter.ai",
    author: "Sarah Lindqvist",
    role: "VP of Product Delivery",
    company: "HyperLogic Systems",
    teamSize: "18 Product Designers & Devs",
    quote:
      "Otter gave us walls of transcript text, but we still lost hours every Friday asking 'who said they were writing the API spec?'. Rapto extracted the commitment, assigned it in Linear, and reminded the engineer before sprint review.",
    savingsMetric: "99.4%",
    savingsLabel: "commitment completion rate",
  },
  {
    competitorId: "fathom",
    competitorName: "Fathom",
    author: "Arjun Mehta",
    role: "Director of Technical Operations",
    company: "AeroStack",
    teamSize: "30 Teammates",
    quote:
      "Fathom was nice for 1:1 Zoom notes, but as our team grew across standups and architecture syncs, we needed a single system that connected promises from last Tuesday to retro this morning. Rapto's Sunday manager digest is indispensable.",
    savingsMetric: "2.5 hrs/wk",
    savingsLabel: "recovered per engineering lead",
  },
];

export const COMPARE_FAQS = [
  {
    question: "Can we use Rapto alongside our existing note-taking or transcription tools?",
    answer:
      "Yes. Rapto seamlessly auto-joins Zoom, Google Meet, and Microsoft Teams. Many teams run Rapto alongside recording tools during a 14-day trial to experience the difference between passive transcription and active cross-meeting commitment tracking.",
  },
  {
    question: "How does Rapto prevent micromanagement with Commitment Scoring?",
    answer:
      "Rapto's commitment scoring is designed for team health and velocity, not surveillance. It uses recency-weighted algorithms that give full credit for communicating blockers early and renegotiating timelines. It focuses on follow-through and unblocking dependencies rather than punitive surveillance.",
  },
  {
    question: "Why is flat squad pricing better than per-seat pricing for meeting tools?",
    answer:
      "Per-seat pricing penalizes cross-functional collaboration. When managers only buy licenses for senior leads, junior engineers, contractors, and QA specialists get excluded from the loop. Rapto's flat rate ($79/mo for up to 25 members) ensures every contributor can be invited without incremental billing friction.",
  },
  {
    question: "How difficult is it to migrate from Fireflies, Otter, or Fathom?",
    answer:
      "Migration takes less than 2 minutes. Simply connect your Google or Microsoft calendar, integrate Slack/Linear/Jira with 1 click, and Rapto's bot begins tracking commitments immediately on your next scheduled meeting. No legacy data migration headache.",
  },
];
