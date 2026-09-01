"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, HelpCircle, Sparkles } from "lucide-react";
import { FEATURE_MATRIX_CATEGORIES, MatrixRow } from "@/components/sections/Pricing/pricing.content";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

interface PricingMatrixProps {
  isAnnual: boolean;
  defaultExpanded?: boolean;
}

export function PricingMatrix({ isAnnual, defaultExpanded = true }: PricingMatrixProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <TooltipProvider>
      <section className="relative py-16 lg:py-24 bg-[var(--color-paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header & Toggle */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
              Compare all features & capabilities.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-700)]">
              A detailed breakdown of limits, integrations, governance, and support levels across every plan tier.
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="mt-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors py-2 px-5 rounded-full bg-[var(--color-paper-raised)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 shadow-tier-1"
            >
              {isOpen ? "Collapse comparison matrix" : "Expand full feature matrix"}
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Matrix Container */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto rounded-2xl border border-[var(--color-ink-900)]/10 bg-[var(--color-paper-raised)] shadow-tier-1">
                  <table className="w-full min-w-[760px] text-left border-collapse text-xs sm:text-sm">
                    {/* Sticky Table Header */}
                    <thead className="sticky top-0 z-20 bg-[var(--color-paper-sunken)] border-b border-[var(--color-ink-900)]/10 shadow-sm backdrop-blur-md">
                      <tr>
                        <th className="py-4 px-6 font-semibold text-[var(--color-ink-900)] w-[32%]">
                          Features & Tiers
                        </th>
                        <th className="py-4 px-3 text-center font-semibold text-[var(--color-ink-900)] w-[13%]">
                          <div>Free</div>
                          <div className="text-[11px] font-normal text-[var(--color-ink-500)]">$0/mo</div>
                        </th>
                        <th className="py-4 px-3 text-center font-semibold text-[var(--color-ink-900)] w-[13%]">
                          <div>Starter</div>
                          <div className="text-[11px] font-normal text-[var(--color-ink-500)]">
                            ${isAnnual ? 39 : 49}/mo
                          </div>
                        </th>
                        <th className="py-4 px-3 text-center font-semibold text-[var(--color-brand-700)] bg-[var(--color-brand-25)]/90 border-x border-[var(--color-brand-300)]/30 w-[14%]">
                          <div className="flex items-center justify-center gap-1">
                            <span>Growth</span>
                            <Sparkles className="w-3 h-3 text-[var(--color-brand-600)]" />
                          </div>
                          <div className="text-[11px] font-medium text-[var(--color-brand-600)]">
                            ${isAnnual ? 79 : 99}/mo
                          </div>
                        </th>
                        <th className="py-4 px-3 text-center font-semibold text-[var(--color-ink-900)] w-[14%]">
                          <div>Business</div>
                          <div className="text-[11px] font-normal text-[var(--color-ink-500)]">
                            ${isAnnual ? 159 : 199}/mo
                          </div>
                        </th>
                        <th className="py-4 px-3 text-center font-semibold text-[var(--color-ink-900)] w-[14%]">
                          <div>Enterprise</div>
                          <div className="text-[11px] font-normal text-[var(--color-ink-500)]">Custom</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[var(--color-ink-900)]/5">
                      {FEATURE_MATRIX_CATEGORIES.map((cat, cIdx) => (
                        <Fragment key={cIdx}>
                          {/* Category Header Row */}
                          <tr className="bg-[var(--color-paper-sunken)]/60">
                            <td
                              colSpan={6}
                              className="py-3 px-6 font-mono text-[11px] font-bold text-[var(--color-brand-800)] uppercase tracking-wider"
                            >
                              {cat.category}
                            </td>
                          </tr>

                          {/* Category Feature Rows */}
                          {cat.rows.map((row: MatrixRow, rIdx: number) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-[var(--color-paper-sunken)]/20 transition-colors"
                            >
                              <td className="py-3.5 px-6 font-medium text-[var(--color-ink-900)]">
                                <div className="flex items-center gap-1.5">
                                  <span>{row.feature}</span>
                                  {row.tooltip && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          type="button"
                                          aria-label={`Info about ${row.feature}`}
                                          className="cursor-help inline-flex items-center text-[var(--color-ink-300)] hover:text-[var(--color-ink-700)] transition-colors"
                                        >
                                          <HelpCircle className="w-3.5 h-3.5" />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-xs text-xs">
                                        {row.tooltip}
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-center">{renderMatrixValue(row.free)}</td>
                              <td className="py-3.5 px-3 text-center">{renderMatrixValue(row.starter)}</td>
                              <td className="py-3.5 px-3 text-center bg-[var(--color-brand-25)]/40 border-x border-[var(--color-brand-300)]/20 font-medium">
                                {renderMatrixValue(row.growth)}
                              </td>
                              <td className="py-3.5 px-3 text-center">{renderMatrixValue(row.business)}</td>
                              <td className="py-3.5 px-3 text-center">{renderMatrixValue(row.enterprise)}</td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile scroll hint */}
                <p className="mt-3 text-center text-xs text-[var(--color-ink-500)] lg:hidden">
                  ← Scroll horizontally to view all plan tiers →
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </TooltipProvider>
  );
}

function renderMatrixValue(val: string | boolean) {
  if (val === true) {
    return (
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      </div>
    );
  }
  if (val === false) {
    return <span className="text-[var(--color-ink-300)] font-light text-base">—</span>;
  }
  return <span className="text-[var(--color-ink-900)] font-semibold text-xs">{val}</span>;
}
