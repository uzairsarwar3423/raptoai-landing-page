import * as React from "react";
import { cn } from "./Button";

export interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  headline,
  subhead,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 max-w-3xl",
        align === "center" && "mx-auto text-center items-center",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span className="font-mono text-[var(--text-mono-s)] text-[var(--color-brand-600)] uppercase tracking-widest font-semibold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[var(--text-display-l)] tracking-[-0.015em] leading-[1.1] text-[var(--color-ink-900)]">
        {headline}
      </h2>
      {subhead && (
        <p className="text-[var(--text-body-l)] text-[var(--color-ink-700)] max-w-2xl leading-relaxed">
          {subhead}
        </p>
      )}
    </div>
  );
}
