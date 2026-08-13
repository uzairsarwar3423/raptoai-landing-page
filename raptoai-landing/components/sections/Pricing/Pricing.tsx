"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import {
  PRICING_PLANS,
  ENTERPRISE_PLAN,
  FEATURE_MATRIX_CATEGORIES,
  PricingPlan,
} from "./pricing.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <section id="pricing" className="relative bg-[var(--color-paper)] py-28 lg:py-36 z-10 overflow-hidden border-t border-[var(--color-ink-900)]/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[var(--color-brand-100)]/15 blur-[140px] rounded-full pointer-events-none" />

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
            <p className="text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase">
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
            Vocaply charges a flat monthly rate per team tier. Onboard all your engineers, designers, and PMs without per-seat line-item friction.
          </motion.p>

          {/* Billing Switch Toggle */}
          <motion.div variants={revealUp} className="mt-10 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium transition-colors cursor-pointer ${
                !isAnnual ? "text-[var(--color-ink-900)] font-semibold" : "text-[var(--color-ink-500)]"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly Billing
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[var(--color-ink-900)]/10 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)]"
            >
              <span
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-[var(--color-paper-raised)] shadow-md ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-6 bg-[var(--color-brand-500)]" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                isAnnual ? "text-[var(--color-ink-900)] font-semibold" : "text-[var(--color-ink-500)]"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual Billing
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-300)]/40">
                <Sparkles className="w-3 h-3 text-[var(--color-brand-500)]" />
                Save ~20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* 4-Column Pricing Cards Grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {PRICING_PLANS.map((plan: PricingPlan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.id}
                variants={revealUp}
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-[var(--color-brand-25)]/60 border-2 border-[var(--color-brand-500)] shadow-tier-2"
                    : "bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-ink-900)]/20"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-600)] text-white text-xs font-semibold tracking-wide shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-5">
                  <h3 className="text-xl font-display font-semibold text-[var(--color-ink-900)]">
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--color-ink-500)] leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Pricing Display */}
                <div className="mb-6 pb-6 border-b border-[var(--color-ink-900)]/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-[var(--color-ink-900)] tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-ink-500)]">
                      / mo
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                    {plan.monthlyPrice === 0
                      ? "Free forever"
                      : isAnnual
                      ? `Billed annually ($${price * 12}/yr)`
                      : "Billed monthly"}
                  </p>
                </div>

                {/* Capacity Pills */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-[var(--color-paper-sunken)]/60 text-[var(--color-ink-700)] font-medium">
                    <span>Capacity</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">{plan.teamMembers}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-[var(--color-paper-sunken)]/60 text-[var(--color-ink-700)] font-medium">
                    <span>Meetings Limit</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">{plan.meetingsLimit}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-[var(--color-paper-sunken)]/60 text-[var(--color-ink-700)] font-medium">
                    <span>Data Retention</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">{plan.historyRetention}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaHref}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2 mb-8 ${
                    plan.ctaVariant === "primary"
                      ? "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] shadow-sm hover:shadow"
                      : "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] hover:bg-[var(--color-ink-900)]/90"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Features List */}
                <div className="mt-auto space-y-3">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-500)]">
                    Features Included
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--color-ink-700)] leading-snug">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${feat.isHighlight ? "text-[var(--color-brand-600)] stroke-[2.5]" : "text-[var(--color-brand-500)]"}`} />
                        <span className={feat.isHighlight ? "font-semibold text-[var(--color-ink-900)]" : ""}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enterprise VIP Section Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-3xl bg-[var(--color-canvas-dark)] text-[var(--color-ink-on-dark)] p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-tier-3 border border-white/10"
        >
          {/* Subtle background glow accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-500)]/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-brand-100)] text-xs font-semibold tracking-wide backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand-300)]" />
                {ENTERPRISE_PLAN.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white">
                {ENTERPRISE_PLAN.name} Plan — {ENTERPRISE_PLAN.price}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-ink-on-dark-muted)]">
                {ENTERPRISE_PLAN.startingPrice} • {ENTERPRISE_PLAN.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {ENTERPRISE_PLAN.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                    <Check className="w-4 h-4 shrink-0 text-[var(--color-brand-300)] mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <a
                href={ENTERPRISE_PLAN.ctaHref}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white text-[var(--color-canvas-dark)] font-semibold text-sm hover:bg-[var(--color-paper-sunken)] transition-all duration-200 text-center shadow-md flex items-center justify-center gap-2"
              >
                {ENTERPRISE_PLAN.ctaText}
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-3 text-xs text-white/50 text-center lg:text-right">
                Custom contracts • SOC 2 Reports • Dedicated TAM
              </p>
            </div>
          </div>
        </motion.div>

        {/* Matrix Comparison Accordion Trigger */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors py-2 px-4 rounded-full bg-[var(--color-paper-sunken)]/70 hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
          >
            {showMatrix ? "Hide detailed feature matrix" : "Compare all features & capabilities"}
            {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Detailed Feature Comparison Matrix */}
        <AnimatePresence>
          {showMatrix && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-10 overflow-x-auto rounded-2xl border border-[var(--color-ink-900)]/10 bg-[var(--color-paper-raised)] shadow-tier-1"
            >
              <table className="w-full min-w-[700px] text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-ink-900)]/10 bg-[var(--color-paper-sunken)]/50">
                    <th className="py-4 px-6 font-semibold text-[var(--color-ink-900)] w-1/3">
                      Features & Capabilities
                    </th>
                    <th className="py-4 px-3 font-semibold text-[var(--color-ink-900)] text-center">Free</th>
                    <th className="py-4 px-3 font-semibold text-[var(--color-ink-900)] text-center">Starter</th>
                    <th className="py-4 px-3 font-semibold text-[var(--color-brand-700)] text-center bg-[var(--color-brand-25)]/80">Growth</th>
                    <th className="py-4 px-3 font-semibold text-[var(--color-ink-900)] text-center">Business</th>
                    <th className="py-4 px-3 font-semibold text-[var(--color-ink-900)] text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-ink-900)]/5">
                  {FEATURE_MATRIX_CATEGORIES.map((cat, cIdx) => (
                    <React.Fragment key={cIdx}>
                      <tr className="bg-[var(--color-paper-sunken)]/30">
                        <td colSpan={6} className="py-3 px-6 font-semibold text-[var(--color-ink-900)] uppercase tracking-wider text-xs">
                          {cat.category}
                        </td>
                      </tr>
                      {cat.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[var(--color-paper-sunken)]/20 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-[var(--color-ink-700)]">
                            {row.feature}
                          </td>
                          <td className="py-3.5 px-3 text-center">{renderMatrixCell(row.free)}</td>
                          <td className="py-3.5 px-3 text-center">{renderMatrixCell(row.starter)}</td>
                          <td className="py-3.5 px-3 text-center bg-[var(--color-brand-25)]/30 font-semibold">{renderMatrixCell(row.growth)}</td>
                          <td className="py-3.5 px-3 text-center">{renderMatrixCell(row.business)}</td>
                          <td className="py-3.5 px-3 text-center">{renderMatrixCell(row.enterprise)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// React helper import
import React from "react";

function renderMatrixCell(val: string | boolean) {
  if (val === true) {
    return <Check className="w-4 h-4 text-[var(--color-brand-500)] mx-auto" />;
  }
  if (val === false) {
    return <span className="text-[var(--color-ink-300)]">—</span>;
  }
  return <span className="text-[var(--color-ink-900)] font-medium text-xs">{val}</span>;
}

export default Pricing;
