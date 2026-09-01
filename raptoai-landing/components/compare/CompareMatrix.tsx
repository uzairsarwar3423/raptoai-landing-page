"use client";

import { Fragment } from "react";
import { Check, X, HelpCircle, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import {
  COMPETITORS,
  COMPARISON_FEATURES,
  ComparisonFeatureRow,
  CompetitorProfile,
} from "./compare.content";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/Tooltip";

interface CompareMatrixProps {
  selectedCompetitorId: string;
  onSelectCompetitor: (id: string) => void;
}

export function CompareMatrix({ selectedCompetitorId, onSelectCompetitor }: CompareMatrixProps) {
  const activeCompetitor = COMPETITORS.find((c) => c.id === selectedCompetitorId);
  const isSingleCompetitorView = Boolean(activeCompetitor);

  // Group features by category
  const categories = Array.from(
    new Set(COMPARISON_FEATURES.map((f) => f.category))
  );

  return (
    <TooltipProvider>
      <section id="compare-matrix" className="relative py-16 lg:py-24 bg-[var(--color-paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
              {isSingleCompetitorView && activeCompetitor
                ? `Rapto vs. ${activeCompetitor.name} Breakdown`
                : "Feature & Capability Matrix"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-700)]">
              {isSingleCompetitorView && activeCompetitor
                ? `A factual, side-by-side comparison between Rapto and ${activeCompetitor.name}.`
                : "An exhaustive side-by-side comparison across memory, issue sync, security, and pricing."}
            </p>
          </div>

          {/* If Single Competitor Selected: Show Verdict & Strengths Card */}
          {activeCompetitor && (
            <div className="mb-12 rounded-3xl bg-[var(--color-paper-raised)] p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold">
                  <span>Category: {activeCompetitor.category}</span>
                </div>

                <h3 className="text-2xl font-display font-bold text-[var(--color-ink-900)]">
                  {activeCompetitor.verdictHeadline}
                </h3>

                <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                  {activeCompetitor.verdictDescription}
                </p>

                <div className="pt-2">
                  <p className="text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Best suited for:
                  </p>
                  <p className="text-xs text-[var(--color-ink-700)] bg-[var(--color-paper-sunken)] p-3 rounded-xl">
                    {activeCompetitor.bestFor}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5 bg-[var(--color-paper-sunken)]/50 p-5 rounded-2xl border border-[var(--color-ink-900)]/5">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ember-600)] mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Key Limitations for Dev & Product Teams
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--color-ink-700)]">
                    {activeCompetitor.keyWeaknessesForEngineering.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[var(--color-ink-900)]/10">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-ink-700)] mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                    What {activeCompetitor.name} Does Well
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--color-ink-700)]">
                    {activeCompetitor.keyStrengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Side-by-Side Comparison Table */}
          <div className="overflow-x-auto rounded-3xl border border-[var(--color-ink-900)]/10 bg-[var(--color-paper-raised)] shadow-tier-2">
            <table className="w-full min-w-[780px] text-left border-collapse text-xs sm:text-sm">
              {/* Sticky Header */}
              <thead className="sticky top-0 z-20 bg-[var(--color-paper-sunken)] border-b border-[var(--color-ink-900)]/10 shadow-sm backdrop-blur-md">
                <tr>
                  <th className="py-4 px-6 font-semibold text-[var(--color-ink-900)] w-[30%]">
                    Capabilities & Features
                  </th>

                  {/* Rapto Column (Hero) */}
                  <th className="py-4 px-4 text-center font-semibold text-[var(--color-brand-800)] bg-[var(--color-brand-25)] border-x border-[var(--color-brand-300)]/30 w-[24%]">
                    <div className="inline-flex items-center gap-1 font-bold text-sm">
                      <span>Rapto</span>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-600)] fill-current" />
                    </div>
                    <div className="text-[11px] font-medium text-[var(--color-brand-700)]">
                      Accountability Layer
                    </div>
                  </th>

                  {/* If Single Competitor: 1 Column. If All: 4 Columns */}
                  {isSingleCompetitorView && activeCompetitor ? (
                    <th className="py-4 px-4 text-center font-semibold text-[var(--color-ink-900)] w-[24%]">
                      <div className="font-bold text-sm">{activeCompetitor.name}</div>
                      <div className="text-[11px] font-normal text-[var(--color-ink-500)]">
                        {activeCompetitor.category}
                      </div>
                    </th>
                  ) : (
                    COMPETITORS.map((comp) => (
                      <th
                        key={comp.id}
                        className="py-4 px-3 text-center font-semibold text-[var(--color-ink-900)] w-[11.5%]"
                      >
                        <div className="font-bold text-xs">{comp.name}</div>
                        <div className="text-[10px] font-normal text-[var(--color-ink-500)] truncate">
                          {comp.startingPrice}
                        </div>
                      </th>
                    ))
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--color-ink-900)]/5">
                {categories.map((cat, cIdx) => {
                  const rows = COMPARISON_FEATURES.filter((f) => f.category === cat);

                  return (
                    <Fragment key={cIdx}>
                      {/* Category Title Row */}
                      <tr className="bg-[var(--color-paper-sunken)]/60">
                        <td
                          colSpan={isSingleCompetitorView ? 3 : 6}
                          className="py-3 px-6 font-mono text-[11px] font-bold text-[var(--color-brand-800)] uppercase tracking-wider"
                        >
                          {cat}
                        </td>
                      </tr>

                      {/* Feature Rows */}
                      {rows.map((row: ComparisonFeatureRow, rIdx: number) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-[var(--color-paper-sunken)]/20 transition-colors"
                        >
                          {/* Feature Name & Tooltip */}
                          <td className="py-4 px-6 font-medium text-[var(--color-ink-900)]">
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

                          {/* Rapto Column Value */}
                          <td className="py-4 px-4 text-center bg-[var(--color-brand-25)]/40 border-x border-[var(--color-brand-300)]/20">
                            {renderCell(row.raptoValue, true, row.raptoDetail)}
                          </td>

                          {/* Competitor Column(s) */}
                          {isSingleCompetitorView && activeCompetitor ? (
                            <td className="py-4 px-4 text-center">
                              {renderCell(
                                row.competitorValues[activeCompetitor.id] ?? false,
                                false
                              )}
                            </td>
                          ) : (
                            COMPETITORS.map((comp) => (
                              <td key={comp.id} className="py-4 px-3 text-center">
                                {renderCell(
                                  row.competitorValues[comp.id] ?? false,
                                  false
                                )}
                              </td>
                            ))
                          )}
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Quick Switch CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--color-paper-sunken)]/60 border border-[var(--color-ink-900)]/10 text-xs">
            <span className="text-[var(--color-ink-700)]">
              Switching from {activeCompetitor ? activeCompetitor.name : "another tool"}? Test Rapto free with your squad.
            </span>
            <a
              href="https://app.rapto.cloud/register"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-brand-600)] text-white font-semibold hover:bg-[var(--color-brand-700)] transition-colors shrink-0 shadow-sm"
            >
              <span>Start 14-Day Squad Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}

function renderCell(val: string | boolean, isRapto = false, detail?: string) {
  if (val === true) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <span
          className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
            isRapto
              ? "bg-[var(--color-brand-50)] text-[var(--color-brand-600)]"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
        {detail && <span className="text-[10px] text-[var(--color-brand-700)] font-medium leading-tight max-w-[180px]">{detail}</span>}
      </div>
    );
  }

  if (val === false) {
    return <span className="text-[var(--color-ink-300)] font-light text-lg">—</span>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-0.5">
      <span
        className={`font-semibold text-xs ${
          isRapto ? "text-[var(--color-brand-800)]" : "text-[var(--color-ink-900)]"
        }`}
      >
        {val}
      </span>
      {detail && <span className="text-[10px] text-[var(--color-ink-500)] leading-tight max-w-[180px]">{detail}</span>}
    </div>
  );
}
