"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileLock2, ServerCog, Clock, CheckCircle2 } from "lucide-react";
import { DPA_HIGHLIGHTS } from "./dpa.content";

const iconMap = {
  ShieldCheck,
  FileLock2,
  ServerCog,
  Clock,
};

export function DPAHighlights() {
  return (
    <section className="relative pb-14 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Enterprise Compliance Pillars</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DPA_HIGHLIGHTS.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative rounded-2xl bg-[var(--color-paper-raised)] p-6 border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-brand-500)]/40 hover:shadow-tier-2 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] flex items-center justify-center text-[var(--color-brand-600)] border border-[var(--color-brand-100)] group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    {item.tag && (
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-600)]">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)] mb-2 group-hover:text-[var(--color-brand-700)] transition-colors">
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
