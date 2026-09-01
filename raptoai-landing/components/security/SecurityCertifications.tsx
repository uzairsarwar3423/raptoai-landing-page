"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, FileText, Download, Award, Lock, ExternalLink } from "lucide-react";
import { SECURITY_CERTIFICATIONS } from "./security.content";
import { SecurityReportModal } from "./SecurityReportModal";

export function SecurityCertifications() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string>("SOC 2 Type II Report");

  const handleRequestDoc = (certName: string) => {
    setSelectedDoc(certName);
    setModalOpen(true);
  };

  return (
    <>
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-paper-sunken)]/40 border-y border-[var(--color-ink-900)]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
              <Award className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
              <span>Independent Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
              Rigorous compliance audited by third-party leaders.
            </h2>
            <p className="mt-3 text-sm text-[var(--color-ink-600)] leading-relaxed">
              We validate our security controls against the world&apos;s most stringent data protection frameworks, verified through continuous automated evidence collection and independent external audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECURITY_CERTIFICATIONS.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[var(--color-paper-raised)] rounded-3xl p-6 sm:p-7 border border-[var(--color-ink-900)]/10 shadow-tier-1 hover:shadow-tier-2 hover:border-[var(--color-brand-500)]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold text-[var(--color-brand-800)] bg-[var(--color-brand-50)] px-2.5 py-1 rounded-lg border border-[var(--color-brand-100)]">
                      {cert.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[var(--color-ink-900)] mb-1 group-hover:text-[var(--color-brand-700)] transition-colors">
                    {cert.name}
                  </h3>

                  <p className="text-[11px] text-[var(--color-ink-400)] font-mono mb-3">
                    {cert.issuer}
                  </p>

                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <div className="p-3 rounded-xl bg-[var(--color-paper-sunken)]/70 text-[11px] text-[var(--color-ink-600)] leading-normal mb-4">
                    {cert.details}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-ink-900)]/10 flex items-center justify-between">
                  {cert.reportAvailable ? (
                    <button
                      type="button"
                      onClick={() => handleRequestDoc(cert.name)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-700)] hover:text-[var(--color-brand-900)] transition-colors cursor-pointer group-hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Request Audit Report</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[var(--color-ink-400)] italic">
                      Attestation on File
                    </span>
                  )}
                  <ShieldCheck className="w-4 h-4 text-[var(--color-brand-600)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Report Request Modal */}
      <SecurityReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialDoc={selectedDoc}
      />
    </>
  );
}
