"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Building2, CheckCircle2 } from "lucide-react";
import { SWITCH_STORIES } from "./compare.content";

export function CompareSwitchStories() {
  return (
    <section className="relative py-16 lg:py-24 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand-700)] mb-2">
            Migration Proof
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Why engineering leaders switched to Rapto.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-700)]">
            Real teams moving from passive transcription tools to active commitment intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SWITCH_STORIES.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-[var(--color-paper-raised)] p-7 border border-[var(--color-ink-900)]/10 shadow-tier-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)]">
                    Switched from {story.competitorName}
                  </span>
                  <span className="text-xs text-[var(--color-ink-500)]">
                    {story.teamSize}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[var(--color-brand-500)]/30 mb-3" />
                <p className="text-xs sm:text-sm text-[var(--color-ink-900)] leading-relaxed italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[var(--color-ink-900)]/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-display font-semibold text-[var(--color-ink-900)]">
                    {story.author}
                  </h4>
                  <p className="text-[11px] text-[var(--color-ink-500)]">
                    {story.role}, {story.company}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-base font-display font-bold text-[var(--color-brand-700)]">
                    {story.savingsMetric}
                  </div>
                  <div className="text-[9px] font-mono text-[var(--color-ink-500)]">
                    {story.savingsLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
