"use client";

import { motion } from "framer-motion";
import { Check, X, TrendingDown, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export function PricingRoiSnippet() {
  return (
    <div className="mt-14 max-w-5xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-b from-[var(--color-paper-raised)] to-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 p-6 sm:p-8 md:p-10 shadow-tier-2 overflow-hidden">
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 bg-[var(--color-brand-100)]/30 rounded-full blur-[100px]"
        />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-200)]/60 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <TrendingDown className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>The Per-Seat Tax vs Flat Squad Rates</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Stop paying per-seat penalties just to keep your team aligned.
          </h3>
          <p className="mt-2 text-sm text-[var(--color-ink-600)]">
            A real-world cost comparison for an engineering squad of 10 people over 12 months.
          </p>
        </div>

        {/* 2-Column Visual Contrast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Column 1: Legacy Per-Seat Tools */}
          <div className="rounded-xl bg-white/60 dark:bg-neutral-900/60 border border-red-500/20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold">
                  Legacy Note-Takers (Fireflies / Otter)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400">
                  Per-Seat Model
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold text-[var(--color-ink-900)]">$180</span>
                  <span className="text-xs text-[var(--color-ink-500)]">/ month</span>
                </div>
                <p className="text-xs text-[var(--color-ink-500)] mt-1 font-mono">
                  10 seats × $18/mo avg = $2,160 / year
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[var(--color-ink-700)]">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>License gatekeeping forces managers to exclude engineers & designers</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Commitments stay trapped as unread text transcripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>No cross-meeting resolution or accountability scoring</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-ink-900)]/10 text-xs text-red-600 font-medium">
              Total 1-Year Outlay: $2,160
            </div>
          </div>

          {/* Column 2: Rapto Flat Squad */}
          <div className="rounded-xl bg-[var(--color-brand-25)]/90 border-2 border-[var(--color-brand-500)] p-6 flex flex-col justify-between shadow-tier-1 relative">
            <div className="absolute -top-3 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-brand-600)] text-white text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Recommended
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-brand-700)] font-semibold">
                  Rapto Starter Squad
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--color-brand-100)] text-[var(--color-brand-800)]">
                  Flat Team Rate
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold text-[var(--color-ink-900)]">$39</span>
                  <span className="text-xs text-[var(--color-ink-500)]">/ month</span>
                </div>
                <p className="text-xs text-[var(--color-brand-700)] mt-1 font-mono font-medium">
                  Flat for up to 10 members = $468 / year
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-[var(--color-ink-800)]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                  <span>Zero seat anxiety: entire 10-person squad gets full access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                  <span>Bi-directional issue sync into Linear, Jira, Slack & Notion</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                  <span>Cross-meeting neural memory verifies promises automatically</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-brand-500)]/30 flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--color-brand-800)]">Total 1-Year Outlay: $468</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--color-brand-600)] text-white">
                Save $1,692 / yr
              </span>
            </div>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-[var(--color-brand-600)] to-[var(--color-brand-700)] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                Save $1,692/year (78% cost reduction) plus ~18 squad hours saved every month.
              </p>
              <p className="text-xs text-white/80">
                Predictable SaaS accounting with no surprise overage charges or per-seat licensing creep.
              </p>
            </div>
          </div>

          <a
            href="https://app.rapto.cloud/register?plan=starter"
            className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-white text-[var(--color-brand-900)] text-xs font-bold hover:bg-white/95 transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            Start free squad trial
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
