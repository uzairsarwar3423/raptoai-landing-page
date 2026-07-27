import { CheckCircle2, GitMerge, Activity, Puzzle } from "lucide-react";

export const productDropdownItems = [
  {
    title: "Commitment Tracking",
    description: "Every promise, automatically extracted and followed up.",
    icon: CheckCircle2,
    href: "/product#tracking",
  },
  {
    title: "Cross-Meeting Memory",
    description: "Resolves what was said last week against what's said today.",
    icon: GitMerge,
    href: "/product#memory",
  },
  {
    title: "Commitment Scoring",
    description: "A fair, recency-weighted accountability score per person.",
    icon: Activity,
    href: "/product#scoring",
  },
  {
    title: "Integrations",
    description: "Syncs into Jira, Linear, Slack, and Notion automatically.",
    icon: Puzzle,
    href: "/product#integrations",
  },
] as const;

export const navLinks = [
  { label: "Product", type: "dropdown", items: productDropdownItems },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Customers", href: "/customers" },
] as const;

export const navCTA = {
  secondary: { label: "Log in", href: "https://app.rapto.cloud/login" },
  primary: { label: "Start free trial", href: "https://app.rapto.cloud/register" },
} as const;
