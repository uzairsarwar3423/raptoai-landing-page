"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

interface CompetitorData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  pricing: string;
  costFor10Users: string;
  verdictHeadline: string;
  features: {
    name: string;
    rapto: string | boolean;
    competitor: string | boolean;
  }[];
}

const COMPARISON_DATA: CompetitorData[] = [
  {
    id: "fireflies",
    name: "Fireflies.ai",
    slug: "vs-fireflies",
    tagline: "Sales & RevOps call recorder built for CRM pipeline updates.",
    pricing: "$18 – $39 / seat / mo",
    costFor10Users: "$180 – $390 / mo",
    verdictHeadline: "Fireflies is built for sales pipeline reps. Rapto is built for engineering delivery.",
    features: [
      {
        name: "Cross-Meeting Commitment Memory",
        rapto: "Autonomous tracking across sprints",
        competitor: false,
      },
      {
        name: "Pricing Structure",
        rapto: "Flat $39/mo squad rate (10 seats)",
        competitor: "$18 – $39/seat/mo tax",
      },
      {
        name: "Bi-directional Linear & Jira Sync",
        rapto: "Full issue creation & status link",
        competitor: "Basic CRM focus (Salesforce)",
      },
      {
        name: "Accountability & Fulfilment Scoring",
        rapto: "Per-person & per-project metrics",
        competitor: false,
      },
      {
        name: "Botless Recording Option",
        rapto: "Calendar & system audio capture",
        competitor: "Requires bot in every call",
      },
    ],
  },
  {
    id: "otter",
    name: "Otter.ai",
    slug: "vs-otter",
    tagline: "General transcription assistant for students and basic 1:1 notes.",
    pricing: "$16.99 – $30 / seat / mo",
    costFor10Users: "$170 – $300 / mo",
    verdictHeadline: "Otter generates transcripts you have to read. Rapto automates follow-through so you don't.",
    features: [
      {
        name: "Cross-Meeting Commitment Memory",
        rapto: "Autonomous tracking across sprints",
        competitor: false,
      },
      {
        name: "Pricing Structure",
        rapto: "Flat $39/mo squad rate (10 seats)",
        competitor: "$16.99/seat/mo tax",
      },
      {
        name: "Bi-directional Linear & Jira Sync",
        rapto: "Full issue creation & status link",
        competitor: false,
      },
      {
        name: "Accountability & Fulfilment Scoring",
        rapto: "Per-person & per-project metrics",
        competitor: false,
      },
      {
        name: "Botless Recording Option",
        rapto: "Calendar & system audio capture",
        competitor: "Requires Otter bot in call",
      },
    ],
  },
  {
    id: "granola",
    name: "Granola",
    slug: "vs-granola",
    tagline: "Minimalist Mac-only note-taking notepad with no meeting bots.",
    pricing: "$14 – $20 / user / mo",
    costFor10Users: "$140 – $200 / mo",
    verdictHeadline: "Granola is a personal Mac scratchpad. Rapto is a multi-stakeholder team accountability system.",
    features: [
      {
        name: "Cross-Meeting Commitment Memory",
        rapto: "Autonomous tracking across sprints",
        competitor: false,
      },
      {
        name: "Cross-Platform (Win, Mac, Teams, Web)",
        rapto: "Universal web, Zoom & Teams support",
        competitor: "macOS desktop only",
      },
      {
        name: "Bi-directional Linear & Jira Sync",
        rapto: "Full issue creation & status link",
        competitor: "Manual copy-paste notes",
      },
      {
        name: "Team Accountability Scoring",
        rapto: "Multi-stakeholder delivery scores",
        competitor: false,
      },
      {
        name: "Flat Squad Rates",
        rapto: "$39/mo flat (10 users)",
        competitor: "$14 – $20/user/mo",
      },
    ],
  },
];

export function CompetitorCompareSection() {
  const [activeCompetitorId, setActiveCompetitorId] = useState<string>("fireflies");

  const current: CompetitorData =
    COMPARISON_DATA.find((c) => c.id === activeCompetitorId) || COMPARISON_DATA[0]!;

  return (
    <section
      id="compare-competitors"
      aria-labelledby="compare-heading"
      className="relative bg-[var(--color-paper)] py-24 sm:py-32 border-t border-[var(--color-ink-900)]/5 overflow-hidden content-auto"
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[var(--color-brand-100)]/20 blur-[140px]"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div variants={revealUp} className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
            <span className="text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase font-mono">
              COMPETITIVE ANALYSIS
            </span>
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
          </motion.div>

          <motion.h2
            id="compare-heading"
            variants={revealUp}
            className="text-4xl sm:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.08]"
          >
            The Fireflies, Otter & Fathom alternative{" "}
            <span className="text-[var(--color-brand-600)]">built for engineering accountability.</span>
          </motion.h2>

          <motion.p
            variants={revealUp}
            className="mt-4 text-base sm:text-lg text-[var(--color-ink-600)] max-w-2xl font-normal leading-relaxed"
          >
            Traditional tools only summarize what was said. Rapto tracks what was <em>promised</em> across meetings — with cross-meeting memory, bi-directional Jira/Linear sync, and flat squad pricing that doesn't penalize adding your whole team.
          </motion.p>

          {/* Interactive Competitor Switcher Tabs */}
          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-full bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1">
            {COMPARISON_DATA.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => setActiveCompetitorId(comp.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCompetitorId === comp.id
                    ? "bg-[var(--color-ink-900)] text-white shadow-sm"
                    : "text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]"
                }`}
              >
                Rapto vs {comp.name}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Dynamic Comparison Matrix Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-2 overflow-hidden p-6 sm:p-8 md:p-10"
          >
            {/* Verdict Headline Banner */}
            <div className="mb-8 p-4 sm:p-5 rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-600)] font-semibold mb-1">
                  The Strategic Difference
                </p>
                <p className="text-base sm:text-lg font-display font-medium text-[var(--color-ink-900)]">
                  {current.verdictHeadline}
                </p>
              </div>

              <a
                href={`/compare/${current.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline whitespace-nowrap shrink-0"
              >
                Read full {current.name} comparison
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-ink-900)]/10">
                    <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-500)] w-2/5">
                      Capability
                    </th>
                    <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-[var(--color-brand-700)] w-[30%] bg-[var(--color-brand-50)]/40 rounded-t-lg">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                        Rapto AI
                      </span>
                    </th>
                    <th className="py-4 px-4 text-xs font-mono uppercase tracking-wider text-[var(--color-ink-500)] w-[30%]">
                      {current.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-ink-900)]/5 text-sm">
                  {current.features.map((feature, idx) => (
                    <tr key={idx} className="hover:bg-[var(--color-paper-sunken)]/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-[var(--color-ink-900)]">
                        {feature.name}
                      </td>

                      {/* Rapto Column */}
                      <td className="py-4 px-4 bg-[var(--color-brand-50)]/40 font-semibold text-[var(--color-brand-800)]">
                        {typeof feature.rapto === "boolean" ? (
                          feature.rapto ? (
                            <span className="inline-flex items-center gap-1 text-[var(--color-brand-600)]">
                              <Check className="w-4 h-4 stroke-[2.5]" /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-neutral-400">
                              <X className="w-4 h-4" /> No
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 stroke-[2.5]" />
                            {feature.rapto}
                          </span>
                        )}
                      </td>

                      {/* Competitor Column */}
                      <td className="py-4 px-4 text-[var(--color-ink-600)]">
                        {typeof feature.competitor === "boolean" ? (
                          feature.competitor ? (
                            <span className="inline-flex items-center gap-1 text-[var(--color-brand-600)]">
                              <Check className="w-4 h-4" /> Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-red-500/80 font-medium">
                              <X className="w-4 h-4" /> Missing
                            </span>
                          )
                        ) : (
                          <span>{feature.competitor}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Comparison Hub Link */}
            <div className="mt-8 pt-6 border-t border-[var(--color-ink-900)]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-600)]">
              <span>
                Want to see the side-by-side technical benchmarks and per-seat cost breakdowns?
              </span>
              <a
                href="/compare"
                className="font-semibold text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline inline-flex items-center gap-1"
              >
                View all comparison hubs (Fireflies, Otter, Fathom, Granola) →
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
