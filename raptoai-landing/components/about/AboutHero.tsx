"use client";
import { motion } from "framer-motion";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.p
            variants={revealUp}
            className="text-[var(--color-brand-600)] font-mono text-xs sm:text-sm tracking-[0.1em] uppercase mb-6 sm:mb-8 font-semibold"
          >
            Our Mission
          </motion.p>
          <motion.h1
            variants={revealUp}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-medium tracking-tight text-[var(--color-ink-900)] leading-[1.05] max-w-4xl mx-auto"
          >
            We are building the memory layer for your meetings.
          </motion.h1>
          <motion.p
            variants={revealUp}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-[var(--color-ink-500)] max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Because great ideas shouldn't die in a Google Doc, and promises shouldn't rely on human memory alone.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
