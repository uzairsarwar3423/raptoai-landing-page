"use client";

import { motion } from "framer-motion";
import { GitCompare, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { COMPETITORS } from "./compare.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

interface CompareHeroProps {
  selectedCompetitorId: string;
  onSelectCompetitor: (id: string) => void;
}

export function CompareHero({ selectedCompetitorId, onSelectCompetitor }: CompareHeroProps) {
  return (
    <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--color-paper)]">
      {/* Ambient background radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--color-brand-100)]/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={revealUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider mb-6"
          >
            <GitCompare className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
            <span>Honest Competitive Breakdown</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={revealUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.06] max-w-4xl"
          >
            Meeting notes are passive.<br />
            <span className="text-[var(--color-ink-500)]">Rapto is proactive.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={revealUp}
            className="mt-6 text-base sm:text-xl text-[var(--color-ink-700)] max-w-2xl font-normal leading-relaxed"
          >
            Transcription is a solved commodity. The real bottleneck is what happens after the call ends. See how Rapto compares to traditional recording bots.
          </motion.p>

          {/* Competitor Selector Pills */}
          <motion.div
            variants={revealUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 bg-[var(--color-paper-raised)] p-2 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1"
          >
            <button
              type="button"
              onClick={() => onSelectCompetitor("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCompetitorId === "all"
                  ? "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] shadow-sm"
                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)]"
              }`}
            >
              All Competitors Overview
            </button>

            {COMPETITORS.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => onSelectCompetitor(comp.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCompetitorId === comp.id
                    ? "bg-[var(--color-brand-600)] text-white shadow-sm"
                    : "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)]"
                }`}
              >
                vs. {comp.name}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
