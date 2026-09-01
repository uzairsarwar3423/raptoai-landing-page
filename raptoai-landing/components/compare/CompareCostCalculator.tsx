"use client";

import { useState, useId } from "react";
import { DollarSign, TrendingDown, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function CompareCostCalculator() {
  const squadSizeId = useId();
  const [squadSize, setSquadSize] = useState(18);

  // Competitor average: $24/seat/mo on annual billing (Fireflies Business / Otter Pro / Fathom Team)
  const competitorSeatPrice = 24;
  const competitorMonthlyCost = squadSize * competitorSeatPrice;
  const competitorAnnualCost = competitorMonthlyCost * 12;

  // Rapto Flat Pricing
  let raptoMonthlyPrice = 39;
  let raptoPlanName = "Starter";

  if (squadSize > 25) {
    raptoMonthlyPrice = 159;
    raptoPlanName = "Business";
  } else if (squadSize > 10) {
    raptoMonthlyPrice = 79;
    raptoPlanName = "Growth";
  }

  const raptoAnnualCost = raptoMonthlyPrice * 12;
  const annualSavings = Math.max(0, competitorAnnualCost - raptoAnnualCost);
  const savingsPercent = Math.round((annualSavings / competitorAnnualCost) * 100);

  return (
    <section className="relative py-20 lg:py-28 bg-[var(--color-canvas-dark)] text-white overflow-hidden">
      {/* Radiant glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[var(--color-brand-500)]/12 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-brand-100)] border border-white/10 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
            <span>License Math: Flat vs. Per-Seat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight">
            Stop paying the per-seat meeting tax.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-on-dark-muted)]">
            Traditional tools punish you for adding engineers and PMs. See how much your organization saves with Rapto’s flat squad rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white/5 rounded-3xl p-7 sm:p-9 border border-white/10 shadow-tier-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={squadSizeId} className="text-sm font-semibold text-white">
                  Engineering & Product Squad Size
                </label>
                <span className="font-mono font-bold text-base text-[var(--color-brand-300)] px-3 py-1 rounded-xl bg-white/10 border border-white/10">
                  {squadSize} members
                </span>
              </div>
              <input
                id={squadSizeId}
                type="range"
                min={5}
                max={60}
                step={1}
                value={squadSize}
                onChange={(e) => setSquadSize(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-500)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-white/50 mt-1.5">
                <span>5 members</span>
                <span>25 members</span>
                <span>60 members</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-white/60 mb-1">Per-Seat Tools (Fireflies/Otter)</p>
                <div className="text-xl sm:text-2xl font-display font-bold text-red-400">
                  $<AnimatedNumber value={competitorMonthlyCost} duration={0.8} />
                  <span className="text-xs font-normal text-white/50"> / mo</span>
                </div>
                <p className="text-[11px] text-white/40 mt-1">
                  ${competitorAnnualCost.toLocaleString()}/yr @ $24/seat
                </p>
              </div>

              <div className="bg-[var(--color-brand-900)]/80 rounded-2xl p-4 border border-[var(--color-brand-500)]/30">
                <p className="text-xs text-[var(--color-brand-200)] mb-1">Rapto ({raptoPlanName} Flat)</p>
                <div className="text-xl sm:text-2xl font-display font-bold text-[var(--color-brand-300)]">
                  $<AnimatedNumber value={raptoMonthlyPrice} duration={0.8} />
                  <span className="text-xs font-normal text-white/50"> / mo</span>
                </div>
                <p className="text-[11px] text-[var(--color-brand-200)]/70 mt-1">
                  ${raptoAnnualCost.toLocaleString()}/yr flat
                </p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed pt-2 border-t border-white/10">
              *Calculated based on standard annual SaaS seat rates ($24/seat/mo) across 15–25 team members.
            </p>
          </div>

          {/* Savings Outcome Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[var(--color-brand-900)] to-[var(--color-canvas-dark-raised)] rounded-3xl p-8 sm:p-10 border border-[var(--color-brand-500)]/40 shadow-tier-3 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider font-mono text-[var(--color-brand-300)] font-semibold flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  Your Software License Savings
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-brand-500)] text-white text-xs font-bold">
                  <Sparkles className="w-3 h-3" />
                  {savingsPercent}% Lower Cost
                </span>
              </div>

              <div>
                <p className="text-sm text-white/80">
                  Annual License Budget Saved:
                </p>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--color-brand-300)] tracking-tight mt-1">
                  $<AnimatedNumber value={annualSavings} duration={0.8} />
                  <span className="text-sm sm:text-base font-normal text-white/60 ml-2">/ year</span>
                </div>
                <p className="mt-2 text-xs text-white/70">
                  Plus recovered engineering hours from automated Linear and Jira follow-ups.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://app.rapto.cloud/register"
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white font-semibold text-sm transition-all duration-200 shadow-cta-glow flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Start Free 14-Day Squad Trial</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
