export interface DPASubSection {
  title: string;
  paragraphs?: string[];
  listItems?: string[];
}

export interface DPACallout {
  type: "highlight" | "security" | "legal" | "guarantee";
  title: string;
  message: string;
}

export interface DPASection {
  id: string;
  sectionNumber: string;
  title: string;
  badge?: string;
  shortSummary: string;
  content: {
    paragraphs?: string[];
    subsections?: DPASubSection[];
    listItems?: string[];
    callout?: DPACallout;
  };
}

export interface SubProcessorEntry {
  name: string;
  category: "Cloud Infrastructure" | "AI Inference & Models" | "Edge & Security" | "Billing & Operations";
  purpose: string;
  location: string;
  dataScope: string;
  safeguards: string;
  website: string;
}

export interface SecurityMeasureCategory {
  domain: string;
  icon: string;
  description: string;
  controls: {
    title: string;
    details: string;
    standard: string;
  }[];
}

export const DPA_METADATA = {
  title: "Data Processing Agreement (DPA)",
  subtitle: "GDPR Article 28, UK GDPR & Standard Contractual Clauses (SCCs) Compliance Addendum",
  effectiveDate: "August 25, 2026",
  lastUpdated: "August 25, 2026",
  version: "3.2",
  dpoEmail: "privacy@rapto.cloud",
  dpoName: "Office of the Data Protection Officer",
  securityEmail: "security@rapto.cloud",
  legalEmail: "legal@rapto.cloud",
  companyName: "Rapto Technologies, Inc.",
  companyAddress: "548 Market St, Suite 39201, San Francisco, CA 94104, United States",
  euRepresentative: "Rapto EU Compliance Ltd, 77 Sir John Rogerson's Quay, Grand Canal Dock, Dublin 2, Ireland",
  ukRepresentative: "Rapto UK Operations Ltd, 100 Bishopsgate, London EC2N 4AG, United Kingdom",
  sccReference: "European Commission Implementing Decision (EU) 2021/914 (Module 2 Controller-to-Processor & Module 3 Processor-to-Processor)",
  ukIdtaReference: "UK International Data Transfer Addendum to the EU Commission Standard Contractual Clauses (v B1.0)",
};

export const DPA_HIGHLIGHTS = [
  {
    icon: "ShieldCheck",
    title: "GDPR Art. 28 & SCC Ready",
    tag: "Pre-Signed & Binding",
    description:
      "Includes EU 2021/914 Standard Contractual Clauses (SCCs), UK Addendum, and Swiss cross-border data transfer safeguards.",
  },
  {
    icon: "FileLock2",
    title: "Zero AI Model Training Guarantee",
    tag: "Contractual Commitment",
    description:
      "Customer meeting audio, transcripts, action items, and embeddings are strictly never used to train public or foundational LLMs.",
  },
  {
    icon: "ServerCog",
    title: "Sub-processor Governance",
    tag: "30-Day Prior Notice",
    description:
      "Rigorous SOC 2 / ISO 27001 vendor auditing, documented pass-through obligations, and an explicit customer objection mechanism.",
  },
  {
    icon: "Clock",
    title: "48-Hour Incident SLA",
    tag: "Rapid Response",
    description:
      "Contractual commitment to notify Controller without undue delay and within 48 hours of any confirmed Personal Data Breach.",
  },
];

export const DPA_SECTIONS: DPASection[] = [
  {
    id: "1-definitions-and-interpretation",
    sectionNumber: "1",
    title: "Definitions & Interpretation",
    badge: "Core Terminology",
    shortSummary: "Foundational legal definitions under GDPR, UK GDPR, CCPA/CPRA, and applicable data protection legislation.",
    content: {
      paragraphs: [
        `This Data Processing Agreement ("DPA") supplements and forms an integral part of the Rapto Master Services Agreement, Terms of Service, or Enterprise Order Form (the "Agreement") entered into between ${DPA_METADATA.companyName} ("Rapto", "Processor", "we", or "us") and the customer entity executing the Agreement ("Customer", "Controller", or "you").`,
        "Terms used but not defined herein shall have the meanings assigned to them in the Agreement or in Applicable Data Protection Law. In the event of any conflict between this DPA and the Agreement regarding personal data processing, this DPA shall govern and control.",
      ],
      listItems: [
        `"Applicable Data Protection Law" means all worldwide privacy and data protection laws applicable to the Personal Data, including Regulation (EU) 2016/679 (GDPR), the UK Data Protection Act 2018 (UK GDPR), the Swiss Federal Act on Data Protection (FADP), the California Consumer Privacy Act of 2018 as amended by the CPRA (CCPA), and related state privacy statutes.`,
        `"Customer Personal Data" means any Personal Data contained within meeting audio recordings, live transcription streams, calendar events, meeting summaries, task allocations, participant metadata, or integration payloads processed by Rapto on behalf of Customer.`,
        `"Controller", "Processor", "Data Subject", "Personal Data", "Personal Data Breach", "Processing", and "Supervisory Authority" shall have the meanings given in the GDPR or equivalent terms in Applicable Data Protection Law.`,
        `"Security Incident" means a confirmed breach of security leading to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of, or access to Customer Personal Data in Rapto's custody or control.`,
        `"Sub-processor" means any third-party infrastructure provider, API vendor, hosting facility, or subcontractor engaged by Rapto who processes Customer Personal Data in connection with the Services.`,
        `"Standard Contractual Clauses" or "SCCs" means the standard contractual clauses annexed to the European Commission's Implementing Decision 2021/914 of 4 June 2021 for the transfer of personal data to third countries.`,
      ],
    },
  },
  {
    id: "2-scope-roles-and-documented-instructions",
    sectionNumber: "2",
    title: "Scope, Roles & Documented Instructions",
    badge: "Controller-Processor Relationship",
    shortSummary: "Clarifies that Customer is the Controller and Rapto acts strictly as the Processor upon documented instructions.",
    content: {
      paragraphs: [
        "The parties acknowledge and agree that with respect to Customer Personal Data, Customer is the Controller (or a Processor acting on behalf of a third-party Controller) and Rapto is the Processor acting solely on Customer's documented instructions.",
        "Rapto shall process Customer Personal Data exclusively for the purpose of providing, maintaining, securing, and supporting the AI meeting intelligence platform in accordance with the Agreement, this DPA, and Customer's platform configurations.",
      ],
      callout: {
        type: "guarantee",
        title: "Strict Processing Boundaries & Zero AI Foundation Model Training",
        message:
          "Rapto contractually covenants that Customer Personal Data (including audio streams, diarized transcripts, meeting notes, action items, and vector embeddings) shall NEVER be used to train, retrain, fine-tune, or calibrate public or foundational Artificial Intelligence models, nor disclosed to third-party model providers for their independent training purposes.",
      },
      subsections: [
        {
          title: "2.1 Customer Instructions",
          paragraphs: [
            "Customer instructs Rapto to process Customer Personal Data in accordance with:",
          ],
          listItems: [
            "The provision of real-time transcription, speaker diarization, executive summaries, meeting memory graphs, and task automation requested by Customer's authorized users.",
            "Processing initiated through Rapto's API, desktop applications, calendar synchronizations (Google Workspace, Microsoft 365), and video conference integrations (Zoom, Google Meet, Microsoft Teams).",
            "Written instructions submitted by Customer's designated workspace administrator or security officer.",
          ],
        },
        {
          title: "2.2 Compliance with Laws",
          paragraphs: [
            "Rapto shall immediately inform Customer if, in its reasonable opinion, any instruction received from Customer infringes Applicable Data Protection Law.",
          ],
        },
      ],
    },
  },
  {
    id: "3-confidentiality-and-personnel",
    sectionNumber: "3",
    title: "Confidentiality & Personnel Obligations",
    badge: "Operational Security",
    shortSummary: "Strict non-disclosure agreements, background verifications, and least-privilege access controls for Rapto personnel.",
    content: {
      paragraphs: [
        "Rapto ensures that any employee, contractor, or representative authorized to access or process Customer Personal Data is subject to rigorous organizational safeguards.",
      ],
      listItems: [
        "Binding Confidentiality: All personnel sign comprehensive non-disclosure agreements that survive the termination of employment.",
        "Background Checks: Verification of identity, criminal history checks (where legally permissible), and reference verifications prior to granting production access.",
        "Mandatory Security & Privacy Training: Annual mandatory training on GDPR, CCPA, OWASP Top 10, data minimization, and incident escalation procedures.",
        "Least Privilege & Zero Standing Access: Production systems operate under strict Role-Based Access Control (RBAC), multi-factor hardware keys (FIDO2/WebAuthn), and ephemeral time-bounded access approvals requiring dual authorization.",
      ],
    },
  },
  {
    id: "4-technical-and-organizational-measures",
    sectionNumber: "4",
    title: "Technical & Organizational Security Measures (TOMs)",
    badge: "SOC 2 Type II Certified",
    shortSummary: "Multi-layered enterprise encryption, hardware security modules, network isolation, and continuous vulnerability scanning.",
    content: {
      paragraphs: [
        "Rapto implements and maintains state-of-the-art technical, physical, and organizational measures designed to protect Customer Personal Data against accidental destruction, unauthorized disclosure, or illicit access. These measures are detailed comprehensively in Annex II.",
      ],
      callout: {
        type: "security",
        title: "Cryptographic Architecture & Key Management",
        message:
          "All Customer Personal Data is encrypted in transit using TLS 1.3 with Perfect Forward Secrecy (PFS) and at rest using AES-256 with envelope encryption managed via AWS Key Management Service (KMS) with automatic annual key rotation. Dedicated Customer-Managed Encryption Keys (CMEK) / BYOK are available for Enterprise accounts.",
      },
      listItems: [
        "Data at Rest: Encrypted with FIPS 140-3 validated AES-256 encryption across all primary databases, object storage buckets, vector indexes, and backups.",
        "Data in Transit: Mandatory TLS 1.3 across all external endpoints and internal service-to-service microsegmentation via mTLS (mutual TLS).",
        "Network Segmentation: Isolated Virtual Private Clouds (VPCs) with zero direct public ingress to database clusters, strictly firewalled via Next-Gen WAF.",
        "Continuous Vulnerability Management: Daily automated static (SAST) and dynamic (DAST) code scanning, third-party dependency auditing (Snyk/Dependabot), and annual external black-box penetration testing.",
      ],
    },
  },
  {
    id: "5-sub-processors-and-vendor-governance",
    sectionNumber: "5",
    title: "Sub-processors & Vendor Governance",
    badge: "30-Day Notification SLA",
    shortSummary: "Rules governing the appointment, auditing, notification, and objection process for third-party sub-processors.",
    content: {
      paragraphs: [
        "Customer provides general written authorization for Rapto to engage the third-party Sub-processors listed in Annex III of this DPA to support the delivery of the Services.",
      ],
      subsections: [
        {
          title: "5.1 Flow-Down Contractual Obligations",
          paragraphs: [
            "Before engaging any Sub-processor, Rapto executes a written agreement imposing data protection obligations no less restrictive than those imposed on Rapto under this DPA, specifically including GDPR Article 28(3) requirements and strict confidentiality covenants.",
          ],
        },
        {
          title: "5.2 Notice of Sub-processor Changes & Right to Object",
          paragraphs: [
            "Rapto maintains an active sub-processor registry and provides at least thirty (30) calendar days' prior written notice to Customer's designated administrative contact before onboarding any new Sub-processor or replacing an existing one.",
            "Customer may object to the appointment of a new Sub-processor on legitimate data protection grounds by notifying Rapto in writing within fourteen (14) days of receiving notice. In such case, Rapto and Customer shall work in good faith to resolve the concern or provide alternative platform configurations.",
          ],
        },
        {
          title: "5.3 Sub-processor Liability",
          paragraphs: [
            "Rapto remains fully liable to Customer for the performance of each Sub-processor's obligations to the same extent as if performed directly by Rapto.",
          ],
        },
      ],
    },
  },
  {
    id: "6-data-subject-rights-and-assistance",
    sectionNumber: "6",
    title: "Data Subject Rights & Assistance",
    badge: "GDPR Articles 15-22 & CCPA",
    shortSummary: "Procedures and automated tools for responding to Data Subject Requests (DSRs) for access, erasure, correction, and portability.",
    content: {
      paragraphs: [
        "Taking into account the nature of the processing, Rapto provides Customer with self-service tools and technical capabilities to assist Customer in fulfilling its statutory obligations to respond to Data Subject Requests under GDPR, UK GDPR, and CCPA/CPRA.",
      ],
      listItems: [
        "Right of Access & Portability: Workspace administrators can export complete meeting transcripts, diarized speaker segments, summary payloads, and action items in structured, machine-readable formats (JSON, CSV, PDF) via the Rapto Admin Console or REST API.",
        "Right to Rectification & Erasure: Administrators can edit speaker attribution, redact sensitive audio segments, or trigger permanent cryptographic deletion of individual transcripts or entire workspace histories.",
        "Data Subject Direct Inquiries: If Rapto receives a request directly from a Data Subject, Rapto shall promptly redirect the Data Subject to submit their request directly to Customer as the Controller, and notify Customer within forty-eight (48) hours.",
      ],
    },
  },
  {
    id: "7-personal-data-breach-notification",
    sectionNumber: "7",
    title: "Personal Data Breach Notification & Response",
    badge: "48-Hour Contractual SLA",
    shortSummary: "Unconditional commitment to notify Controller within 48 hours of any confirmed security breach, with full forensic disclosure.",
    content: {
      paragraphs: [
        "In the event of a confirmed Security Incident or Personal Data Breach affecting Customer Personal Data, Rapto shall notify Customer without undue delay and, in any event, within forty-eight (48) hours of becoming aware of the incident.",
      ],
      callout: {
        type: "security",
        title: "Incident Notification & Transparency Protocol",
        message:
          "Breach notifications will be sent directly to Customer's primary security contact and administrator email address, accompanied by preliminary technical impact assessments and dedicated incident response coordination.",
      },
      listItems: [
        "Nature and Scope: A description of the nature of the Security Incident, including the categories and approximate number of Data Subjects and records affected.",
        "Remediation & Mitigation: Immediate containment measures implemented by Rapto and recommended steps for Customer to mitigate potential adverse effects.",
        "Point of Contact: Name and contact details of Rapto's Data Protection Officer and Lead Security Incident Commander.",
        "Forensic Log Retention: Preservation of all relevant access logs, network telemetry, and forensic artifacts for regulatory submission.",
      ],
    },
  },
  {
    id: "8-data-protection-impact-assessments",
    sectionNumber: "8",
    title: "DPIAs & Supervisory Consultation",
    badge: "GDPR Articles 35-36",
    shortSummary: "Assistance with customer Data Protection Impact Assessments (DPIA), Transfer Impact Assessments (TIA), and regulatory audits.",
    content: {
      paragraphs: [
        "Taking into account the nature of processing and the information available to Rapto, Rapto shall provide reasonable assistance to Customer in conducting:",
      ],
      listItems: [
        "Data Protection Impact Assessments (DPIAs) concerning the deployment and algorithmic operation of Rapto's meeting intelligence features.",
        "Transfer Impact Assessments (TIAs) evaluating the legal protections and surveillance risks associated with international data flows.",
        "Prior consultations with competent Supervisory Authorities (such as European DPAs or the UK Information Commissioner's Office (ICO)).",
      ],
    },
  },
  {
    id: "9-data-deletion-and-return",
    sectionNumber: "9",
    title: "Data Deletion, Return & Retention Schedules",
    badge: "Zero Residual Retention",
    shortSummary: "Protocols for customer-initiated deletion, post-termination hard delete within 30 days, and cryptographic shredding.",
    content: {
      paragraphs: [
        "Upon termination or expiration of the Agreement, or upon written request from Customer, Rapto shall, at Customer's choice, securely return or permanently delete all Customer Personal Data in its possession or control.",
      ],
      subsections: [
        {
          title: "9.1 Post-Termination Erasure Schedule",
          paragraphs: [
            "Customer may export all workspace data within thirty (30) days following contract termination.",
            "Following the 30-day grace period, Rapto permanently initiates automated cryptographic deletion of all Customer Personal Data across primary databases, vector clusters, and cache nodes.",
            "Encrypted secondary disaster recovery backups are overwritten and expunged in the ordinary course of business within a maximum cycle of thirty (30) calendar days.",
          ],
        },
        {
          title: "9.2 Deletion Certification",
          paragraphs: [
            "Upon written request from Customer, Rapto shall provide a formal Certificate of Destruction signed by an executive officer confirming that all Customer Personal Data has been permanently deleted in compliance with NIST SP 800-88 Rev. 1 media sanitization standards.",
          ],
        },
      ],
    },
  },
  {
    id: "10-audits-and-certifications",
    sectionNumber: "10",
    title: "Audits, Certifications & Compliance Verification",
    badge: "Independent Verification",
    shortSummary: "Third-party SOC 2 Type II reports, ISO 27001 certifications, penetration testing summaries, and customer audit rights.",
    content: {
      paragraphs: [
        "Rapto regularly undergoes independent third-party audits to demonstrate ongoing compliance with industry-leading security and privacy frameworks.",
      ],
      listItems: [
        "SOC 2 Type II Audit: Rapto provides Customer with its latest annual SOC 2 Type II report (covering Security, Confidentiality, and Availability trust principles) upon request under NDA.",
        "Penetration Testing: Rapto conducts at least annual penetration tests performed by reputable, CREST-certified independent cybersecurity firms, with executive summaries available to enterprise customers.",
        "Customer Audit Rights: Where required by Applicable Data Protection Law or in the event of a confirmed Security Incident, Customer (or an independent third-party auditor under NDA) may conduct an audit of Rapto's data processing facilities upon thirty (30) days' prior written notice during normal business hours.",
      ],
    },
  },
  {
    id: "11-cross-border-transfers-and-sccs",
    sectionNumber: "11",
    title: "International Cross-Border Data Transfers",
    badge: "EU SCCs & UK Addendum",
    shortSummary: "Legal transfer mechanisms including EU Standard Contractual Clauses (2021/914), UK IDTA, and Swiss Addendum.",
    content: {
      paragraphs: [
        "If the processing of Customer Personal Data involves a transfer of personal data outside the European Economic Area (EEA), United Kingdom, or Switzerland to a country not recognized as offering an adequate level of data protection, the parties agree that such transfer shall be governed by the applicable Standard Contractual Clauses incorporated into this DPA.",
      ],
      subsections: [
        {
          title: "11.1 European Union Transfers (EU SCCs)",
          paragraphs: [
            "The European Commission's Standard Contractual Clauses (Decision 2021/914) are incorporated by reference as follows:",
          ],
          listItems: [
            "Module Two (Controller-to-Processor) applies where Customer is a Controller and Rapto is a Processor.",
            "Module Three (Processor-to-Processor) applies where Customer is a Processor on behalf of a third party and Rapto is a Sub-processor.",
            "Clause 7 (Docking Clause) shall apply.",
            "Clause 9 (Use of Sub-processors): Option 2 (General written authorization) applies with a 30-day notice period.",
            "Clause 11 (Redress): The optional requirement that Data Subjects may lodge a complaint with an independent dispute resolution body does not apply.",
            "Clause 17 & 18 (Governing Law & Jurisdiction): The laws and courts of the Republic of Ireland shall govern.",
          ],
        },
        {
          title: "11.2 United Kingdom Transfers (UK Addendum)",
          paragraphs: [
            "Transfers subject to UK GDPR shall be governed by the UK International Data Transfer Addendum to the EU Commission Standard Contractual Clauses (v B1.0), with the UK Information Commissioner's Office (ICO) designated as the supervisory authority.",
          ],
        },
        {
          title: "11.3 Swiss Transfers (FADP)",
          paragraphs: [
            "Transfers subject to the Swiss Federal Act on Data Protection (FADP) shall be governed by the EU SCCs, with references to the GDPR construed as references to the FADP and the Federal Data Protection and Information Commissioner (FDPIC) as the competent authority.",
          ],
        },
      ],
    },
  },
  {
    id: "12-liability-and-governing-law",
    sectionNumber: "12",
    title: "Liability, Precedence & Governing Law",
    badge: "Legal Precedence",
    shortSummary: "Liability allocation, relationship with the Master Services Agreement, and governing jurisdiction.",
    content: {
      paragraphs: [
        "Each party's liability arising out of or related to this DPA (whether in contract, tort, or under any other theory of liability) shall be subject to the limitations and exclusions of liability set forth in the Agreement, except where prohibited by Applicable Data Protection Law.",
        "In the event of any inconsistency or conflict between this DPA and the Agreement, this DPA shall prevail with respect to data protection obligations. With respect to transfers governed by the Standard Contractual Clauses, the SCCs shall take precedence over all other agreements between the parties.",
      ],
    },
  },
];

export const SUB_PROCESSORS_LIST: SubProcessorEntry[] = [
  {
    name: "Amazon Web Services (AWS)",
    category: "Cloud Infrastructure",
    purpose: "Primary cloud hosting, encrypted database clusters, object storage (S3), and KMS key management.",
    location: "United States (us-east-1, us-west-2) & EU (eu-central-1 Frankfurt) option",
    dataScope: "All Customer Personal Data, encrypted transcripts, backups, and system logs.",
    safeguards: "SOC 1/2/3, ISO 27001/27017/27018, HIPAA, FedRAMP, EU SCCs",
    website: "https://aws.amazon.com/compliance",
  },
  {
    name: "Cloudflare, Inc.",
    category: "Edge & Security",
    purpose: "Edge CDN, DDoS protection, Web Application Firewall (WAF), and global DNS routing.",
    location: "Global Edge Network (285+ cities worldwide)",
    dataScope: "IP addresses, request headers, transit metadata, encrypted network payloads.",
    safeguards: "SOC 2 Type II, ISO 27001, PCI-DSS Level 1, EU SCCs",
    website: "https://www.cloudflare.com/trust-hub",
  },
  {
    name: "OpenAI, LLC (Enterprise Zero Data Retention)",
    category: "AI Inference & Models",
    purpose: "Zero-retention real-time text processing, semantic summarization, and action item extraction via dedicated enterprise API.",
    location: "United States (Dedicated Enterprise Endpoints)",
    dataScope: "Meeting text chunks for summarization during active API requests. ZERO data retention; zero model training.",
    safeguards: "SOC 2 Type II, Strict Business Associate Agreement (BAA), Enterprise DPA with Zero Data Retention (ZDR)",
    website: "https://openai.com/enterprise-privacy",
  },
  {
    name: "Anthropic, PBC (Enterprise Tier)",
    category: "AI Inference & Models",
    purpose: "Long-context meeting intelligence synthesis, commitment tracking, and multi-meeting graph correlation.",
    location: "United States (Dedicated Enterprise Tenant)",
    dataScope: "Anonymized transcript text segments during synthesis. Zero data retention; zero model training.",
    safeguards: "SOC 2 Type II, HIPAA-ready, Zero Retention Commercial Terms, EU SCCs",
    website: "https://www.anthropic.com/security",
  },
  {
    name: "Pinecone Systems, Inc.",
    category: "Cloud Infrastructure",
    purpose: "Isolated dedicated vector database for indexing and querying semantic meeting embeddings.",
    location: "United States / EU Dedicated Cloud",
    dataScope: "Mathematical vector embeddings and anonymized document identifiers (no raw audio stored).",
    safeguards: "SOC 2 Type II, HIPAA Compliant, ISO 27001, AWS PrivateLink isolation",
    website: "https://www.pinecone.io/security",
  },
  {
    name: "Stripe, Inc.",
    category: "Billing & Operations",
    purpose: "Secure payment gateway, subscription management, and corporate invoicing.",
    location: "United States & Ireland",
    dataScope: "Billing contact details, VAT IDs, invoice records (credit card data handled directly by Stripe).",
    safeguards: "PCI-DSS Level 1 Service Provider, SOC 1/2, EU SCCs",
    website: "https://stripe.com/privacy",
  },
  {
    name: "PostHog, Inc. (EU Cloud)",
    category: "Billing & Operations",
    purpose: "Product telemetry, error diagnostics, and feature performance monitoring.",
    location: "European Union (Frankfurt, Germany)",
    dataScope: "Aggregated platform interaction telemetry, anonymized session metrics (no meeting transcript content).",
    safeguards: "GDPR Compliant EU Hosting, SOC 2 Type II, DPA with SCCs",
    website: "https://posthog.com/privacy",
  },
];

export const TECHNICAL_SECURITY_MEASURES: SecurityMeasureCategory[] = [
  {
    domain: "Access Control & Identity",
    icon: "KeyRound",
    description: "Least privilege access models with biometric hardware MFA and zero standing administrative privileges.",
    controls: [
      {
        title: "Role-Based Access Control (RBAC)",
        details: "Granular access permissions assigned strictly on a need-to-know basis. Quarterly administrative access recertification.",
        standard: "SOC 2 CC6.1, CC6.2",
      },
      {
        title: "Hardware Multi-Factor Authentication",
        details: "Mandatory FIDO2/WebAuthn hardware security keys required for all engineering personnel accessing production networks.",
        standard: "NIST SP 800-63B AAL3",
      },
      {
        title: "Single Sign-On (SSO) & SCIM",
        details: "SAML 2.0 and OIDC enterprise SSO integrations with automated just-in-time user provisioning and immediate deprovisioning.",
        standard: "ISO 27001 A.9",
      },
    ],
  },
  {
    domain: "Data Encryption & Key Management",
    icon: "Lock",
    description: "End-to-end cryptographic safeguards across all states of data lifecycle.",
    controls: [
      {
        title: "Encryption at Rest (AES-256)",
        details: "All primary databases, file stores, backups, and vector embeddings are encrypted using FIPS 140-3 validated AES-256.",
        standard: "SOC 2 CC6.6, CC6.7",
      },
      {
        title: "Encryption in Transit (TLS 1.3)",
        details: "Enforced TLS 1.3 with Perfect Forward Secrecy (PFS) and HSTS. Microservice-to-microservice traffic secured via mTLS.",
        standard: "NIST SP 800-52 Rev. 2",
      },
      {
        title: "Customer-Managed Encryption Keys (CMEK/BYOK)",
        details: "Enterprise capability to manage and revoke root encryption keys hosted within Customer's own AWS KMS or Azure Key Vault.",
        standard: "FIPS 140-3 Level 3",
      },
    ],
  },
  {
    domain: "Infrastructure & Network Defense",
    icon: "Server",
    description: "Hardened cloud perimeter with proactive defense-in-depth architecture.",
    controls: [
      {
        title: "Zero Ingress Database Isolation",
        details: "Databases reside in private isolated subnets with no public IP routes, accessible only through hardened internal bastions.",
        standard: "CIS AWS Benchmarks",
      },
      {
        title: "Web Application Firewall (WAF) & DDoS Defense",
        details: "Continuous edge inspection mitigating OWASP Top 10 exploits, rate limiting, and terabit-scale DDoS attacks.",
        standard: "SOC 2 CC6.6",
      },
      {
        title: "Automated Vulnerability Scanning (SAST/DAST)",
        details: "Continuous CI/CD pipeline code analysis, software bill of materials (SBOM) tracking, and zero-day dependency alerting.",
        standard: "ISO 27001 A.12.6",
      },
    ],
  },
  {
    domain: "Incident Response & Business Continuity",
    icon: "Activity",
    description: "Tested disaster recovery with redundant failover and automated backups.",
    controls: [
      {
        title: "24/7 Security Operations & SIEM",
        details: "Automated telemetry ingestion with real-time anomaly detection and dedicated on-call Incident Commanders.",
        standard: "SOC 2 CC7.2, CC7.3",
      },
      {
        title: "Continuous Replication & Point-in-Time Recovery",
        details: "RPO < 15 minutes, RTO < 2 hours with automated cross-region database replication and monthly recovery drill simulations.",
        standard: "ISO 22301 / SOC 2 CC9.1",
      },
      {
        title: "Cryptographic Sanitization & Deletion",
        details: "Adherence to NIST SP 800-88 Rev. 1 media sanitization standards for verified data erasure and customer workspace shredding.",
        standard: "NIST SP 800-88 Rev. 1",
      },
    ],
  },
];

export const ANNEXES_LIST = [
  {
    id: "annex-1-details-of-processing",
    annexNumber: "Annex I",
    title: "Annex I: Details of Processing & Data Subjects",
    shortSummary: "Categories of data subjects, categories of personal data, nature, purpose, and retention duration.",
  },
  {
    id: "annex-2-technical-and-organizational-measures",
    annexNumber: "Annex II",
    title: "Annex II: Technical & Organizational Measures (TOMs)",
    shortSummary: "Detailed checklist of technical and organizational security controls implemented by Rapto.",
  },
  {
    id: "annex-3-authorized-sub-processors",
    annexNumber: "Annex III",
    title: "Annex III: Authorized Sub-processors Registry",
    shortSummary: "Approved third-party sub-processors, hosting locations, certifications, and data scope.",
  },
  {
    id: "annex-4-us-state-privacy-law-addendum",
    annexNumber: "Annex IV",
    title: "Annex IV: US State Privacy Law Addendum (CCPA/CPRA)",
    shortSummary: "Service provider certifications, prohibition on sale/share of personal information.",
  },
];
