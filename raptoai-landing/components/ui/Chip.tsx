import * as React from "react";
import { cn } from "./Button"; // Re-using cn utility from Button

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "fulfilled" | "pending" | "attention";
  label?: string;
}

export function Chip({
  className,
  variant = "fulfilled",
  label,
  ...props
}: ChipProps) {
  const variants = {
    fulfilled:
      "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border-[var(--color-brand-100)]",
    pending:
      "bg-[var(--color-paper-sunken)] text-[var(--color-ink-500)] border-[var(--color-ink-300)]",
    attention:
      "bg-[hsl(28_90%_96%)] text-[var(--color-ember-600)] border-[var(--color-ember-400)]", // Using an ember-tinted bg (attention-bg)
  };

  const dotColors = {
    fulfilled: "bg-[var(--color-brand-500)]",
    pending: "bg-[var(--color-ink-300)]",
    attention: "bg-[var(--color-ember-500)]",
  };

  const defaultLabels = {
    fulfilled: "FULFILLED ✓",
    pending: "PENDING",
    attention: "NEEDS ATTENTION",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[var(--radius-sm)] border text-[var(--text-mono-s)] font-mono font-medium tracking-wider leading-none",
        variants[variant],
        className
      )}
      {...props}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full mr-1.5", dotColors[variant])}
        aria-hidden="true"
      />
      {label || defaultLabels[variant]}
    </div>
  );
}
