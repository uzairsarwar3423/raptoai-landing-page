"use client";

import { HelpCircle, ArrowRight } from "lucide-react";
import { COMPARE_FAQS } from "./compare.content";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export function CompareFaq() {
  return (
    <section className="relative py-20 lg:py-28 bg-[var(--color-paper-raised)] border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
            <span>Comparison & Migration FAQs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-700)]">
            Everything you need to know about switching, running Rapto alongside other tools, and team adoption.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full divide-y divide-[var(--color-ink-900)]/10">
          {COMPARE_FAQS.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="py-2 border-b border-[var(--color-ink-900)]/10">
              <AccordionTrigger className="text-left font-display text-base sm:text-lg font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed pt-1 pb-5 pr-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
