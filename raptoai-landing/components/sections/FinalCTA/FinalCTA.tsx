"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Calendar } from "lucide-react";
import { DitherShader } from "@/components/ui/dither-shader";
import { finalCTAContent } from "./final-cta.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function FinalCTA() {
  const { headline, subhead, primaryCTA, secondaryCTA, trustLine } = finalCTAContent;

  return (
    <section
      id="final-cta"
      className="relative z-20 bg-[var(--color-canvas-dark)] text-[var(--color-ink-on-dark)] py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-white/10 content-auto"
    >
      {/* Aceternity Dither Shader Background Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <DitherShader
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          gridSize={3}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#07130e"
          secondaryColor="#10b981"
          animated={true}
          animationSpeed={0.008}
          threshold={0.45}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Radial Mask & Vignette Overlay for Text Legibility */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[var(--color-canvas-dark)]/70 to-[var(--color-canvas-dark)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Main Compact Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center"
        >

          {/* Punchy Compact Headline */}
          <motion.h2
            variants={revealUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white leading-[1.1]"
          >
            {headline}
          </motion.h2>

          {/* Concise Subhead */}
          <motion.p
            variants={revealUp}
            className="mt-3.5 text-sm sm:text-base text-[var(--color-ink-on-dark-muted)] max-w-xl font-normal leading-relaxed"
          >
            {subhead}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
          >
            <a
              href={primaryCTA.href}
              className="w-full sm:w-auto py-3.5 px-7 rounded-xl bg-[var(--color-brand-500)] hover:bg-[var(--color-brand-600)] text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02] shadow-cta-glow flex items-center justify-center gap-2 text-center"
            >
              {primaryCTA.label}
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={secondaryCTA.href}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 text-center"
            >
              <Calendar className="w-4 h-4 text-white/70" />
              {secondaryCTA.label}
            </a>
          </motion.div>

          {/* Micro-Trust Line */}
          <motion.div
            variants={revealUp}
            className="mt-5 flex items-center justify-center gap-2 text-xs text-white/50 font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
            <span>{trustLine}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
