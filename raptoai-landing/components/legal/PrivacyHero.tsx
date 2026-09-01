"use client";

import { motion } from "framer-motion";
import { Shield, Printer, ArrowLeft, Calendar, FileText } from "lucide-react";
import { PRIVACY_METADATA } from "./privacy.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function PrivacyHero() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--color-paper)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[var(--color-brand-100)]/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Back link & Eyebrow */}
          <motion.div variants={revealUp} className="flex items-center gap-3 mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] transition-colors px-3 py-1 rounded-full bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Legal & Compliance</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={revealUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.08]"
          >
            Rapto Privacy Policy
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={revealUp}
            className="mt-5 text-base sm:text-lg text-[var(--color-ink-700)] max-w-2xl font-normal leading-relaxed"
          >
            How we protect, encrypt, and manage your data with strict zero AI training retention, SOC 2 compliance, and transparent customer data ownership.
          </motion.p>

          {/* Metadata bar & Print Action */}
          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[var(--color-ink-500)] font-medium pt-4 border-t border-[var(--color-ink-900)]/10 w-full max-w-2xl"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Effective: {PRIVACY_METADATA.effectiveDate}</span>
            </span>
            <span className="hidden sm:inline text-[var(--color-ink-300)]">•</span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Version {PRIVACY_METADATA.version}</span>
            </span>
            <span className="hidden sm:inline text-[var(--color-ink-300)]">•</span>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] font-semibold transition-colors cursor-pointer hover:underline"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print or Save PDF</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
