"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileLock2,
  FileSignature,
  ArrowRight,
  ExternalLink,
  Lock,
  Activity,
  CheckCircle2,
  Download,
} from "lucide-react";
import { staggerContainer, revealUp } from "@/lib/motion/variants";
import { SECURITY_METRICS, SECURITY_METADATA } from "./security.content";
import { SecurityReportModal } from "./SecurityReportModal";

export function SecurityHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative pt-32 pb-14 sm:pt-40 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--color-paper)]">
        {/* Ambient lighting glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[var(--color-brand-100)]/25 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center w-full"
          >
            {/* Top Eyebrow Badge */}
            <motion.div variants={revealUp} className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-800)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--color-brand-500)] animate-pulse" />
                <span>Zero-Trust Architecture • SOC 2 Type II Certified</span>
              </span>

              <a
                href={SECURITY_METADATA.statusPage}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] transition-colors px-3 py-1 rounded-full bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Systems 100% Operational</span>
                <ExternalLink className="w-3 h-3 ml-0.5 text-[var(--color-ink-400)]" />
              </a>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={revealUp}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight text-[var(--color-ink-900)] leading-[1.06] max-w-4xl"
            >
              Enterprise-grade security by design, not as an afterthought.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={revealUp}
              className="mt-6 text-base sm:text-lg md:text-xl text-[var(--color-ink-700)] max-w-3xl font-normal leading-relaxed"
            >
              Rapto protects your engineering and product meetings with strict zero AI model training, AES-256 envelope encryption, tenant-level cryptographic isolation, and continuous compliance verification.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              variants={revealUp}
              className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-all shadow-tier-1 hover:shadow-tier-2 hover:-translate-y-0.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Request Security Package (SOC 2)</span>
              </button>

              <Link
                href="/legal/dpa"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-[var(--color-paper-raised)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 transition-colors shadow-tier-1"
              >
                <FileSignature className="w-4 h-4 text-[var(--color-brand-600)]" />
                <span>Review DPA & SCCs</span>
              </Link>
            </motion.div>

            {/* Trust Metrics Bar */}
            <motion.div
              variants={revealUp}
              className="mt-14 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-[var(--color-ink-900)]/10"
            >
              {SECURITY_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 text-left flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink-900)] tracking-tight">
                      {metric.value}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--color-ink-900)] mt-1">
                      {metric.label}
                    </p>
                  </div>
                  <p className="text-[11px] text-[var(--color-ink-500)] mt-2 font-mono">
                    {metric.sublabel}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Security Report Modal */}
      <SecurityReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
