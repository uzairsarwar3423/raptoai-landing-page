"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Printer,
  ArrowLeft,
  Calendar,
  Share2,
  Check,
  Building2,
  Clock,
  Sparkles,
} from "lucide-react";
import { TERMS_METADATA } from "./terms.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

interface TermsHeroProps {
  viewMode: "all" | "plain" | "legal";
  setViewMode: (mode: "all" | "plain" | "legal") => void;
}

export function TermsHero({ viewMode, setViewMode }: TermsHeroProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--color-paper)]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[480px] bg-[var(--color-brand-100)]/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Breadcrumb & Legal Badge */}
          <motion.div variants={revealUp} className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] transition-colors px-3.5 py-1.5 rounded-full bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:bg-[var(--color-paper-sunken)]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[var(--color-brand-500)] animate-pulse" />
              <span>Legal & Governance</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] text-xs font-medium">
              <Clock className="w-3 h-3 text-[var(--color-ink-500)]" />
              <span>~5 min read</span>
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={revealUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.08]"
          >
            Terms of Service
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={revealUp}
            className="mt-5 text-base sm:text-lg text-[var(--color-ink-700)] max-w-2xl font-normal leading-relaxed"
          >
            Clear, transparent, and plain-English terms designed for engineering and product teams. You own 100% of your data, zero AI model training, and cancel anytime with no lock-in.
          </motion.p>

          {/* Reading Mode Switcher - Key UI/UX Feature for simplicity */}
          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 bg-[var(--color-paper-raised)] p-1.5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1"
          >
            <span className="text-xs font-semibold text-[var(--color-ink-500)] px-3 hidden sm:inline flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>View Mode:</span>
            </span>

            <div className="grid grid-cols-3 gap-1 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setViewMode("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "all"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)]"
                }`}
              >
                Complete (Dual-Layer)
              </button>

              <button
                type="button"
                onClick={() => setViewMode("plain")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "plain"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)]"
                }`}
              >
                Plain English Only
              </button>

              <button
                type="button"
                onClick={() => setViewMode("legal")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "legal"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)]"
                }`}
              >
                Legal Clauses Only
              </button>
            </div>
          </motion.div>

          {/* Quick Utility Actions */}
          <motion.div
            variants={revealUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--color-paper-raised)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 transition-colors shadow-tier-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              <span>Print or Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 transition-colors shadow-tier-1 cursor-pointer"
              title="Copy Page URL"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                  <span className="text-[var(--color-brand-700)] font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Terms</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Metadata bar */}
          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[var(--color-ink-500)] font-medium pt-5 border-t border-[var(--color-ink-900)]/10 w-full max-w-2xl"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Effective: {TERMS_METADATA.effectiveDate}</span>
            </span>
            <span className="hidden sm:inline text-[var(--color-ink-300)]">•</span>
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Version {TERMS_METADATA.version}</span>
            </span>
            <span className="hidden sm:inline text-[var(--color-ink-300)]">•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
              <span>Jurisdiction: California, USA</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
