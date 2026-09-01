"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Database, FileCheck } from "lucide-react";
import { PRIVACY_HIGHLIGHTS } from "./privacy.content";

const iconMap = {
  ShieldCheck,
  Lock,
  Database,
  FileCheck,
};

export function PrivacyHighlights() {
  return (
    <section className="relative pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)]">
            Privacy at a Glance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRIVACY_HIGHLIGHTS.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="rounded-2xl bg-[var(--color-paper-raised)] p-6 border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-brand-500)]/30 hover:shadow-tier-2 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] flex items-center justify-center mb-4 text-[var(--color-brand-600)] border border-[var(--color-brand-100)]">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
