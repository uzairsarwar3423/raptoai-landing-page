"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

interface PricingHeroProps {
  isAnnual: boolean;
  onToggleBilling: (annual: boolean) => void;
}

export function PricingHero({ isAnnual, onToggleBilling }: PricingHeroProps) {
  return (
    <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[var(--color-brand-100)]/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={revealUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold tracking-wider uppercase mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-[var(--color-brand-500)] fill-current" />
            <span>Flat Team Pricing • Zero Seat Anxiety</span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            variants={revealUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.06] max-w-4xl"
          >
            Predictable squad rates.<br />
            <span className="text-[var(--color-ink-500)]">Onboard your entire team.</span>
          </motion.h1>

          {/* Value Prop Subhead */}
          <motion.p
            variants={revealUp}
            className="mt-6 text-base sm:text-xl text-[var(--color-ink-700)] max-w-2xl font-normal leading-relaxed"
          >
            No per-seat line-item friction or license gatekeeping. One flat monthly rate per team squad with unlimited cross-meeting accountability.
          </motion.p>

          {/* Micro Value Chips */}
          <motion.div
            variants={revealUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[var(--color-ink-700)]"
          >
            <span className="inline-flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[var(--color-brand-500)]" />
              14-day free trial
            </span>
            <span className="text-[var(--color-ink-300)]">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-[var(--color-brand-500)]" />
              No credit card required
            </span>
            <span className="text-[var(--color-ink-300)]">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-[var(--color-brand-500)]" />
              Switch or cancel anytime
            </span>
          </motion.div>

          {/* Interactive Billing Frequency Switch */}
          <motion.div
            variants={revealUp}
            className="mt-10 flex items-center justify-center gap-4 bg-[var(--color-paper-raised)] p-1.5 sm:p-2 rounded-full border border-[var(--color-ink-900)]/10 shadow-tier-1"
          >
            <button
              type="button"
              onClick={() => onToggleBilling(false)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !isAnnual
                  ? "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] shadow-sm"
                  : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              }`}
              aria-pressed={!isAnnual}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => onToggleBilling(true)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? "bg-[var(--color-brand-600)] text-white shadow-sm"
                  : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              }`}
              aria-pressed={isAnnual}
            >
              Annual Billing
              <span
                className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                  isAnnual
                    ? "bg-white/20 text-white"
                    : "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-300)]/40"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Save ~20%
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
