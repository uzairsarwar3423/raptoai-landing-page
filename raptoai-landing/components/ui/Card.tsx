import * as React from "react";
import { cn } from "./Button";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "flat";
}

export function Card({
  className,
  variant = "elevated",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] transition-all duration-200",
        variant === "elevated" &&
          "shadow-tier-1 border border-[var(--color-ink-900)]/5 hover:shadow-tier-2 hover:-translate-y-1",
        variant === "flat" &&
          "border border-[var(--color-ink-900)]/10 shadow-none hover:border-[var(--color-ink-900)]/20",
        className
      )}
      {...props}
    />
  );
}
