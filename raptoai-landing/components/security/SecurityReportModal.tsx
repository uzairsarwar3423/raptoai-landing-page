"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle2, ShieldCheck, Download, Mail, Building2, User, FileText, Check, ArrowRight } from "lucide-react";
import { SECURITY_METADATA } from "./security.content";

interface SecurityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: string;
}

export function SecurityReportModal({ isOpen, onClose, initialDoc = "SOC 2 Type II Report" }: SecurityReportModalProps) {
  const [selectedDoc, setSelectedDoc] = useState(initialDoc);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "Security / CISO",
    ndaAgreed: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      role: "Security / CISO",
      ndaAgreed: true,
    });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-200" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[var(--color-paper-raised)] p-6 sm:p-8 rounded-3xl border border-[var(--color-ink-900)]/15 shadow-tier-3 z-50 max-h-[90vh] overflow-y-auto focus:outline-none animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-ink-900)]/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center text-[var(--color-brand-600)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-display font-semibold text-[var(--color-ink-900)]">
                  Request Security Package
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[var(--color-ink-500)]">
                  SOC 2 Type II, Pen Test Letter & Architecture Whitepaper
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
              <div>
                <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                  Select Security Document <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                >
                  <option value="SOC 2 Type II Report">SOC 2 Type II Audit Report (Schellman & Co.)</option>
                  <option value="Penetration Test Summary">CREST Third-Party Penetration Test Letter</option>
                  <option value="ISO 27001 Certificate">ISO/IEC 27001:2022 Certificate</option>
                  <option value="Security Whitepaper">Zero-Leak Architecture & Threat Model Whitepaper</option>
                  <option value="CAIQ / SIG Questionnaire">Standardized Information Gathering (SIG/CAIQ v4)</option>
                  <option value="All Documents">Complete Enterprise Security & Trust Bundle</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="s.connor@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[var(--color-ink-400)] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Cyberdyne Systems"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1">
                    Role / Function
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none"
                  >
                    <option value="Security / CISO">Security / CISO</option>
                    <option value="IT & Infrastructure">IT & Infrastructure</option>
                    <option value="Engineering Leadership">Engineering Leadership</option>
                    <option value="Legal & Compliance">Legal & Compliance</option>
                    <option value="Procurement / Vendor Management">Procurement / Vendor Management</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[var(--color-paper-sunken)] rounded-xl border border-[var(--color-ink-900)]/10 text-xs text-[var(--color-ink-700)] flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="nda-checkbox"
                  checked={formData.ndaAgreed}
                  onChange={(e) => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                  className="mt-0.5 rounded text-[var(--color-brand-600)] focus:ring-[var(--color-brand-500)]"
                  required
                />
                <label htmlFor="nda-checkbox" className="text-[11px] leading-snug cursor-pointer">
                  I understand that SOC 2 reports and penetration testing summaries contain proprietary security details and agree to treat them confidentially under standard mutual NDA.
                </label>
              </div>

              <div className="pt-3 border-t border-[var(--color-ink-900)]/10 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-all shadow-tier-1 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Verifying & Preparing Package...</span>
                  ) : (
                    <>
                      <span>Transmit Security Package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-5 space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-600)] border border-[var(--color-brand-200)] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-display font-semibold text-[var(--color-ink-900)]">
                  Security Package Dispatched
                </h3>
                <p className="text-xs text-[var(--color-ink-600)] mt-1.5 max-w-sm mx-auto">
                  A secure download link for <strong className="text-[var(--color-ink-900)]">{selectedDoc}</strong> has been transmitted to <strong className="text-[var(--color-ink-900)]">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-[var(--color-paper-sunken)] p-3.5 rounded-2xl border border-[var(--color-ink-900)]/10 text-xs text-left space-y-1.5 text-[var(--color-ink-700)]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Recipient:</span>
                  <span>{formData.name} ({formData.company})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Security Point of Contact:</span>
                  <span className="font-mono text-[var(--color-brand-700)]">{SECURITY_METADATA.securityContact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Verification Audit:</span>
                  <span>Schellman SOC 2 Type II (2026)</span>
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
