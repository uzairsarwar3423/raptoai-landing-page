"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface PricingRoiCalculatorProps {
  onSelectPlan?: (planId: string) => void;
}

export function PricingRoiCalculator({ onSelectPlan }: PricingRoiCalculatorProps) {
  const teamSizeId = useId();
  const meetingHoursId = useId();
  const hourlyRateId = useId();

  const [teamSize, setTeamSize] = useState(15);
  const [meetingHoursPerWeek, setMeetingHoursPerWeek] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(75);

  // Time savings: ~2.5 hrs per engineer per week based on 6 meeting hours (~40% efficiency boost in note-taking, follow-ups, and ticket sync)
  const hoursSavedPerEngineerPerWeek = (meetingHoursPerWeek * 0.4);
  const monthlyHoursSavedPerEngineer = hoursSavedPerEngineerPerWeek * 4.33;
  const totalSquadHoursSavedPerMonth = Math.round(teamSize * monthlyHoursSavedPerEngineer);
  const totalMonthlyDollarValue = Math.round(totalSquadHoursSavedPerMonth * hourlyRate);

  // Recommended plan logic
  let recommendedPlan = {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    ctaHref: "https://app.rapto.cloud/register",
  };

  if (teamSize > 60) {
    recommendedPlan = {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 500,
      annualPrice: 500,
      ctaHref: "mailto:sales@rapto.cloud?subject=Enterprise%20Plan%20Inquiry%20-%20Rapto",
    };
  } else if (teamSize > 25) {
    recommendedPlan = {
      id: "business",
      name: "Business",
      monthlyPrice: 199,
      annualPrice: 159,
      ctaHref: "https://app.rapto.cloud/register?plan=business",
    };
  } else if (teamSize > 10) {
    recommendedPlan = {
      id: "growth",
      name: "Growth",
      monthlyPrice: 99,
      annualPrice: 79,
      ctaHref: "https://app.rapto.cloud/register?plan=growth",
    };
  } else if (teamSize > 3) {
    recommendedPlan = {
      id: "starter",
      name: "Starter",
      monthlyPrice: 49,
      annualPrice: 39,
      ctaHref: "https://app.rapto.cloud/register?plan=starter",
    };
  }

  const planCost = recommendedPlan.monthlyPrice;
  const netMonthlyValue = Math.max(0, totalMonthlyDollarValue - planCost);
  const roiMultiple = planCost > 0 ? (totalMonthlyDollarValue / planCost).toFixed(1) : "Infinite";

  return (
    <section className="relative py-20 lg:py-28 bg-[var(--color-paper-sunken)]/40 border-y border-[var(--color-ink-900)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
            <span>Interactive ROI Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Calculate your team’s return on investment.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-700)]">
            See how much engineering time and budget your organization recovers by eliminating forgotten commitments and manual meeting notes.
          </p>
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[var(--color-paper-raised)] rounded-3xl p-6 sm:p-8 border border-[var(--color-ink-900)]/10 shadow-tier-1 space-y-7">
            {/* Slider 1: Team Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor={teamSizeId} className="text-sm font-semibold text-[var(--color-ink-900)]">
                  Engineering & Product Squad Size
                </label>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-base text-[var(--color-brand-700)] px-2.5 py-0.5 rounded-lg bg-[var(--color-brand-50)]">
                  {teamSize} members
                </span>
              </div>
              <input
                id={teamSizeId}
                type="range"
                min={3}
                max={100}
                step={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-paper-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-500)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-ink-500)]">
                <span>3 squad members</span>
                <span>50 members</span>
                <span>100+ members</span>
              </div>
            </div>

            {/* Slider 2: Meeting hours / week */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor={meetingHoursId} className="text-sm font-semibold text-[var(--color-ink-900)]">
                  Avg. Meeting Hours / Week per Person
                </label>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-base text-[var(--color-brand-700)] px-2.5 py-0.5 rounded-lg bg-[var(--color-brand-50)]">
                  {meetingHoursPerWeek} hrs / wk
                </span>
              </div>
              <input
                id={meetingHoursId}
                type="range"
                min={2}
                max={15}
                step={1}
                value={meetingHoursPerWeek}
                onChange={(e) => setMeetingHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-paper-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-500)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-ink-500)]">
                <span>2 hrs / wk (Light)</span>
                <span>6 hrs / wk (Typical)</span>
                <span>15 hrs / wk (Heavy)</span>
              </div>
            </div>

            {/* Slider 3: Hourly compensation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor={hourlyRateId} className="text-sm font-semibold text-[var(--color-ink-900)]">
                  Estimated Hourly Engineering Cost
                </label>
                <span className="inline-flex items-center gap-1 font-mono font-bold text-base text-[var(--color-brand-700)] px-2.5 py-0.5 rounded-lg bg-[var(--color-brand-50)]">
                  ${hourlyRate} / hr
                </span>
              </div>
              <input
                id={hourlyRateId}
                type="range"
                min={40}
                max={150}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-[var(--color-paper-sunken)] rounded-lg appearance-none cursor-pointer accent-[var(--color-brand-500)]"
              />
              <div className="flex justify-between text-[11px] font-mono text-[var(--color-ink-500)]">
                <span>$40 / hr</span>
                <span>$75 / hr ($150k loaded)</span>
                <span>$150 / hr</span>
              </div>
            </div>

            {/* Quick preset buttons */}
            <div className="pt-2 border-t border-[var(--color-ink-900)]/5">
              <p className="text-xs text-[var(--color-ink-500)] mb-2 font-medium">Quick Squad Presets:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Startup Squad (6)", size: 6 },
                  { label: "Growing Team (18)", size: 18 },
                  { label: "Engineering Dept (45)", size: 45 },
                  { label: "Scale-up (85)", size: 85 },
                ].map((preset) => (
                  <button
                    key={preset.size}
                    type="button"
                    onClick={() => setTeamSize(preset.size)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                      teamSize === preset.size
                        ? "bg-[var(--color-brand-600)] text-white"
                        : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)]/80"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-[var(--color-canvas-dark)] text-white rounded-3xl p-6 sm:p-9 border border-white/10 shadow-tier-3 relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-brand-500)]/15 blur-[90px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-wider font-mono text-[var(--color-brand-300)] font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Estimated Monthly Impact
                </span>
                <span className="text-xs text-white/60">
                  For {teamSize} teammates
                </span>
              </div>

              {/* Main Numbers Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
                    <span>Hours Saved / mo</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                    <AnimatedNumber value={totalSquadHoursSavedPerMonth} duration={0.8} />
                    <span className="text-sm font-normal text-white/60 ml-1">hrs</span>
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">
                    ~{(monthlyHoursSavedPerEngineer).toFixed(1)} hrs/member/mo
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-1.5 text-xs text-white/70 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
                    <span>Value Generated / mo</span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-brand-300)] tracking-tight">
                    $<AnimatedNumber value={totalMonthlyDollarValue} duration={0.8} />
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">
                    in developer productivity
                  </p>
                </div>
              </div>

              {/* Plan Recommendation & ROI Box */}
              <div className="bg-[var(--color-brand-900)]/80 rounded-2xl p-5 border border-[var(--color-brand-500)]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--color-brand-300)] font-semibold uppercase tracking-wider">
                      Recommended Plan
                    </p>
                    <h4 className="text-lg font-display font-bold text-white mt-0.5">
                      {recommendedPlan.name} Plan ({planCost === 0 ? "Free" : `$${planCost}/mo flat`})
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-brand-500)] text-white text-xs font-bold shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      {roiMultiple}x ROI
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/10">
                  <span>Net Estimated Monthly Value:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    +${netMonthlyValue.toLocaleString()} / mo
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 pt-6">
              <a
                href={recommendedPlan.ctaHref}
                onClick={() => onSelectPlan?.(recommendedPlan.id)}
                className="w-full py-3.5 px-6 rounded-xl bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white font-semibold text-sm transition-all duration-200 shadow-cta-glow flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>Select {recommendedPlan.name} Plan for {teamSize} Teammates</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-2.5 text-center text-xs text-white/50">
                14-day risk-free trial • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
