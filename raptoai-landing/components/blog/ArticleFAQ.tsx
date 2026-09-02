"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/blog/types";

export interface ArticleFAQProps {
  items: FAQItem[];
  className?: string;
}

export function ArticleFAQ({ items, className = "" }: ArticleFAQProps) {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([0]);

  if (!items || items.length === 0) return null;

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="frequently-asked-questions"
      aria-label="Frequently Asked Questions"
      className={`my-12 pt-8 border-t border-[var(--color-ink-900)]/10 ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center">
          <HelpCircle className="w-4 h-4" />
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)] tracking-[-0.01em]">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div
              key={index}
              className="rounded-[var(--radius-lg)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-base sm:text-lg text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--color-ink-500)] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[var(--color-brand-600)]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[var(--color-ink-700)] leading-relaxed font-sans border-t border-[var(--color-ink-900)]/5 bg-[var(--color-paper-sunken)]/40">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
