"use client";

import { motion } from "framer-motion";
import { GitMerge, CheckCircle2, Activity, Users, ArrowRight, X } from "lucide-react";

const differentiators = [
  {
    icon: GitMerge,
    title: "Cross-Meeting Memory",
    category: "Architecture",
    raptoPromise: "Resolves promises across days and weeks. What was promised in Monday's planning is checked in Thursday's standup.",
    competitorFlaw: "Every meeting is an isolated island. Once the recording ends, the bot forgets everything.",
  },
  {
    icon: CheckCircle2,
    title: "Active Issue Sync",
    category: "Workflow Automation",
    raptoPromise: "Bi-directionally syncs commitments into Linear, Jira, and Notion with automated Slack nudges and 1-click status updates.",
    competitorFlaw: "Dumps static walls of text or email summaries that require manual copy-pasting and get ignored.",
  },
  {
    icon: Activity,
    title: "Commitment Velocity",
    category: "Team Health",
    raptoPromise: "A fair, recency-weighted accountability score per person that measures delivery cadence without surveillance paranoia.",
    competitorFlaw: "Only tracks speaking time or sales keyword frequency with zero insight into actual engineering execution.",
  },
  {
    icon: Users,
    title: "Flat Squad Pricing",
    category: "Commercial Model",
    raptoPromise: "$79/mo flat for your whole squad (up to 25 members). Invite every engineer, designer, and QA engineer.",
    competitorFlaw: "$18–$39 per user per month. Managers are forced to gatekeep licenses, leaving half the team out.",
  },
];

export function CompareDifferentiators() {
  return (
    <section className="relative py-16 lg:py-24 bg-[var(--color-paper-sunken)]/40 border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-700)] mb-2">
            The Structural Gap
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Why traditional note-takers fail engineering teams.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-700)]">
            Four fundamental design decisions that separate active commitment intelligence from passive transcription recorders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-3xl bg-[var(--color-paper-raised)] p-7 sm:p-8 border border-[var(--color-ink-900)]/10 shadow-tier-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center border border-[var(--color-brand-100)]">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)]">
                      {diff.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[var(--color-ink-900)] mb-4">
                    {diff.title}
                  </h3>

                  {/* Rapto Way */}
                  <div className="rounded-2xl bg-[var(--color-brand-25)]/70 p-4 border border-[var(--color-brand-200)]/60 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-800)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)]" />
                      <span>The Rapto Approach</span>
                    </div>
                    <p className="text-xs text-[var(--color-ink-900)] leading-relaxed pl-5.5">
                      {diff.raptoPromise}
                    </p>
                  </div>

                  {/* Competitor Way */}
                  <div className="rounded-2xl bg-[var(--color-paper-sunken)]/60 p-4 border border-[var(--color-ink-900)]/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-ink-500)]">
                      <X className="w-4 h-4 text-[var(--color-ink-400)]" />
                      <span>Traditional Note-Takers (Otter, Fireflies, Fathom)</span>
                    </div>
                    <p className="text-xs text-[var(--color-ink-700)] leading-relaxed pl-5.5">
                      {diff.competitorFlaw}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
