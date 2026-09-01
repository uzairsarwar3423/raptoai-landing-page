"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle2, FileSignature, Download, Mail, ArrowRight, ShieldCheck, Building2, User, MailCheck } from "lucide-react";
import { DPA_METADATA } from "./dpa.content";

interface DPAExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DPAExecutionModal({ isOpen, onClose }: DPAExecutionModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    legalContactName: "",
    contactEmail: "",
    jurisdiction: "EU/UK (GDPR)",
    workspaceId: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous execution link generation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      companyName: "",
      legalContactName: "",
      contactEmail: "",
      jurisdiction: "EU/UK (GDPR)",
      workspaceId: "",
    });
    onClose();
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--color-paper-raised)] p-6 sm:p-8 rounded-3xl border border-[var(--color-ink-900)]/15 shadow-tier-3 z-50 max-h-[90vh] overflow-y-auto focus:outline-none animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-ink-900)]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center text-[var(--color-brand-600)]">
                <FileSignature className="w-4 h-4" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-display font-semibold text-[var(--color-ink-900)]">
                  Execute Data Processing Agreement
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[var(--color-ink-500)]">
                  Standard Contractual Clauses & Pre-Signed GDPR Addendum
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close
              className="rounded-full p-1.5 text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] rounded-xl p-3.5 text-xs text-[var(--color-brand-900)] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                <p>
                  Rapto provides this pre-signed DPA incorporating the EU 2021/914 SCCs and UK Addendum. Once submitted, a fully counter-signed copy is emailed directly to your legal team.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                  Legal Entity / Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Acme Corporation Ltd."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Signatory Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.legalContactName}
                      onChange={(e) => setFormData({ ...formData, legalContactName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Corporate Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="legal@acme.com"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Primary Jurisdiction
                  </label>
                  <select
                    value={formData.jurisdiction}
                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                  >
                    <option value="EU/UK (GDPR)">European Union / UK (GDPR)</option>
                    <option value="United States (CCPA/CPRA)">United States (CCPA/CPRA)</option>
                    <option value="Switzerland (FADP)">Switzerland (FADP)</option>
                    <option value="Global / Rest of World">Global / Rest of World</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Workspace Domain or ID
                  </label>
                  <input
                    type="text"
                    placeholder="acme.rapto.cloud (optional)"
                    value={formData.workspaceId}
                    onChange={(e) => setFormData({ ...formData, workspaceId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-ink-900)]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download HTML/PDF</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-all shadow-tier-1 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Execution Package...</span>
                  ) : (
                    <>
                      <span>Execute & Email Copy</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-5 space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-200)] flex items-center justify-center mx-auto">
                <MailCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)]">
                  DPA Execution Package Dispatched
                </h3>
                <p className="text-xs text-[var(--color-ink-600)] mt-1.5 max-w-sm mx-auto">
                  A binding, pre-signed DPA copy for <strong className="text-[var(--color-ink-900)]">{formData.companyName}</strong> has been transmitted to <strong className="text-[var(--color-ink-900)]">{formData.contactEmail}</strong> with Standard Contractual Clauses (SCCs Module 2 & 3).
                </p>
              </div>

              <div className="bg-[var(--color-paper-sunken)] p-3.5 rounded-2xl border border-[var(--color-ink-900)]/10 text-xs text-left space-y-1.5 text-[var(--color-ink-700)]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Document Reference:</span>
                  <span className="font-mono text-[var(--color-brand-700)]">RAPTO-DPA-2026-V32</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Governing Law:</span>
                  <span>Ireland / EU GDPR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Processor Representative:</span>
                  <span>{DPA_METADATA.dpoName}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
