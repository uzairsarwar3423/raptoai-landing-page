"use client";
import { motion } from "framer-motion";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function AboutStory() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[var(--color-paper-raised)] border-y border-[var(--color-ink-900)]/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            variants={revealUp}
            className="text-2xl sm:text-3xl font-display font-medium text-[var(--color-ink-900)] mb-8"
          >
            The Origin Story
          </motion.h2>
          
          <div className="space-y-8 text-base sm:text-lg text-[var(--color-ink-700)] leading-relaxed font-normal">
            <motion.p variants={revealUp}>
              We started Rapto after sitting through thousands of hours of meetings that led nowhere. Teams would meet, discuss brilliant strategies, make commitments, and then immediately return to the chaos of their day-to-day.
            </motion.p>
            <motion.p variants={revealUp}>
              Note-taking tools promised a solution, but they missed the point. They gave us transcripts and summaries—walls of text that no one had the time to read. What we needed wasn't a better transcript; we needed a system that understood <strong className="text-[var(--color-ink-900)] font-medium">who</strong> was supposed to do <strong className="text-[var(--color-ink-900)] font-medium">what</strong>, and actually held them to it.
            </motion.p>
            <motion.p variants={revealUp}>
              That's why we built Rapto. We designed an AI that acts as a ruthless, yet silent, accountability partner. It extracts the commitments from your conversations and tracks them across time, turning empty promises into inevitable progress.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
