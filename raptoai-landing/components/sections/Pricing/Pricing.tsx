"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { PricingCards } from "@/components/pricing/PricingCards";
import { PricingMatrix } from "@/components/pricing/PricingMatrix";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative bg-[var(--color-paper)] py-24 lg:py-32 z-10 overflow-hidden border-t border-[var(--color-ink-900)]/5 content-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[var(--color-brand-100)]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={revealUp} className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
            <p className="text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase font-mono">
              PREDICTABLE TEAM PRICING
            </p>
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
          </motion.div>

          <motion.h2
            variants={revealUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.08]"
          >
            Flat team rates.<br />
            <span className="text-[var(--color-ink-500)]">Zero seat anxiety.</span>
          </motion.h2>

          <motion.p
            variants={revealUp}
            className="mt-5 text-base sm:text-lg text-[var(--color-ink-700)] max-w-2xl font-normal leading-relaxed"
          >
            Rapto charges a flat monthly rate per team tier. Onboard all your engineers, designers, and PMs without per-seat line-item friction.
          </motion.p>

          {/* Billing Switch Toggle */}
          <motion.div variants={revealUp} className="mt-8 flex items-center justify-center gap-4 bg-[var(--color-paper-raised)] p-1.5 rounded-full border border-[var(--color-ink-900)]/10 shadow-tier-1">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                !isAnnual
                  ? "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] shadow-sm"
                  : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                isAnnual
                  ? "bg-[var(--color-brand-600)] text-white shadow-sm"
                  : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)]"
              }`}
            >
              Annual Billing
              <span
                className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full ${
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

        {/* Pricing Cards */}
        <PricingCards isAnnual={isAnnual} />

        {/* Feature Comparison Matrix */}
        <div className="mt-12">
          <PricingMatrix isAnnual={isAnnual} defaultExpanded={false} />
        </div>

        {/* Link to Full Pricing Page */}
        <div className="mt-12 text-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline"
          >
            <span>View dedicated Pricing Page with ROI Calculator & FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
