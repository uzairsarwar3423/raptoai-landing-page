"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ShieldCheck, ArrowRight, Building2, HelpCircle } from "lucide-react";
import {
  PRICING_PLANS,
  ENTERPRISE_PLAN,
  PricingPlan,
} from "@/components/sections/Pricing/pricing.content";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { staggerContainer, revealUp } from "@/lib/motion/variants";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

interface PricingCardsProps {
  isAnnual: boolean;
  highlightedPlanId?: string;
}

export function PricingCards({ isAnnual, highlightedPlanId }: PricingCardsProps) {
  return (
    <TooltipProvider>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Tier Pricing Grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {PRICING_PLANS.map((plan: PricingPlan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isSelected = highlightedPlanId ? highlightedPlanId === plan.id : plan.isPopular;

            return (
              <motion.div
                key={plan.id}
                variants={revealUp}
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  isSelected
                    ? "bg-[var(--color-brand-25)]/70 border-2 border-[var(--color-brand-500)] shadow-tier-2 ring-4 ring-[var(--color-brand-500)]/10"
                    : "bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-ink-900)]/20 hover:shadow-tier-2"
                }`}
              >
                {/* Popular / Hero Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-600)] text-white text-xs font-semibold tracking-wide shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge || "Most Popular"}
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-semibold text-[var(--color-ink-900)]">
                      {plan.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-ink-500)] leading-relaxed min-h-[38px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Pricing Display */}
                <div className="mb-6 pb-6 border-b border-[var(--color-ink-900)]/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-display font-bold text-[var(--color-ink-900)] tracking-tight">
                      $<AnimatedNumber value={price} duration={0.8} />
                    </span>
                    <span className="text-sm font-medium text-[var(--color-ink-500)]">
                      / mo
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--color-ink-500)]">
                    {plan.monthlyPrice === 0
                      ? "Free forever • No CC required"
                      : isAnnual
                      ? `Billed annually ($${price * 12}/yr)`
                      : "Billed monthly"}
                  </p>
                </div>

                {/* Capacity & Limits Specs */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[var(--color-paper-sunken)]/70 text-[var(--color-ink-700)]">
                    <span className="font-medium flex items-center gap-1">
                      Team Capacity
                    </span>
                    <span className="font-semibold text-[var(--color-ink-900)]">
                      {plan.teamMembers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[var(--color-paper-sunken)]/70 text-[var(--color-ink-700)]">
                    <span className="font-medium flex items-center gap-1">
                      Meetings Limit
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label="Meetings limit info"
                            className="cursor-help"
                          >
                            <HelpCircle className="w-3 h-3 text-[var(--color-ink-300)]" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {plan.meetingsSubtext}
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <span className="font-semibold text-[var(--color-ink-900)]">
                      {plan.meetingsLimit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[var(--color-paper-sunken)]/70 text-[var(--color-ink-700)]">
                    <span className="font-medium">Data Retention</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">
                      {plan.historyRetention}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={plan.ctaHref}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2 mb-7 ${
                    plan.ctaVariant === "primary"
                      ? "bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] shadow-sm hover:shadow-md hover:scale-[1.01]"
                      : "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] hover:bg-[var(--color-ink-900)]/90 hover:scale-[1.01]"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Features List */}
                <div className="mt-auto space-y-3">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-ink-500)]">
                    Key Capabilities
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[var(--color-ink-700)] leading-snug"
                      >
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            feat.isHighlight
                              ? "text-[var(--color-brand-600)] stroke-[2.5]"
                              : "text-[var(--color-brand-500)]"
                          }`}
                        />
                        <span
                          className={
                            feat.isHighlight
                              ? "font-semibold text-[var(--color-ink-900)]"
                              : ""
                          }
                        >
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

        {/* Enterprise VIP Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-3xl bg-[var(--color-canvas-dark)] text-[var(--color-ink-on-dark)] p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-tier-3 border border-white/10"
        >
          {/* Subtle brand radiance */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[var(--color-brand-500)]/12 blur-[130px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-brand-100)] text-xs font-semibold tracking-wide backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand-300)]" />
                {ENTERPRISE_PLAN.badge}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[var(--color-brand-300)]" />
                  {ENTERPRISE_PLAN.name} Plan — {ENTERPRISE_PLAN.price}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-brand-100)] font-medium">
                  {ENTERPRISE_PLAN.startingPrice}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-ink-on-dark-muted)] leading-relaxed max-w-2xl">
                {ENTERPRISE_PLAN.tagline}
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
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white text-[var(--color-canvas-dark)] font-semibold text-sm hover:bg-[var(--color-paper-sunken)] transition-all duration-200 text-center shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>{ENTERPRISE_PLAN.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-3 text-xs text-white/50 text-center lg:text-right">
                Custom billing • SOC 2 Reports • Dedicated TAM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
