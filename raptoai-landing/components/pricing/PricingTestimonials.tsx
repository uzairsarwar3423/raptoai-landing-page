"use client";

import { motion } from "framer-motion";
import { Quote, ShieldCheck, Lock, CheckCircle2, Award } from "lucide-react";
import { PRICING_TESTIMONIALS } from "@/components/sections/Pricing/pricing.content";

export function PricingTestimonials() {
  return (
    <section className="relative py-16 lg:py-24 bg-[var(--color-paper)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security & Compliance Trust Bar */}
        <div className="mb-16 rounded-2xl bg-[var(--color-paper-raised)] p-6 sm:p-8 border border-[var(--color-ink-900)]/10 shadow-tier-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--color-ink-900)]/10">
            <div className="flex flex-col items-center justify-center p-2">
              <ShieldCheck className="w-6 h-6 text-[var(--color-brand-600)] mb-2" />
              <span className="text-xs font-mono font-bold text-[var(--color-ink-900)] uppercase tracking-wider">
                SOC 2 Type II
              </span>
              <span className="text-[11px] text-[var(--color-ink-500)] mt-0.5">
                Certified & Audited
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
              <Lock className="w-6 h-6 text-[var(--color-brand-600)] mb-2" />
              <span className="text-xs font-mono font-bold text-[var(--color-ink-900)] uppercase tracking-wider">
                Zero AI Training
              </span>
              <span className="text-[11px] text-[var(--color-ink-500)] mt-0.5">
                Your data is never used to train LLMs
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
              <CheckCircle2 className="w-6 h-6 text-[var(--color-brand-600)] mb-2" />
              <span className="text-xs font-mono font-bold text-[var(--color-ink-900)] uppercase tracking-wider">
                GDPR & HIPAA Ready
              </span>
              <span className="text-[11px] text-[var(--color-ink-500)] mt-0.5">
                Signed DPAs & BAAs available
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-4 md:pt-2">
              <Award className="w-6 h-6 text-[var(--color-brand-600)] mb-2" />
              <span className="text-xs font-mono font-bold text-[var(--color-ink-900)] uppercase tracking-wider">
                99.9% Uptime SLA
              </span>
              <span className="text-[11px] text-[var(--color-ink-500)] mt-0.5">
                High-availability infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-[var(--color-paper-raised)] p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[var(--color-brand-500)]/30 mb-4" />
                <p className="text-sm sm:text-base text-[var(--color-ink-900)] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-ink-900)]/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-display font-semibold text-[var(--color-ink-900)]">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[var(--color-ink-500)]">
                    {t.role}, {t.company}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-lg sm:text-xl font-display font-bold text-[var(--color-brand-700)]">
                    {t.metric}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-ink-500)]">
                    {t.metricLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
