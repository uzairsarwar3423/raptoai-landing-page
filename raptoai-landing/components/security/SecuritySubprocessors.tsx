"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Server, Search, ExternalLink, Filter, ShieldCheck, ArrowRight, X } from "lucide-react";
import { SECURITY_SUBPROCESSORS, SecuritySubprocessor } from "./security.content";

export function SecuritySubprocessors() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Cloud Infrastructure",
    "AI Inference & Models",
    "Edge & Security",
    "Operations & Billing",
  ];

  const filteredSubprocessors = useMemo(() => {
    return SECURITY_SUBPROCESSORS.filter((sp) => {
      const matchesCategory =
        activeCategory === "All" || sp.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.dataProcessed.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="sub-processors"
      className="scroll-mt-28 relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper-sunken)]/40 border-t border-[var(--color-ink-900)]/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
            <Server className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Third-Party Vendor Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
            Authorized Sub-processors Registry
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-600)] leading-relaxed">
            We hold all sub-processors to the same rigorous SOC 2, GDPR Article 28, and ISO 27001 standards that we demand of ourselves. We provide 30 days&apos; advance notice prior to engaging any new sub-processor.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[var(--color-paper-raised)] p-4 sm:p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[var(--color-brand-700)] text-white shadow-tier-1"
                      : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:bg-[var(--color-ink-900)]/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sub-processors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] placeholder-[var(--color-ink-500)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sub-processors List */}
        <div className="space-y-4">
          {filteredSubprocessors.map((sp: SecuritySubprocessor, idx: number) => (
            <div
              key={idx}
              className="bg-[var(--color-paper-raised)] p-6 sm:p-7 rounded-3xl border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:shadow-tier-2 hover:border-[var(--color-brand-500)]/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-100)] flex items-center justify-center font-bold shrink-0">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-semibold text-[var(--color-ink-900)]">
                      {sp.name}
                    </h3>
                    <span className="text-xs font-mono text-[var(--color-brand-700)] font-medium">
                      {sp.category}
                    </span>
                  </div>
                </div>

                <a
                  href={sp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-700)] hover:underline self-start sm:self-auto"
                >
                  <span>Vendor Compliance Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-[var(--color-ink-900)]/5 text-xs">
                <div>
                  <span className="font-semibold text-[var(--color-ink-900)] block mb-1">
                    Processing Purpose:
                  </span>
                  <p className="text-[var(--color-ink-600)] leading-relaxed">{sp.purpose}</p>
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-ink-900)] block mb-1">
                    Cloud Region / Location:
                  </span>
                  <p className="text-[var(--color-ink-600)] leading-relaxed">{sp.location}</p>
                </div>
                <div>
                  <span className="font-semibold text-[var(--color-ink-900)] block mb-1">
                    Safeguards & Certifications:
                  </span>
                  <p className="text-[var(--color-ink-600)] leading-relaxed">{sp.safeguards}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--color-paper-sunken)]/60 text-xs text-[var(--color-ink-700)] border border-[var(--color-ink-900)]/5">
                <strong className="text-[var(--color-ink-900)]">Personal Data Scope: </strong>
                <span>{sp.dataProcessed}</span>
              </div>
            </div>
          ))}

          {filteredSubprocessors.length === 0 && (
            <div className="text-center py-12 bg-[var(--color-paper-raised)] rounded-3xl border border-[var(--color-ink-900)]/10">
              <p className="text-sm text-[var(--color-ink-500)]">
                No sub-processors match your filter query &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* DPA Cross Link Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-[var(--color-brand-25)] border border-[var(--color-brand-200)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[var(--color-brand-600)] shrink-0" />
            <div>
              <h4 className="text-sm font-display font-semibold text-[var(--color-brand-950)]">
                Need to execute our formal Data Processing Agreement?
              </h4>
              <p className="text-xs text-[var(--color-brand-800)] mt-0.5">
                Our pre-signed DPA incorporates all sub-processor terms and EU Standard Contractual Clauses (SCCs).
              </p>
            </div>
          </div>

          <Link
            href="/legal/dpa"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-colors shadow-tier-1 shrink-0"
          >
            <span>Review & Execute DPA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
