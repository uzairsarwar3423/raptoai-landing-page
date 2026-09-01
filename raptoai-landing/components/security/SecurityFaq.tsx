"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { HelpCircle, Mail, Key, ShieldCheck, Bug, ExternalLink } from "lucide-react";
import { SECURITY_FAQS, SECURITY_METADATA } from "./security.content";

export function SecurityFaq() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "AI & Data Privacy",
    "Data Residency & Encryption",
    "Enterprise IAM & Access",
    "Certifications & Audits",
  ];

  const filteredFaqs =
    activeCategory === "All"
      ? SECURITY_FAQS
      : SECURITY_FAQS.filter((faq) => faq.category === activeCategory);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Security & Compliance FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
            Frequently asked questions by CISOs & IT Leaders
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-600)]">
            Everything your security, legal, and privacy teams need to know before deploying Rapto.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[var(--color-brand-700)] text-white shadow-tier-1"
                  : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="bg-[var(--color-paper-raised)] p-6 sm:p-8 rounded-3xl border border-[var(--color-ink-900)]/10 shadow-tier-1">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {filteredFaqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-b border-[var(--color-ink-900)]/10 py-1 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-display font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-700)] py-4">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed pb-4">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Responsible Disclosure & Bug Bounty Card */}
        <div className="mt-12 p-7 sm:p-8 rounded-3xl bg-[var(--color-canvas-dark)] text-white border border-white/10 shadow-tier-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-semibold text-[var(--color-brand-300)]">
                <Bug className="w-3.5 h-3.5" />
                <span>Responsible Vulnerability Disclosure</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                Found a potential vulnerability?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                We take all security reports seriously and commit to reviewing disclosures within 24 hours. Submit findings securely via our PGP-encrypted security mailbox.
              </p>
              <div className="pt-2 font-mono text-[11px] text-white/50 flex flex-wrap gap-2 items-center">
                <Key className="w-3.5 h-3.5 text-[var(--color-brand-400)]" />
                <span>PGP: {SECURITY_METADATA.pgpKeyFingerprint}</span>
              </div>
            </div>

            <a
              href={`mailto:${SECURITY_METADATA.securityContact}?subject=Security%20Vulnerability%20Disclosure`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-all shadow-tier-1 shrink-0 self-start md:self-auto"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Security Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
