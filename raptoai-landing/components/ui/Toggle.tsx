"use client";

import * as React from "react";
import { cn } from "./Button";

export interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  isRightActive: boolean;
  onChange: (isRight: boolean) => void;
  className?: string;
}

export function Toggle({
  leftLabel,
  rightLabel,
  isRightActive,
  onChange,
  className,
}: ToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center bg-[var(--color-paper-sunken)] rounded-full p-1 border border-[var(--color-ink-900)]/10 shadow-inner relative",
        className
      )}
    >
      <div
        className="absolute inset-y-1 w-[calc(50%-4px)] bg-[var(--color-paper-raised)] rounded-full shadow-sm transition-transform duration-300 ease-in-out"
        style={{
          transform: isRightActive ? "translateX(100%)" : "translateX(0)",
          marginLeft: "4px",
        }}
      />
      <button
        type="button"
        className={cn(
          "relative z-10 px-4 py-2 text-[var(--text-body-s)] font-semibold rounded-full transition-colors duration-200 w-1/2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-700)]",
          !isRightActive
            ? "text-[var(--color-ink-900)]"
            : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-700)]"
        )}
        onClick={() => onChange(false)}
        aria-pressed={!isRightActive}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        className={cn(
          "relative z-10 px-4 py-2 text-[var(--text-body-s)] font-semibold rounded-full transition-colors duration-200 w-1/2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-700)]",
          isRightActive
            ? "text-[var(--color-ink-900)]"
            : "text-[var(--color-ink-500)] hover:text-[var(--color-ink-700)]"
        )}
        onClick={() => onChange(true)}
        aria-pressed={isRightActive}
      >
        {rightLabel}
      </button>
    </div>
  );
}
