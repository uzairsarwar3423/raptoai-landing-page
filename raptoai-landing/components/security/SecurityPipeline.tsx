"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  Radio,
  Cpu,
  Lock,
  FileCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ZERO_LEAK_PIPELINE } from "./security.content";

const iconMap = {
  ShieldAlert,
  Radio,
  Cpu,
  Lock,
  FileCheck,
};

export function SecurityPipeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
            <Layers className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Zero-Leak Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
            How Rapto protects your data through every millisecond.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-600)] leading-relaxed">
            From the moment our bot enters a video conference to the cryptographic shredding of deleted transcripts, examine the multi-layered security safeguards protecting your proprietary discussions.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {ZERO_LEAK_PIPELINE.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeStep === idx
                  ? "bg-[var(--color-brand-700)] text-white shadow-tier-1"
                  : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
              }`}
            >
              <span className="font-mono opacity-70">{step.stepNumber}.</span>
              <span>{step.title.split("&")[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Highlight Card */}
        <div className="bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-10 border border-[var(--color-ink-900)]/10 shadow-tier-2 mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-800)] border border-[var(--color-brand-100)] font-mono font-bold text-xs">
                  Stage {ZERO_LEAK_PIPELINE[activeStep]?.stepNumber}
                </span>
                <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {ZERO_LEAK_PIPELINE[activeStep]?.tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[var(--color-ink-900)]">
                {ZERO_LEAK_PIPELINE[activeStep]?.title}
              </h3>

              <p className="text-sm sm:text-base text-[var(--color-ink-700)] leading-relaxed">
                {ZERO_LEAK_PIPELINE[activeStep]?.description}
              </p>

              <div className="pt-4 border-t border-[var(--color-ink-900)]/10 space-y-2.5">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-800)]">
                  Cryptographic & Operational Controls:
                </p>
                <ul className="space-y-2">
                  {ZERO_LEAK_PIPELINE[activeStep]?.technicalDetails.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-700)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Visual Flow diagram representation */}
            <div className="lg:col-span-5 bg-[var(--color-canvas-dark)] text-white p-6 sm:p-7 rounded-2xl border border-white/10 shadow-tier-3 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-white/60">
                  <span>PIPELINE TELEMETRY</span>
                  <span className="text-[var(--color-brand-300)]">ISOLATED TENANT</span>
                </div>

                <div className="py-6 space-y-3 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-between">
                    <span>STATUS:</span>
                    <span>ENCRYPTED & RUNNING</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80 flex items-center justify-between">
                    <span>TRANSPORT:</span>
                    <span>TLS 1.3 / PFS / mTLS</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80 flex items-center justify-between">
                    <span>INFERENCE:</span>
                    <span>ZERO DATA RETENTION (ZDR)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white/80 flex items-center justify-between">
                    <span>STORAGE:</span>
                    <span>AES-256-GCM / AWS KMS</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60 font-mono">
                <span>STAGE {activeStep + 1} OF 5</span>
                <span className="text-[var(--color-brand-300)]">100% ISOLATED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ZERO_LEAK_PIPELINE.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap] || ShieldAlert;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? "bg-[var(--color-paper-raised)] border-[var(--color-brand-500)] shadow-tier-2 ring-2 ring-[var(--color-brand-500)]/20"
                    : "bg-[var(--color-paper-raised)]/60 border-[var(--color-ink-900)]/10 hover:border-[var(--color-brand-500)]/30 hover:bg-[var(--color-paper-raised)]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[var(--color-brand-700)]">
                      {step.stepNumber}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? "text-[var(--color-brand-600)]" : "text-[var(--color-ink-400)]"}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-display font-semibold text-[var(--color-ink-900)] mb-1">
                    {step.title}
                  </h4>
                </div>

                <span className="text-[10px] font-mono text-[var(--color-ink-500)] mt-3 block">
                  {step.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
