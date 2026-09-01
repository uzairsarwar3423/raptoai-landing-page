"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  VideoCamera,
  Sparkle,
  UsersThree,
  ArrowsClockwise,
  CheckCircle,
  CaretRight,
} from "@phosphor-icons/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import IsometricBox01 from "@/assets/svgs/isometric-box-01";
import IsometricBoxes02 from "@/assets/svgs/isometric-boxes-02";
import { cn } from "@/lib/utils";

// Curated high-resolution professional avatars for team collaboration showcase
const DEFAULT_TEAM_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
];

// Rapto AI Meeting Pipeline Steps
const PIPELINE_STEPS = [
  { id: "01", label: "RECORD", Icon: VideoCamera },
  { id: "02", label: "EXTRACT", Icon: Sparkle },
  { id: "03", label: "ASSIGN", Icon: UsersThree },
  { id: "04", label: "SYNC", Icon: ArrowsClockwise },
  { id: "05", label: "RESOLVE", Icon: CheckCircle },
];

export interface WhyUsBentoProps {
  className?: string;
  teamAvatars?: string[];
  id?: string;
}

export function WhyUsBento({
  className,
  teamAvatars = DEFAULT_TEAM_AVATARS,
  id = "why-rapto",
}: WhyUsBentoProps) {
  const animatedTitle = "AI & Commitment Intelligence";

  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28 relative z-10 w-full overflow-hidden bg-[var(--color-paper)]",
        className
      )}
    >
      <Container className="flex flex-col gap-10 sm:gap-14">
        {/* Section Heading */}
        <SectionHeading
          align="center"
          eyebrow="WHY RAPTO AI"
          headline="The Intelligence Layer After Your Meeting Ends"
          subhead="Most meeting notes gather dust. Rapto converts spoken commitments into autonomous follow-ups, verified deliverables, and measurable team accountability."
        />

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
          {/* ────────────────────────────────────────────────────────────
              01: AI & Commitment Intelligence (Wide Top Card)
             ──────────────────────────────────────────────────────────── */}
          <motion.div
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-2 row-span-1 rounded-2xl bg-white dark:bg-neutral-900/90 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] min-h-[220px] sm:min-h-[250px]"
          >
            {/* Visual: Isometric 3D AI Core Node on the right */}
            <div className="absolute right-2 sm:right-6 md:-right-2 lg:right-6 top-1/2 -translate-y-1/2 w-44 sm:w-56 md:w-64 lg:w-72 z-20 hidden sm:block pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500">
              <IsometricBox01 className="w-full h-auto" />
            </div>

            <div className="relative z-30 w-full sm:w-3/5 md:w-3/5">
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2.5 relative overflow-hidden flex flex-wrap tracking-tight">
                <span className="flex">
                  {animatedTitle.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" },
                      }}
                      transition={{
                        duration: 0.28,
                        delay: i * 0.015,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
                <span
                  className="absolute inset-0 flex text-[var(--color-brand-500)] dark:text-[var(--color-brand-400)] pointer-events-none"
                  aria-hidden
                >
                  {animatedTitle.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={{
                        initial: { y: "100%" },
                        hover: { y: 0 },
                      }}
                      transition={{
                        duration: 0.28,
                        delay: i * 0.015,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </span>
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                Rapto&apos;s high-precision neural parser extracts every spoken
                commitment, owner, and deadline directly from live meeting
                transcripts with 99.4% accuracy.
              </p>
            </div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────────
              02: End-to-End Execution (Tall Obsidian Card)
             ──────────────────────────────────────────────────────────── */}
          <div className="col-span-1 md:col-span-1 row-span-1 md:row-span-2 rounded-2xl bg-[var(--color-canvas-dark,#0B1512)] p-6 sm:p-8 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between text-white border border-emerald-900/30 shadow-[0_8px_30px_rgba(0,0,0,0.25)] min-h-[380px] sm:min-h-[440px]">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* Visual: Interactive Stacked 3D Cards */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px] mb-4">
              <div className="relative w-full max-w-[190px] sm:max-w-[220px] aspect-[4/3] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out">
                {/* Back card 4 */}
                <div className="absolute inset-0 bg-neutral-800/80 rounded-xl border border-neutral-700/50 transform -rotate-12 -translate-x-3 translate-y-3 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-20deg] group-hover:-translate-x-6 group-hover:translate-y-6" />
                {/* Back card 3 */}
                <div className="absolute inset-0 bg-neutral-700/80 rounded-xl border border-neutral-600/50 transform -rotate-9 -translate-x-2.5 translate-y-2.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-15deg] group-hover:-translate-x-5 group-hover:translate-y-5" />
                {/* Back card 2 */}
                <div className="absolute inset-0 bg-neutral-600/80 rounded-xl border border-neutral-500/50 transform -rotate-6 -translate-x-1.5 translate-y-1.5 shadow-xl transition-all duration-300 ease-out group-hover:rotate-[-10deg] group-hover:-translate-x-3 group-hover:translate-y-3" />
                {/* Back card 1 */}
                <div className="absolute inset-0 bg-neutral-500/80 rounded-xl border border-neutral-400/50 transform -rotate-3 -translate-x-1 translate-y-1 shadow-xl transition-all duration-300 ease-out group-hover:-rotate-5 group-hover:-translate-x-1.5 group-hover:translate-y-1.5" />

                {/* Front card — Rapto Promise Terminal */}
                <div
                  className="absolute inset-0 bg-neutral-950 rounded-xl p-4 sm:p-5 flex flex-col justify-between text-white shadow-2xl border border-emerald-500/30"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.06) 1px, transparent 1px)",
                    backgroundSize: "12px 12px",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-widest font-semibold">
                      RAPTO CORE
                    </span>
                  </div>

                  <div className="font-mono text-[13px] sm:text-[15px] font-bold leading-[1.25] tracking-tight mt-auto mb-3 text-neutral-200">
                    Spoken Promise.
                    <br />
                    <span className="text-emerald-400">Autonomous Follow-Up.</span>
                    <br />
                    Verified Deliverable.
                  </div>

                  <div className="font-mono text-[8px] sm:text-[9px] text-emerald-400/90 font-bold uppercase tracking-wider flex items-center justify-between border-t border-white/10 pt-2">
                    <span>&gt; STATUS: RESOLVED</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
                From Spoken Word to Done
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Never let an agreement get lost. Rapto tracks every promise
                across every subsequent sync until it is marked fulfilled.
              </p>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────────
              03: Multi-Stakeholder Sync (Avatar Stack)
             ──────────────────────────────────────────────────────────── */}
          <motion.div
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-1 row-span-1 rounded-2xl bg-white dark:bg-neutral-900/90 backdrop-blur-md p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] min-h-[210px] sm:min-h-[230px]"
          >
            {/* Stacked Interactive Avatars */}
            <div className="flex items-center relative z-10 mb-4 h-10 sm:h-11">
              {teamAvatars.map((src, i) => (
                <motion.div
                  key={i}
                  className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white dark:ring-neutral-900 shadow-md bg-neutral-200 dark:bg-neutral-800"
                  style={{
                    marginLeft: i === 0 ? 0 : "-12px",
                    zIndex: teamAvatars.length - i,
                  }}
                  variants={{
                    initial: { x: 0, y: 0, rotate: 0, scale: 1 },
                    hover: {
                      x: i * 14,
                      y: i % 2 === 0 ? -4 : 4,
                      rotate: (i - 2) * 6,
                      scale: 1.12,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 22,
                  }}
                >
                  <Image
                    src={src}
                    alt="Team member"
                    fill
                    sizes="40px"
                    className="object-cover object-center"
                    unoptimized
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-1.5 tracking-tight">
                Multi-Stakeholder Sync
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Connects engineering, product, and leadership with personalized
                commitment scores and zero friction.
              </p>
            </div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────────
              04: Zero Manual Handoffs (Pipeline Flow)
             ──────────────────────────────────────────────────────────── */}
          <motion.div
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-1 row-span-1 rounded-2xl bg-white dark:bg-neutral-900/90 backdrop-blur-md p-6 sm:p-7 relative overflow-hidden group transition-all duration-500 flex flex-col justify-between border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] min-h-[210px] sm:min-h-[230px]"
          >
            {/* Pipeline Visual */}
            <div className="relative z-10 w-full mb-4">
              <div className="flex items-center justify-between">
                {PIPELINE_STEPS.map(({ id, label, Icon }, i) => (
                  <React.Fragment key={id}>
                    <div className="flex flex-col items-center gap-1">
                      <div className="relative p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-colors">
                        <Icon
                          size={18}
                          weight="fill"
                          className="text-neutral-800 dark:text-neutral-200 group-hover:text-[var(--color-brand-500)] transition-colors"
                        />
                        {i === PIPELINE_STEPS.length - 1 && (
                          <span className="absolute -inset-1 rounded-full bg-emerald-500/20 animate-ping" />
                        )}
                      </div>
                      <span className="text-[7px] sm:text-[8px] text-neutral-600 dark:text-neutral-400 font-mono font-bold tracking-wider">
                        {label}
                      </span>
                    </div>

                    {i < PIPELINE_STEPS.length - 1 && (
                      <div className="text-neutral-300 dark:text-neutral-600 group-hover:text-emerald-500 transition-colors duration-300">
                        <CaretRight size={10} weight="bold" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-1.5 tracking-tight">
                Zero Manual Handoffs
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Instantly dispatches action items and status updates directly
                into Slack, Jira, Linear, and Notion without anyone taking notes.
              </p>
            </div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────────
              05: Enterprise-Grade Intelligence (Wide Bottom Card)
             ──────────────────────────────────────────────────────────── */}
          <motion.div
            initial="initial"
            whileHover="hover"
            className="col-span-1 md:col-span-3 row-span-1 rounded-2xl bg-white dark:bg-neutral-900/90 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden group transition-all duration-500 flex flex-col justify-center border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(16,185,129,0.15)] min-h-[190px] sm:min-h-[220px]"
          >
            {/* Visual: Isometric Layered Architecture Stack on the right */}
            <div className="absolute right-2 sm:right-6 md:right-10 lg:right-16 bottom-0 w-44 sm:w-64 md:w-80 lg:w-96 z-20 hidden sm:block pointer-events-none opacity-95 group-hover:opacity-100 transition-opacity duration-500">
              <IsometricBoxes02 className="w-full h-auto drop-shadow-sm" />
            </div>

            <div className="relative z-30 w-full sm:w-3/5 md:w-3/5">
              <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 tracking-tight">
                Enterprise-Grade Intelligence
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed md:max-w-xl">
                Botless recording, SOC-2 Type II certified privacy, zero model
                training on your audio, and sub-second LLM synthesis built for
                demanding enterprise infrastructure.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default WhyUsBento;
