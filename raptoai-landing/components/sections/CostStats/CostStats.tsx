"use client";

import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { costStats } from "./cost-stats.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function CostStats() {
  return (
    <section className="relative bg-[var(--color-paper)] py-32 z-10 cost-stats-bg-pattern overflow-hidden border-t border-[var(--color-ink-900)]/5">
      {/* Background glow to anchor the bento */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--color-brand-100)]/20 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.div variants={revealUp} className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-[var(--color-ember-500)]" />
            <p className="text-[var(--color-ember-600)] font-semibold tracking-widest text-xs uppercase">
              THE PROBLEM, BY THE NUMBERS
            </p>
            <span className="h-px w-6 bg-[var(--color-ember-500)]" />
          </motion.div>
          
          <motion.h2
            variants={revealUp}
            className="text-5xl md:text-6xl lg:text-7xl text-center max-w-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tighter leading-[1.05]"
          >
            This isn't a note-taking problem.<br className="hidden md:block" />
            <span className="text-[var(--color-ink-500)]"> It's a follow-through problem.</span>
          </motion.h2>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
            {costStats.map((stat, i) => {
              // Bento layout classes:
              // i === 0: 70% (missed rate) -> wide on tablet/desktop
              // i === 1: 4.5 hrs (time lost) -> standard
              // i === 2: 3x (fulfillment) -> massive full-width finale
              let gridClasses = "";
              if (i === 0) gridClasses = "md:col-span-2";
              else if (i === 1) gridClasses = "md:col-span-1";
              else if (i === 2) gridClasses = "md:col-span-3";

              return (
                <motion.div key={stat.id} variants={revealUp} className={gridClasses}>
                  <StatCard data={stat} />
                </motion.div>
              );
            })}
          </div>

          <motion.p
            variants={revealUp}
            className="text-center text-[var(--text-body-s)] text-[var(--color-ink-300)] mt-12 font-medium tracking-wide uppercase"
          >
            Source: aggregate industry research on meeting follow-through, 2025–2026
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
