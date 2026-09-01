"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { TERMS_HIGHLIGHTS } from "./terms.content";

const iconMap = {
  Database,
  ShieldCheck,
  Zap,
  CheckCircle2,
};

export function TermsHighlights() {
  return (
    <section className="relative pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)]">
            Terms at a Glance
          </p>
          <h2 className="text-xl sm:text-2xl font-display font-medium text-[var(--color-ink-900)] mt-1">
            Core commitments in 30 seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TERMS_HIGHLIGHTS.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-[var(--color-paper-raised)] p-6 border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-brand-500)]/30 hover:shadow-tier-2 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] flex items-center justify-center text-[var(--color-brand-600)] border border-[var(--color-brand-100)]">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-800)] border border-[var(--color-brand-100)]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
