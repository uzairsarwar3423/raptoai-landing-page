export interface SecurityCertification {
  id: string;
  name: string;
  badge: string;
  issuer: string;
  status: "Active & Verified" | "Compliant" | "Available upon Request";
  description: string;
  details: string;
  reportAvailable: boolean;
}

export interface SecurityPillar {
  id: string;
  title: string;
  tag: string;
  icon: string;
  shortSummary: string;
  description: string;
  bulletPoints: string[];
}

export interface SecurityPipelineStep {
  stepNumber: string;
  title: string;
  icon: string;
  tag: string;
  description: string;
  technicalDetails: string[];
}

export interface SecurityControlItem {
  id: string;
  category: "Encryption & Cryptography" | "Identity & Access" | "Network & Infrastructure" | "Data Governance" | "Operational Security";
  controlName: string;
  implementation: string;
  complianceStandard: string;
  verificationMethod: string;
}

export interface SecuritySubprocessor {
  name: string;
  category: "Cloud Infrastructure" | "AI Inference & Models" | "Edge & Security" | "Operations & Billing";
  purpose: string;
  location: string;
  dataProcessed: string;
  safeguards: string;
  link: string;
}

export interface SecurityFAQItem {
  question: string;
  answer: string;
  category: "AI & Data Privacy" | "Certifications & Audits" | "Enterprise IAM & Access" | "Data Residency & Encryption";
}

export const SECURITY_METADATA = {
  title: "Security, Privacy & Trust — Rapto Meeting Intelligence",
  description:
    "Enterprise-grade security by design: SOC 2 Type II certified, zero AI model training on customer data, FIPS 140-3 AES-256 encryption, TLS 1.3, SAML 2.0 SSO, and isolated dedicated tenants.",
  lastAuditDate: "August 2026",
  securityContact: "security@rapto.cloud",
  dpoContact: "privacy@rapto.cloud",
  pgpKeyFingerprint: "4A9F 88B1 C23D 990E 71F6  8E34 5510 293B A89C 4401",
  statusPage: "https://status.rapto.ai",
};

export const SECURITY_METRICS = [
  {
    value: "SOC 2",
    label: "Type II Certified",
    sublabel: "Audited by Schellman & Co.",
  },
  {
    value: "0%",
    label: "AI Model Training",
    sublabel: "Contractual Zero-Retention Guarantee",
  },
  {
    value: "256-bit",
    label: "AES & TLS 1.3",
    sublabel: "FIPS 140-3 Validated Encryption",
  },
  {
    value: "48-hr",
    label: "Breach SLA",
    sublabel: "Dedicated Incident Commander",
  },
];

export const SECURITY_CERTIFICATIONS: SecurityCertification[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    badge: "AICPA Certified",
    issuer: "Independent Third-Party Audit (Schellman & Co.)",
    status: "Active & Verified",
    description: "Evaluated across Security, Confidentiality, and Availability Trust Services Criteria with continuous automated monitoring.",
    details: "Continuous compliance tracking powered by automated evidence collection. Complete 12-month observation period with zero exceptions.",
    reportAvailable: true,
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    badge: "Global Standard",
    issuer: "BSI Group International",
    status: "Active & Verified",
    description: "Certified Information Security Management System (ISMS) governing software development, operations, and customer data handling.",
    details: "Comprehensive risk management framework, secure software development lifecycle (SDLC), and multi-tiered business continuity plans.",
    reportAvailable: true,
  },
  {
    id: "gdpr",
    name: "GDPR & UK GDPR",
    badge: "EU / UK Compliant",
    issuer: "European Data Protection Board Framework",
    status: "Compliant",
    description: "Full Article 28 DPA compliance, Standard Contractual Clauses (SCCs 2021/914), and designated EU/UK Data Protection Officers.",
    details: "Automated Data Subject Rights (DSR) handling, right-to-be-forgotten cryptographic erasure, and strict sub-processor flow-down terms.",
    reportAvailable: true,
  },
  {
    id: "hipaa",
    name: "HIPAA / HITECH Ready",
    badge: "Healthcare Grade",
    issuer: "Third-Party Attestation",
    status: "Available upon Request",
    description: "Safeguards for Protected Health Information (PHI) with Business Associate Agreements (BAAs) available for Enterprise accounts.",
    details: "Strict access segmentation, dedicated tenant encryption, multi-factor hardware keys, and comprehensive immutable audit trails.",
    reportAvailable: true,
  },
  {
    id: "ccpa",
    name: "CCPA / CPRA",
    badge: "California Privacy",
    issuer: "California Privacy Protection Agency Framework",
    status: "Compliant",
    description: "Certified Service Provider under Cal. Civ. Code § 1798.140(ag). Zero selling or cross-context behavioral sharing of customer data.",
    details: "Strict non-retention for external commercial purposes, automated telemetry anonymization, and consumer opt-out compliance.",
    reportAvailable: false,
  },
  {
    id: "cloud-security",
    name: "Cloud Security Alliance (CSA)",
    badge: "STAR Level 1",
    issuer: "Cloud Security Alliance",
    status: "Active & Verified",
    description: "Published Consensus Assessments Initiative Questionnaire (CAIQ v4) detailing complete cloud security posture.",
    details: "Publicly accessible answers to 261 foundational cloud security controls across 17 distinct operational domains.",
    reportAvailable: true,
  },
];

export const ZERO_LEAK_PIPELINE: SecurityPipelineStep[] = [
  {
    stepNumber: "01",
    title: "Authorized Bot Ingestion & Explicit Consent",
    icon: "ShieldAlert",
    tag: "TLS 1.3 Stream",
    description: "Rapto joins authorized meetings (Zoom, Google Meet, Microsoft Teams) with explicit visual notification, audible host announcement, and guest opt-out controls.",
    technicalDetails: [
      "Mandatory visual banner and bot name clearly stating recording status",
      "Meeting host retains one-click instant bot eject and transcription pause",
      "Encrypted transport via TLS 1.3 with Perfect Forward Secrecy (PFS)",
    ],
  },
  {
    stepNumber: "02",
    title: "Ephemeral Audio Streaming & Diarization",
    icon: "Radio",
    tag: "Zero Raw Audio Persistence",
    description: "Audio chunks are streamed into isolated, in-memory processing workers for speech-to-text diarization. Raw audio buffers are purged immediately upon processing.",
    technicalDetails: [
      "Volatile memory (RAM) buffer processing with zero local disk caching",
      "Enterprise setting: Option to disable all raw audio retention completely",
      "Sub-second voice speaker segmentation with cryptographically salted hashes",
    ],
  },
  {
    stepNumber: "03",
    title: "Zero-Retention AI Inference Engine",
    icon: "Cpu",
    tag: "Contractual Zero-Training",
    description: "Meeting summaries, action items, and memory graphs are synthesized via private enterprise API endpoints governed by strict Zero Data Retention (ZDR) agreements.",
    technicalDetails: [
      "Zero AI foundation model training: Transcripts never used for model training",
      "Enterprise dedicated endpoints with ephemeral state and no prompt caching",
      "Automatic PII & secret stripping (API keys, credentials, tokens) prior to inference",
    ],
  },
  {
    stepNumber: "04",
    title: "Multi-Tenant Isolation & KMS Envelope Encryption",
    icon: "Lock",
    tag: "AES-256-GCM",
    description: "Transcripts, summaries, and action graphs are encrypted at rest using AES-256 with unique tenant-level cryptographic boundaries and AWS KMS key management.",
    technicalDetails: [
      "Row-level security (RLS) and schema-level isolation per customer workspace",
      "Customer-Managed Encryption Keys (CMEK / BYOK) for complete key sovereignty",
      "Automated annual KMS key rotation with FIPS 140-3 Level 3 HSMs",
    ],
  },
  {
    stepNumber: "05",
    title: "Continuous Governance & Cryptographic Erasure",
    icon: "FileCheck",
    tag: "Automated Lifecycle",
    description: "Granular data retention policies, role-based access control (RBAC), and 1-click irreversible cryptographic shredding in compliance with NIST SP 800-88.",
    technicalDetails: [
      "Configurable workspace retention policies (e.g. auto-delete after 30/60/90 days)",
      "Instant self-serve workspace purge with signed Certificate of Destruction",
      "Immutable audit logs capturing every read, export, and modification event",
    ],
  },
];

export const SECURITY_PILLARS: SecurityPillar[] = [
  {
    id: "ai-privacy",
    title: "Zero AI Model Training Guarantee",
    tag: "Contractual Commitment",
    icon: "BrainCircuit",
    shortSummary: "Your proprietary code, architecture discussions, and meeting notes belong exclusively to you.",
    description:
      "We strictly and contractually enforce zero training on customer data. We never use your meeting transcripts, voice recordings, summary outputs, or embeddings to train, fine-tune, or calibrate public or proprietary AI models.",
    bulletPoints: [
      "Zero-Data-Retention (ZDR) enterprise agreements with LLM infrastructure partners",
      "No customer data is shared between tenants or pooled into shared training datasets",
      "Vector embeddings are isolated in dedicated private indexes with tenant encryption keys",
      "Explicit guarantees backed by our legally binding Data Processing Agreement (DPA)",
    ],
  },
  {
    id: "encryption",
    title: "End-to-End Encryption & Key Sovereignty",
    tag: "FIPS 140-3 Validated",
    icon: "KeyRound",
    shortSummary: "Cryptographic defense across all states of data lifecycle with BYOK options.",
    description:
      "All customer data is encrypted in transit using TLS 1.3 with Perfect Forward Secrecy and at rest using FIPS 140-3 validated AES-256. Enterprise customers can bring their own keys (BYOK) via AWS KMS or Azure Key Vault.",
    bulletPoints: [
      "Mandatory TLS 1.3 with HSTS and modern cipher suites across all endpoints",
      "AES-256 envelope encryption for database records, object storage, and backups",
      "Customer-Managed Encryption Keys (CMEK / BYOK) with instant revocation",
      "Internal microservice communication secured with mutual TLS (mTLS) zero-trust mesh",
    ],
  },
  {
    id: "iam",
    title: "Enterprise Identity & Access Governance",
    tag: "SAML 2.0 & SCIM",
    icon: "UserCheck",
    shortSummary: "Seamless single sign-on, automated user provisioning, and role-based permissions.",
    description:
      "Integrate with your existing identity provider (Okta, Google Workspace, Microsoft Entra ID, OneLogin, PingIdentity) with automated JIT/SCIM provisioning and fine-grained workspace permissions.",
    bulletPoints: [
      "SAML 2.0, OpenID Connect (OIDC), and WS-Fed enterprise Single Sign-On (SSO)",
      "SCIM 2.0 automated provisioning and instant offboarding upon employee departure",
      "Granular Role-Based Access Control (RBAC): Owner, Admin, Member, Restricted Guest",
      "Mandatory FIDO2/WebAuthn hardware security keys for all Rapto engineering personnel",
    ],
  },
  {
    id: "infrastructure",
    title: "Hardened Cloud & Network Defense",
    tag: "Multi-Region Cloud",
    icon: "ShieldAlert",
    shortSummary: "Private isolated VPCs, zero public database routes, and multi-terabit DDoS defense.",
    description:
      "Rapto is hosted in top-tier AWS and Cloudflare facilities with isolated Virtual Private Clouds (VPCs), Next-Generation Web Application Firewalls (WAF), and continuous intrusion detection.",
    bulletPoints: [
      "Zero direct internet ingress to production databases, caches, or vector clusters",
      "Cloudflare Enterprise Edge providing automated DDoS protection and bot mitigation",
      "Least-privilege infrastructure access with ephemeral, short-lived bastion credentials",
      "Multi-region active-active disaster recovery with automated cross-region database failover",
    ],
  },
  {
    id: "vulnerability-management",
    title: "Continuous Auditing & Penetration Testing",
    tag: "CREST Certified",
    icon: "SearchCheck",
    shortSummary: "Daily automated vulnerability scanning and independent black-box audits.",
    description:
      "Our software development lifecycle (SDLC) integrates static and dynamic code analysis, software bill of materials (SBOM) scanning, and mandatory annual third-party penetration testing.",
    bulletPoints: [
      "Continuous SAST/DAST code analysis integrated directly into automated CI/CD pipelines",
      "Third-party dependency monitoring (Snyk / Dependabot) with real-time zero-day alerting",
      "Annual comprehensive black-box and white-box penetration tests by CREST-accredited firms",
      "Managed Bug Bounty program with 24-hour triage SLA and responsible disclosure protocol",
    ],
  },
  {
    id: "privacy-lifecycle",
    title: "Data Minimization & Redaction Controls",
    tag: "Granular Retention",
    icon: "Sliders",
    shortSummary: "Automated secret redaction, custom retention windows, and certified data shredding.",
    description:
      "Put your compliance team in complete control. Configure automated meeting expiration windows, redact API keys and credit cards automatically, and execute verified cryptographic deletes anytime.",
    bulletPoints: [
      "Automated regex and NLP pattern detection to mask API keys, tokens, and PII in real time",
      "Configurable workspace retention rules: Auto-purge transcripts after 7, 30, 90, or 365 days",
      "One-click data export in structured, machine-readable JSON/CSV formats",
      "NIST SP 800-88 Rev. 1 media sanitization standards for verified data destruction",
    ],
  },
];

export const SECURITY_CONTROLS_MATRIX: SecurityControlItem[] = [
  {
    id: "c-1",
    category: "Encryption & Cryptography",
    controlName: "Data at Rest Encryption",
    implementation: "All databases, vector indexes, S3 buckets, and snapshots encrypted with AES-256-GCM via AWS KMS.",
    complianceStandard: "SOC 2 CC6.6, ISO 27001 A.10.1",
    verificationMethod: "Continuous AWS Config & Drata automated evidence verification",
  },
  {
    id: "c-2",
    category: "Encryption & Cryptography",
    controlName: "Data in Transit Encryption",
    implementation: "TLS 1.3 enforced with modern ECDHE cipher suites, PFS, and strict HSTS across all endpoints.",
    complianceStandard: "NIST SP 800-52 Rev. 2, SOC 2 CC6.7",
    verificationMethod: "SSL Labs A+ Rating, Edge WAF automated verification",
  },
  {
    id: "c-3",
    category: "Encryption & Cryptography",
    controlName: "Key Sovereignty (BYOK/CMEK)",
    implementation: "Support for customer-controlled KMS keys in customer-owned AWS or Azure accounts with instant revocation.",
    complianceStandard: "FIPS 140-3 Level 3, HIPAA Security Rule",
    verificationMethod: "Dedicated Enterprise deployment audit",
  },
  {
    id: "c-4",
    category: "Identity & Access",
    controlName: "Enterprise Single Sign-On (SSO)",
    implementation: "SAML 2.0 & OIDC integration with Okta, Azure AD, Google Workspace, and OneLogin.",
    complianceStandard: "SOC 2 CC6.1, ISO 27001 A.9.4",
    verificationMethod: "IdP metadata validation & automated session revocation",
  },
  {
    id: "c-5",
    category: "Identity & Access",
    controlName: "Automated User Provisioning (SCIM)",
    implementation: "SCIM 2.0 support for automated user onboarding, attribute synchronization, and immediate deprovisioning.",
    complianceStandard: "SOC 2 CC6.2, ISO 27001 A.9.2",
    verificationMethod: "SCIM webhook logs & directory sync verification",
  },
  {
    id: "c-6",
    category: "Identity & Access",
    controlName: "Internal Production Access & Hardware MFA",
    implementation: "Zero standing admin privileges. All engineer access requires FIDO2 hardware keys, ephemeral approval, and audit logging.",
    complianceStandard: "NIST SP 800-63B AAL3, SOC 2 CC6.3",
    verificationMethod: "Teleport / Tailscale access logs with dual authorization",
  },
  {
    id: "c-7",
    category: "Network & Infrastructure",
    controlName: "Zero Ingress Private Database Isolation",
    implementation: "Databases reside in private VPC subnets with no public IPs, accessible only via internal mTLS microservices.",
    complianceStandard: "CIS AWS Foundation Benchmarks, SOC 2 CC6.6",
    verificationMethod: "AWS VPC Flow logs & automated routing table audit",
  },
  {
    id: "c-8",
    category: "Network & Infrastructure",
    controlName: "Edge WAF & DDoS Mitigation",
    implementation: "Cloudflare Enterprise WAF blocking OWASP Top 10 exploits, rate limiting, and multi-terabit volumetric attacks.",
    complianceStandard: "SOC 2 CC6.6, ISO 27001 A.13.1",
    verificationMethod: "Cloudflare Security Analytics & monthly penetration tests",
  },
  {
    id: "c-9",
    category: "Data Governance",
    controlName: "Zero AI Model Training Enforcement",
    implementation: "Contractual Zero Data Retention (ZDR) with LLM APIs; technical isolation preventing training dataset ingestion.",
    complianceStandard: "EU AI Act Governance, GDPR Art. 28",
    verificationMethod: "Enterprise DPA with BAA & API telemetry verification",
  },
  {
    id: "c-10",
    category: "Data Governance",
    controlName: "Automated Workspace Retention Policies",
    implementation: "Customer-configurable TTLs to automatically delete transcripts, summaries, and audio after N days.",
    complianceStandard: "GDPR Art. 5(1)(e), CCPA § 1798.100",
    verificationMethod: "Automated cron purge verification with destruction logs",
  },
  {
    id: "c-11",
    category: "Operational Security",
    controlName: "Third-Party Penetration Testing",
    implementation: "Annual comprehensive black-box, grey-box, and API penetration tests conducted by independent CREST-certified firms.",
    complianceStandard: "SOC 2 CC7.1, ISO 27001 A.12.6",
    verificationMethod: "Executive Pen Test Attestation Letter (Available under NDA)",
  },
  {
    id: "c-12",
    category: "Operational Security",
    controlName: "24/7 Security Incident Response & 48h SLA",
    implementation: "Dedicated Incident Response Commander on call with automated SIEM alerting and binding 48-hour customer notification SLA.",
    complianceStandard: "GDPR Art. 33, SOC 2 CC7.3",
    verificationMethod: "Quarterly tabletop exercise simulations & incident logs",
  },
];

export const SECURITY_SUBPROCESSORS: SecuritySubprocessor[] = [
  {
    name: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    purpose: "Core cloud hosting, encrypted database clusters (RDS PostgreSQL), S3 encrypted object storage, and AWS KMS key management.",
    location: "United States (us-east-1, us-west-2) & EU (eu-central-1 Frankfurt) option",
    dataProcessed: "All Customer Personal Data, encrypted meeting transcripts, vector indexes, and system telemetry.",
    safeguards: "SOC 1/2/3, ISO 27001/27017/27018, HIPAA BAA, FedRAMP, EU SCCs",
    link: "https://aws.amazon.com/compliance",
  },
  {
    name: "Cloudflare, Inc.",
    category: "Edge & Security",
    purpose: "Edge CDN network, DDoS mitigation, Next-Gen Web Application Firewall (WAF), and global DNS routing.",
    location: "Global Edge Network (285+ cities worldwide)",
    dataProcessed: "Network transit packets, IP addresses, request headers, encrypted API payloads.",
    safeguards: "SOC 2 Type II, ISO 27001, PCI-DSS Level 1, EU SCCs",
    link: "https://www.cloudflare.com/trust-hub",
  },
  {
    name: "OpenAI, LLC (Enterprise Zero Data Retention)",
    category: "AI Inference & Models",
    purpose: "Real-time natural language synthesis, transcript chunk summarization, and action item detection via dedicated enterprise API.",
    location: "United States (Dedicated Enterprise Endpoints)",
    dataProcessed: "Meeting text segments during active API requests. ZERO data retention; zero model training.",
    safeguards: "SOC 2 Type II, Strict Business Associate Agreement (BAA), Zero Data Retention (ZDR) DPA",
    link: "https://openai.com/enterprise-privacy",
  },
  {
    name: "Anthropic, PBC (Enterprise Tier)",
    category: "AI Inference & Models",
    purpose: "Deep semantic reasoning, commitment graph cross-correlation, and multi-meeting executive synthesis.",
    location: "United States (Dedicated Enterprise Tenant)",
    dataProcessed: "Anonymized transcript text segments during synthesis. Zero data retention; zero model training.",
    safeguards: "SOC 2 Type II, HIPAA-ready, Zero Retention Commercial Terms, EU SCCs",
    link: "https://www.anthropic.com/security",
  },
  {
    name: "Pinecone Systems, Inc.",
    category: "Cloud Infrastructure",
    purpose: "Isolated dedicated vector database for indexing and querying semantic meeting embeddings.",
    location: "United States / EU Dedicated Cloud",
    dataProcessed: "Mathematical vector embeddings and anonymized document identifiers (no raw audio stored).",
    safeguards: "SOC 2 Type II, HIPAA Compliant, ISO 27001, AWS PrivateLink isolation",
    link: "https://www.pinecone.io/security",
  },
  {
    name: "Stripe, Inc.",
    category: "Operations & Billing",
    purpose: "Secure payment gateway, subscription billing, and corporate invoicing.",
    location: "United States & Ireland",
    dataProcessed: "Billing contact details, VAT IDs, invoice records (credit card data handled directly by Stripe).",
    safeguards: "PCI-DSS Level 1 Service Provider, SOC 1/2, EU SCCs",
    link: "https://stripe.com/privacy",
  },
  {
    name: "PostHog, Inc. (EU Cloud)",
    category: "Operations & Billing",
    purpose: "Product telemetry, error diagnostics, and feature performance monitoring.",
    location: "European Union (Frankfurt, Germany)",
    dataProcessed: "Aggregated platform interaction telemetry, anonymized session metrics (no meeting transcript content).",
    safeguards: "GDPR Compliant EU Hosting, SOC 2 Type II, DPA with SCCs",
    link: "https://posthog.com/privacy",
  },
];

export const SECURITY_FAQS: SecurityFAQItem[] = [
  {
    question: "Do you use our meeting recordings or transcripts to train AI models?",
    answer:
      "Absolutely not. We contractually guarantee in our Data Processing Agreement (DPA) and Master Services Agreement (MSA) that your meeting audio, transcripts, notes, action items, and metadata are strictly never used to train, retrain, fine-tune, or calibrate public or proprietary AI models. We hold enterprise Zero Data Retention (ZDR) agreements with all AI inference providers.",
    category: "AI & Data Privacy",
  },
  {
    question: "Where is our data stored, and do you support EU data residency?",
    answer:
      "By default, data is hosted in high-availability, multi-AZ AWS data centers in the United States (us-east-1 and us-west-2). For Enterprise customers with EU data residency requirements, Rapto provides dedicated deployment in Frankfurt (eu-central-1), ensuring all transcripts, databases, and vector embeddings remain within the European Economic Area.",
    category: "Data Residency & Encryption",
  },
  {
    question: "Can we bring our own encryption keys (BYOK / CMEK)?",
    answer:
      "Yes. Enterprise plans support Customer-Managed Encryption Keys (CMEK / BYOK). You can generate, manage, and rotate your master cryptographic root keys within your own AWS KMS or Azure Key Vault account. You retain the power to revoke key access instantly at any time.",
    category: "Data Residency & Encryption",
  },
  {
    question: "How does Rapto handle meeting attendee consent and recording notification?",
    answer:
      "Rapto complies strictly with all two-party and multi-party recording consent statutes. When the Rapto bot joins a video conference (Zoom, Google Meet, Microsoft Teams), its display name clearly identifies it as an AI assistant, and the platform triggers standard in-meeting recording indicators. Workspace administrators can also customize automated in-chat disclosure notices.",
    category: "AI & Data Privacy",
  },
  {
    question: "How do we request your SOC 2 Type II report or penetration test summary?",
    answer:
      "You can request our latest SOC 2 Type II report, ISO 27001 certificate, and independent penetration testing executive summary by clicking 'Request Security Package' on this page or contacting security@rapto.cloud. Reports are shared securely under NDA.",
    category: "Certifications & Audits",
  },
  {
    question: "What happens to our data when an employee leaves or our subscription ends?",
    answer:
      "With SCIM 2.0 and SAML SSO integration, when an employee is deactivated in your identity provider (e.g. Okta), their Rapto access is terminated immediately. Upon contract termination, you have a 30-day window to export all workspace data, after which automated cryptographic deletion irreversibly destroys all records across primary databases, vector indexes, and backups in accordance with NIST SP 800-88.",
    category: "Enterprise IAM & Access",
  },
];
