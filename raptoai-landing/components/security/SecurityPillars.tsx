"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  KeyRound,
  UserCheck,
  ShieldAlert,
  SearchCheck,
  Sliders,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { SECURITY_PILLARS } from "./security.content";

const iconMap = {
  BrainCircuit,
  KeyRound,
  UserCheck,
  ShieldAlert,
  SearchCheck,
  Sliders,
};

export function SecurityPillars() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper-sunken)]/30 border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
            <Lock className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Comprehensive Defense-in-Depth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
            Six pillars of enterprise trust and privacy.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-600)] leading-relaxed">
            Every layer of our infrastructure, product, and organizational process is built to meet the expectations of Fortune 500 security officers and engineering leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Lock;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[var(--color-paper-raised)] rounded-3xl p-7 border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:shadow-tier-2 hover:border-[var(--color-brand-500)]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-100)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-600)]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[var(--color-ink-900)] mb-2 group-hover:text-[var(--color-brand-700)] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-[var(--color-ink-900)]/10 space-y-2">
                  {pillar.bulletPoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 text-xs text-[var(--color-ink-700)] leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
