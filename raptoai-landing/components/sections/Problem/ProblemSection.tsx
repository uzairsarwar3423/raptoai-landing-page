"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { problemHeader, problemStats } from "./problem.content";
import { DecayGauge } from "./visuals/DecayGauge";
import { ChasingLoopVisual } from "./visuals/ChasingLoopVisual";
import { DriftVectorVisual } from "./visuals/DriftVectorVisual";
import { PromiseLifecycleComparison } from "./visuals/PromiseLifecycleComparison";
import { staggerContainer, revealUp } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

export interface ProblemSectionProps {
  className?: string;
  id?: string;
}

export function ProblemSection({
  className,
  id = "problem",
}: ProblemSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 sm:py-32 relative z-10 w-full overflow-hidden bg-[var(--color-paper)] cost-stats-bg-pattern border-t border-black/[0.04] dark:border-white/[0.04]",
        className
      )}
    >
      {/* Ambient luxury focal glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-orange-500/[0.03] dark:bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <Container className="flex flex-col gap-12 sm:gap-16 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={revealUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 dark:bg-orange-950/40 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            {problemHeader.eyebrow}
          </motion.div>

          {/* Display Headline */}
          <motion.h2
            variants={revealUp}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[var(--color-ink-900)] tracking-tight leading-[1.08] mb-6"
          >
            This isn&apos;t a note-taking problem.
            <br />
            <span className="text-[var(--color-ink-500)] dark:text-neutral-400 font-normal">
              It&apos;s a follow-through problem.
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={revealUp}
            className="text-base sm:text-lg text-[var(--color-ink-700)] dark:text-neutral-300 leading-relaxed max-w-2xl font-medium"
          >
            {problemHeader.subhead}
          </motion.p>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            3-Panel Minimalist Visual Bento
           ──────────────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {problemStats.map((stat, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const isThird = idx === 2;

            return (
              <motion.div
                key={stat.id}
                variants={revealUp}
                className={cn(
                  "rounded-2xl bg-white/90 dark:bg-neutral-900/90 border border-black/[0.07] dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.08)] transition-all duration-500 backdrop-blur-md group hover:-translate-y-1 relative overflow-hidden"
                )}
              >
                {/* Subtle top card highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />

                {/* Top Section: Tag + Micro Visual */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider",
                      stat.tagStatus === "critical" &&
                        "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
                      stat.tagStatus === "warning" &&
                        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
                      stat.tagStatus === "caution" &&
                        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    )}
                  >
                    {stat.tag}
                  </span>

                  {/* Top-Right Telemetry Symbol */}
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                    [0{idx + 1}_DIAG]
                  </span>
                </div>

                {/* Center Visual Showcase */}
                <div className="w-full flex items-center justify-center my-2 mb-6">
                  {isFirst && <DecayGauge value={70} />}
                  {isSecond && <ChasingLoopVisual />}
                  {isThird && <DriftVectorVisual />}
                </div>

                {/* Bottom Section: Stat Number, Title, & Copy */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-900)] dark:text-white">
                      {stat.metric}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 font-semibold">
                      {stat.impactLabel}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                    {stat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            Interactive Visual: 7-Day Promise Lifecycle Diagnostic
           ──────────────────────────────────────────────────────────── */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full mt-4"
        >
          <PromiseLifecycleComparison />
        </motion.div>

        {/* Footnote telemetry citation */}
        <motion.p
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-[10px] sm:text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-semibold"
        >
          Aggregate Workplace Follow-Through &amp; Meeting Accountability Telemetry · 2025–2026
        </motion.p>
      </Container>
    </section>
  );
}

export default ProblemSection;
