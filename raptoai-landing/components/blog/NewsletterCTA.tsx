"use client";

import * as React from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NewsletterCTA({ className = "" }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <aside
      aria-label="Engineering Newsletter"
      className={`p-8 sm:p-10 rounded-[var(--radius-xl)] bg-[var(--color-brand-900)] text-white relative overflow-hidden shadow-tier-2 my-12 ${className}`}
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[var(--color-brand-600)] blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-[var(--color-brand-700)] blur-[80px] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-brand-300)] text-xs font-mono font-medium mb-4 border border-white/10">
          <Mail className="w-3.5 h-3.5" />
          <span>Bi-Weekly Engineering Dispatch</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
          The High-Output Engineering &amp; Accountability Dispatch
        </h3>

        <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans mb-8">
          Join 8,500+ engineering leaders, product managers, and founders. We share architectural deep-dives, meeting execution frameworks, and zero-bullshit guides on shipping software faster.
        </p>

        {submitted ? (
          <div className="p-4 rounded-[var(--radius-md)] bg-white/10 border border-[var(--color-brand-300)]/40 flex items-center justify-center gap-2 text-white">
            <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-300)]" />
            <span className="text-sm font-medium">You’re on the list! Check your inbox for our latest pillar breakdown.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-300)] transition-all font-sans"
            />
            <Button
              type="submit"
              size="md"
              className="w-full sm:w-auto bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] font-semibold flex-shrink-0 shadow-sm"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        )}

        <p className="text-[11px] font-mono text-white/50 mt-4">
          Zero spam. Unsubscribe with 1-click anytime. Read our <a href="/legal/privacy" className="underline hover:text-white">Privacy Policy</a>.
        </p>
      </div>
    </aside>
  );
}
