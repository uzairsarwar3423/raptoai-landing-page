import * as React from "react";
import { Sparkles, Check } from "lucide-react";
import { DirectAnswer } from "@/lib/blog/types";

export interface DirectAnswerBoxProps {
  directAnswer: DirectAnswer;
  className?: string;
}

export function DirectAnswerBox({ directAnswer, className = "" }: DirectAnswerBoxProps) {
  return (
    <aside
      aria-label="Direct Answer / Executive Summary"
      className={`my-8 p-6 sm:p-7 rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border-2 border-[var(--color-brand-500)]/20 shadow-tier-2 relative overflow-hidden ${className}`}
    >
      {/* Subtle top brand glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-brand-500)] via-[var(--color-brand-300)] to-transparent" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-50)] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none opacity-60" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-100)]">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-[var(--text-mono-s)] font-mono uppercase tracking-wider font-semibold text-[var(--color-brand-700)]">
            Direct Answer &amp; Key Takeaways
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-ink-900)] mb-3 leading-snug">
          {directAnswer.headline}
        </h3>

        <p className="text-base sm:text-lg text-[var(--color-ink-700)] leading-relaxed font-sans mb-5">
          {directAnswer.summary}
        </p>

        {directAnswer.keyPoints && directAnswer.keyPoints.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-ink-900)]/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-500)] font-semibold mb-3">
              Essential Facts
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {directAnswer.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-ink-900)]"
                >
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span className="leading-snug">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
