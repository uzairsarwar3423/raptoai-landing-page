"use client";

import { useState } from "react";
import { HelpCircle, Mail, MessageSquare } from "lucide-react";
import { PRICING_FAQS, PricingFaqItem } from "@/components/sections/Pricing/pricing.content";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export function PricingFaq() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Billing", "Product & Usage", "Security & Privacy", "Enterprise"];

  const filteredFaqs =
    selectedCategory === "All"
      ? PRICING_FAQS
      : PRICING_FAQS.filter((faq: PricingFaqItem) => faq.category === selectedCategory);

  return (
    <section className="relative py-20 lg:py-28 bg-[var(--color-paper-raised)] border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[var(--color-ink-900)] tracking-tight">
            Everything you need to know.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-700)] max-w-xl mx-auto">
            Clear, transparent answers on billing mechanics, meeting allowances, privacy safeguards, and enterprise procurement.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[var(--color-ink-900)] text-[var(--color-ink-on-dark)] shadow-sm"
                    : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)]/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Radix UI Accordion */}
        <Accordion type="single" collapsible className="w-full divide-y divide-[var(--color-ink-900)]/10">
          {filteredFaqs.map((faq: PricingFaqItem) => (
            <AccordionItem key={faq.id} value={faq.id} className="py-2 border-b border-[var(--color-ink-900)]/10">
              <AccordionTrigger className="text-left font-display text-base sm:text-lg font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] py-4">
                <span className="flex items-center gap-3">
                  <span className="inline-block text-xs font-mono font-normal px-2 py-0.5 rounded bg-[var(--color-paper-sunken)] text-[var(--color-ink-500)]">
                    {faq.category}
                  </span>
                  <span>{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed pt-1 pb-5 pr-8">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Support Callout Box */}
        <div className="mt-14 rounded-2xl bg-[var(--color-paper-sunken)]/60 border border-[var(--color-ink-900)]/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)]">
              Have a custom security or procurement requirement?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[var(--color-ink-700)]">
              Our enterprise team can provide SOC 2 reports, vendor risk assessments, and custom agreements.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:security@rapto.cloud?subject=Security%20and%20Procurement%20Inquiry"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-paper-raised)] text-[var(--color-ink-900)] font-semibold text-xs sm:text-sm border border-[var(--color-ink-900)]/15 hover:border-[var(--color-ink-900)]/30 transition-all shadow-sm"
            >
              <Mail className="w-4 h-4 text-[var(--color-brand-600)]" />
              <span>Contact Security</span>
            </a>
            <a
              href="https://app.rapto.cloud/register"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-brand-600)] text-white font-semibold text-xs sm:text-sm hover:bg-[var(--color-brand-700)] transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Free Trial</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
