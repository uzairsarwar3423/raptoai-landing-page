import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface InlineCTAProps {
  headline?: string;
  subhead?: string;
  className?: string;
}

export function InlineCTA({
  headline = "Stop losing 70% of verbal meeting promises.",
  subhead = "Rapto connects to Zoom, Google Meet, and Microsoft Teams to turn spoken commitments into tracked Linear and Jira issues automatically.",
  className = "",
}: InlineCTAProps) {
  return (
    <aside
      aria-label="Product Call to Action"
      className={`my-12 p-8 rounded-[var(--radius-xl)] bg-[var(--color-canvas-dark)] text-white relative overflow-hidden shadow-tier-3 ${className}`}
    >
      {/* Glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[var(--color-brand-700)] blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[var(--color-brand-900)] blur-[80px] opacity-30 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-brand-300)] text-xs font-mono font-medium mb-3 border border-white/10">
            <Zap className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
            <span>AI Meeting Accountability</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
            {headline}
          </h3>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans mb-4">
            {subhead}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-400)]" />
              Botless or bot recording
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-400)]" />
              Flat squad pricing ($39/mo)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand-400)]" />
              SOC-2 Type II Certified
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
          <Button
            asChild
            size="md"
            className="w-full sm:w-auto bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] font-semibold shadow-cta-glow justify-center"
          >
            <a
              href="https://app.rapto.cloud/register"
              className="inline-flex items-center gap-2"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="md"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white justify-center"
          >
            <Link href="/pricing">View Pricing &amp; Plans</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
