"use client";

import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { HOME_FAQS } from "./faq.content";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

export function HomeFaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative bg-[var(--color-paper)] py-24 sm:py-32 border-t border-[var(--color-ink-900)]/5 overflow-hidden content-auto"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[var(--color-brand-100)]/20 blur-[130px]"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div variants={revealUp} className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
            <span className="inline-flex items-center gap-1.5 text-[var(--color-brand-600)] font-semibold tracking-widest text-xs uppercase font-mono">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </span>
            <span className="h-px w-6 bg-[var(--color-brand-500)]" />
          </motion.div>

          <motion.h2
            id="faq-title"
            variants={revealUp}
            className="text-4xl sm:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight leading-[1.1]"
          >
            Everything you need to know about{" "}
            <span className="text-[var(--color-brand-600)]">AI accountability.</span>
          </motion.h2>

          <motion.p
            variants={revealUp}
            className="mt-4 text-base sm:text-lg text-[var(--color-ink-600)] max-w-2xl font-normal leading-relaxed"
          >
            Clear answers about meeting memory, zero-training data privacy, native integrations, and flat squad rates.
          </motion.p>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 rounded-2xl p-6 sm:p-8 shadow-tier-1"
        >
          <Accordion type="single" collapsible defaultValue="different-from-transcription" className="w-full space-y-2">
            {HOME_FAQS.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border-b border-[var(--color-ink-900)]/10 last:border-b-0 py-1"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-display font-medium text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-[var(--color-ink-600)] leading-relaxed pb-4 pr-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom Support Callout */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/5 text-sm text-[var(--color-ink-600)]">
          <span>Have an enterprise security or custom deployment question?</span>
          <a
            href="mailto:support@rapto.cloud"
            className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-brand-700)] hover:text-[var(--color-brand-800)] hover:underline whitespace-nowrap"
          >
            Talk to engineering
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
