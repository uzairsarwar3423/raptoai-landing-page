"use client";

import { useState, useMemo } from "react";
import { Search, Filter, CheckCircle2, ShieldCheck, FileCheck, X } from "lucide-react";
import { SECURITY_CONTROLS_MATRIX, SecurityControlItem } from "./security.content";

export function SecurityControlsMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Encryption & Cryptography",
    "Identity & Access",
    "Network & Infrastructure",
    "Data Governance",
    "Operational Security",
  ];

  const filteredControls = useMemo(() => {
    return SECURITY_CONTROLS_MATRIX.filter((ctrl) => {
      const matchesCategory =
        activeCategory === "All" || ctrl.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        ctrl.controlName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctrl.implementation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctrl.complianceStandard.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctrl.verificationMethod.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
            <FileCheck className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span>Technical Controls Specification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
            Security controls matrix & compliance standards.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-600)] leading-relaxed">
            Transparently browse our technical control implementations mapped directly to SOC 2 CC, ISO 27001, and NIST frameworks.
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
                placeholder="Search controls (e.g. KMS, SSO)..."
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

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredControls.map((ctrl: SecurityControlItem) => (
            <div
              key={ctrl.id}
              className="bg-[var(--color-paper-raised)] p-6 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:border-[var(--color-brand-500)]/30 hover:shadow-tier-2 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] bg-[var(--color-brand-50)] px-2.5 py-0.5 rounded-md border border-[var(--color-brand-100)]">
                    {ctrl.category}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--color-ink-500)] bg-[var(--color-paper-sunken)] px-2 py-0.5 rounded">
                    {ctrl.complianceStandard}
                  </span>
                </div>

                <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)] mb-2">
                  {ctrl.controlName}
                </h3>

                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                  {ctrl.implementation}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--color-ink-900)]/5 flex items-center gap-2 text-[11px] text-[var(--color-ink-500)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-600)] shrink-0" />
                <span className="truncate"><strong>Evidence:</strong> {ctrl.verificationMethod}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredControls.length === 0 && (
          <div className="text-center py-12 bg-[var(--color-paper-raised)] rounded-3xl border border-[var(--color-ink-900)]/10">
            <p className="text-sm text-[var(--color-ink-500)]">
              No security controls match your query &ldquo;{searchQuery}&rdquo;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
