export interface ProblemStat {
  id: string;
  metric: string;
  metricNumber: number;
  suffix?: string;
  prefix?: string;
  tag: string;
  tagStatus: "critical" | "warning" | "caution";
  title: string;
  description: string;
  impactLabel: string;
}

export const problemHeader = {
  eyebrow: "THE POST-MEETING BLACK HOLE",
  headline: "Meetings end. Promises evaporate.",
  subhead:
    "Teams don't fail from lack of conversation. They fail in the silent gap between what was agreed during the call and what actually gets tracked afterward.",
};

export const problemStats: ProblemStat[] = [
  {
    id: "decay-rate",
    metric: "70%",
    metricNumber: 70,
    suffix: "%",
    tag: "EXECUTION GAP",
    tagStatus: "critical",
    title: "The 48-Hour Promise Decay",
    description:
      "Spoken commitments vanish into unread meeting transcripts. Without an immutable ledger, 7 out of 10 action items are forgotten before the next sprint.",
    impactLabel: "70% of verbal commitments dropped without automated tracking",
  },
  {
    id: "chasing-tax",
    metric: "4.5h",
    metricNumber: 4.5,
    suffix: " hrs/wk",
    tag: "MANAGEMENT TAX",
    tagStatus: "warning",
    title: "The Follow-Up Tax",
    description:
      "Engineering leaders and project leads spend over 18 hours every month playing detective across Slack, Linear, and email just to verify if promised work was started.",
    impactLabel: "18+ hours/month spent manually asking 'Any update on this?'",
  },
  {
    id: "context-drift",
    metric: "3.2×",
    metricNumber: 3.2,
    suffix: "×",
    tag: "ALIGNMENT DRIFT",
    tagStatus: "caution",
    title: "Silent Context Mutation",
    description:
      "When agreements rely on human memory and scattered notes, scope mutates by 3.2× across handoffs—triggering surprise blockers right before release deadlines.",
    impactLabel: "3.2× higher sprint delay risk from untracked dependencies",
  },
];

export const promiseComparison = {
  traditional: {
    badge: "THE STATUS QUO",
    title: "The Fragmented Guesswork Loop",
    subtitle: "What happens in 95% of high-growth companies today",
    steps: [
      {
        time: "MIN 00",
        label: "Spoken Agreement",
        detail: "“I'll fix the auth token expiry and deploy by Thursday morning.”",
        status: "Spoken aloud",
        icon: "mic",
      },
      {
        time: "HR 02",
        label: "Transcript Dump",
        detail: "Buried inside a 45-page AI transcription document. Nobody reads it.",
        status: "Unindexed text",
        icon: "file",
      },
      {
        time: "DAY 04",
        label: "Manual Chasing",
        detail: "Manager sends Slack DM: “Hey, did we ever push the auth fix?”",
        status: "Context lost",
        icon: "message",
      },
      {
        time: "DAY 07",
        label: "Blocked Sprint",
        detail: "Release delayed. Surprise blocker surfaced during retrospective.",
        status: "Missed deadline",
        icon: "alert",
      },
    ],
  },
  rapto: {
    badge: "THE RAPTO STANDARD",
    title: "Continuous Accountability Pipeline",
    subtitle: "How top engineering & product organizations operate",
    steps: [
      {
        time: "MIN 00",
        label: "Spoken Agreement",
        detail: "“I'll fix the auth token expiry and deploy by Thursday morning.”",
        status: "Captured live",
        icon: "mic",
      },
      {
        time: "MIN 01",
        label: "Autonomous Extraction",
        detail: "Parsed into structured commitment: Owner (Alex), Due (Thu 09:00), Confidence (99.4%).",
        status: "Owner locked",
        icon: "brain",
      },
      {
        time: "DAY 02",
        label: "Multi-Tool Sync",
        detail: "Synced to Linear ticket & calendar with zero manual note-taking.",
        status: "Bi-directional sync",
        icon: "sync",
      },
      {
        time: "DAY 04",
        label: "Cross-Meeting Resolution",
        detail: "Rapto detects Thursday standup confirmation: “Auth fix merged.” Marked fulfilled.",
        status: "100% Verified ✓",
        icon: "check",
      },
    ],
  },
};
