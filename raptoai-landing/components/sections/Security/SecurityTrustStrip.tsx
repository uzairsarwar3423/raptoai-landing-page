"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, Server, ArrowRight } from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

const SECURITY_PILLARS = [
  {
    icon: EyeOff,
    title: "Zero Model Training",
    description: "Your meeting audio and transcripts are never used to train foundation or commercial AI models.",
  },
  {
    icon: ShieldCheck,
    title: "SOC-2 Type II Certified",
    description: "Rigorously audited enterprise controls, continuous compliance monitoring, and annual third-party pen tests.",
  },
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description: "Encrypted at rest with AES-256 and in transit with TLS 1.3. Multi-tenant isolation at the database layer.",
  },
  {
    icon: Server,
    title: "Custom Data Retention",
    description: "Automated retention schedules from 7 days to indefinite with cryptographic permanent purge on demand.",
  },
];

export function SecurityTrustStrip() {
  return (
    <section
      id="enterprise-security"
      aria-labelledby="security-heading"
      className="relative bg-[var(--color-paper)] py-20 sm:py-24 border-t border-[var(--color-ink-900)]/5 overflow-hidden content-auto"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <motion.div variants={revealUp} className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-[var(--color-brand-500)]" />
              <span className="inline-flex items-center gap-1.5 text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Security &amp; Compliance
              </span>
            </motion.div>

            <motion.h2
              id="security-heading"
              variants={revealUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.1]"
            >
              Bank-grade privacy.{" "}
              <span className="text-[var(--color-brand-600)]">Zero AI model training.</span>
            </motion.h2>
          </div>

          <motion.div variants={revealUp}>
            <Link
              href="/security"
              className="inline-flex items-center gap-1.5 font-semibold text-sm text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline whitespace-nowrap"
            >
              Review complete Security Whitepaper
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* 4-Card Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECURITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 p-6 flex flex-col justify-between shadow-tier-1 hover:shadow-tier-2 hover:border-[var(--color-brand-500)]/30 transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)] flex items-center justify-center mb-4 border border-[var(--color-brand-200)]/50">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)] mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-ink-600)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[var(--color-ink-900)]/5 flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-brand-700)] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)]" />
                  Enterprise Verified
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
