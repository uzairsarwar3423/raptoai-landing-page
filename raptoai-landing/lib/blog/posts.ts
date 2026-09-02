import { BlogPost } from "./types";
import { authors } from "./authors";
import { categories } from "./categories";

export const posts: BlogPost[] = [
  {
    id: "rapto-ai-backend-architecture-system-design",
    slug: "rapto-ai-backend-architecture-system-design",
    title: "Rapto AI System Design: Inside Our Distributed Meeting Accountability Architecture",
    seoTitle: "Rapto AI System Design & Backend Architecture Deep-Dive (2026) | Engineering Case Study",
    excerpt: "A comprehensive, code-level teardown of Rapto AI's distributed backend: Node.js API, Python FastAPI AI pipeline, polyglot persistence (PostgreSQL + MongoDB + Redis), BullMQ queue workers, and cross-meeting resolution state machines.",
    metaDescription: "An in-depth system design case study of Rapto AI's backend architecture. Discover how Node.js, Python FastAPI, PostgreSQL, MongoDB, Redis, BullMQ, and LLM resolution engines power real-time meeting accountability.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "High-throughput distributed backend server network topology representing Rapto AI system design",
    coverImageGradient: "from-indigo-950/40 via-slate-950/20 to-transparent",
    author: authors["sarah-chen"],
    category: categories["ai-architecture"],
    tags: ["cross-meeting-memory", "ai-action-items", "botless-recording", "soc2-compliance", "linear-integration"],
    publishedAt: "2026-09-01T08:00:00Z",
    updatedAt: "2026-09-02T10:00:00Z",
    status: "published",
    readingTime: "14 min read",
    wordCount: 3850,
    topicCluster: "pillar",
    featured: true,
    directAnswer: {
      headline: "How is Rapto AI's Backend Architected?",
      summary: "Rapto AI is built on a decoupled microservices architecture featuring a high-concurrency Node.js/Express API gateway for business logic and integrations, an asynchronous Python/FastAPI microservice for LLM extraction and cross-meeting resolution, a distributed BullMQ worker cluster on Redis 7, and a polyglot persistence layer pairing PostgreSQL 16 (relational ACID state) with MongoDB 7 (unstructured transcripts) and Redis 7 (caching and queues).",
      keyPoints: [
        "Decoupled Core: Node.js API handles high-concurrency I/O, Webhooks, and OAuth integrations, while Python FastAPI executes LLM tokenization, chunking, and similarity graph matching.",
        "Polyglot Persistence: PostgreSQL 16 via Prisma ORM for relational models (ACID), MongoDB 7 for raw diarized audio transcripts, and Redis 7 for BullMQ queues and distributed locks.",
        "Deterministic State Machine: Meetings progress asynchronously through a 10-state lifecycle (SCHEDULED → BOT_JOINING → RECORDING → TRANSCRIBED → CLEANED → EXTRACTED → RESOLVED → DONE).",
        "Cross-Meeting Memory Engine: Evaluates current conversation transcripts against unresolved historical commitments using semantic vector similarity (threshold 0.65) and fuzzy speaker entity resolution.",
      ],
    },
    tableOfContents: [
      { id: "why-rapto-ai-needs-this-architecture", text: "Why Rapto AI Needs This Architecture", level: 2 },
      { id: "high-level-architecture", text: "High-Level System Architecture (Interactive React Flow)", level: 2 },
      { id: "core-services-breakdown", text: "Core Services Breakdown", level: 2 },
      { id: "node-api-gateway", text: "1. Node.js Core API Gateway (Express + TypeScript)", level: 3 },
      { id: "python-ai-pipeline", text: "2. Python AI Pipeline Microservice (FastAPI + Pydantic)", level: 3 },
      { id: "bullmq-background-workers", text: "3. Distributed Background Workers (BullMQ + Redis)", level: 3 },
      { id: "request-and-api-data-flow", text: "Request / API Data Flow", level: 2 },
      { id: "service-to-service-communication", text: "Service-to-Service Communication & HMAC Security", level: 2 },
      { id: "database-and-storage-architecture", text: "Database & Polyglot Persistence Architecture", level: 2 },
      { id: "postgresql-schema-and-rls", text: "PostgreSQL: Relational Source of Truth & Tenant Isolation", level: 3 },
      { id: "mongodb-transcript-storage", text: "MongoDB: Large Semi-Structured Transcript Document Store", level: 3 },
      { id: "redis-caching-and-locks", text: "Redis: BullMQ Queues, Distributed Locks & Session Caching", level: 3 },
      { id: "async-processing-and-queue-topology", text: "Async Processing & Queue Topology", level: 2 },
      { id: "end-to-end-meeting-workflow", text: "Important End-to-End User Workflow", level: 2 },
      { id: "external-integrations-and-bot-orchestration", text: "External Integrations & Bot Orchestration", level: 2 },
      { id: "security-authentication-and-multi-tenancy", text: "Security, Authentication & Multi-Tenancy", level: 2 },
      { id: "scalability-resilience-and-fault-tolerance", text: "Scalability, Resilience & Fault Tolerance", level: 2 },
      { id: "key-architectural-trade-offs", text: "Key Architectural Trade-offs", level: 2 },
      { id: "lessons-for-building-a-production-saas", text: "Lessons for Building a Production SaaS Platform", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "cross-meeting-memory-architecture",
      "ai-meeting-accountability-guide",
      "botless-vs-bot-meeting-intelligence",
      "soc2-meeting-privacy-governance-enterprise-guide",
    ],
    faq: [
      {
        question: "Why did Rapto AI split the backend between Node.js and Python rather than using a single monolith?",
        answer: "Node.js with TypeScript is uniquely suited for high-throughput, I/O-intensive operations like handling hundreds of concurrent OAuth webhook integrations (Jira, Linear, Slack, Google Calendar, Outlook), managing real-time Socket.io connections, and serving low-latency REST APIs. Python with FastAPI provides first-class native tooling for machine learning, tokenization via tiktoken, sliding-window chunking, NumPy/SciPy similarity matrix computations, and asynchronous LLM orchestration with Pydantic type safety.",
      },
      {
        question: "How does Rapto AI prevent data leaks between enterprise tenants in a shared database?",
        answer: "Rapto AI implements defense-in-depth tenant isolation across four distinct layers: (1) Application-level middleware enforcing strict teamId constraints, (2) Prisma ORM query extensions automatically injecting teamId filters into every query, (3) PostgreSQL Row-Level Security (RLS) policies enforcing database-level isolation, and (4) Namespace-scoped Redis keys (e.g. cache:team:{teamId}:...).",
      },
      {
        question: "What happens if the Python AI pipeline crashes or encounters an OpenAI API timeout during extraction?",
        answer: "The pipeline is designed with robust degradation modes. It executes multi-chunk extraction with asyncio.gather(return_exceptions=True) to isolate failures to individual chunks. If an unrecoverable timeout occurs, BullMQ worker retries with exponential backoff. If transcript cleanup fails, the system transitions to TRANSCRIPT_CLEANUP_DEGRADED and processes the raw transcript directly, ensuring customer commitments are never permanently lost.",
      },
      {
        question: "How does Rapto AI handle bot deduplication when multiple team members connect their calendars to the same meeting?",
        answer: "Rapto AI's dedup.service.ts intercepts calendar synchronization events, computes a canonical meeting signature based on conference URL and normalized start time, and acquires a distributed Redis lock (SET NX EX). Exactly one bot is dispatched per conference call across the entire organization, preventing awkward duplicate bot attendees.",
      },
    ],
    content: `
## Why Rapto AI Needs This Architecture

Modern meeting assistants typically suffer from two severe structural shortcomings:
1. **The Passive Transcript Trap**: They act as basic audio transcription recorders that dump thousands of words into passive summary documents nobody reads.
2. **Stateless Disconnection**: They treat every meeting as an isolated, ephemeral event, completely blind to promises made in prior standups or sprint reviews.

Rapto AI is engineered specifically to solve the **Accountability Gap**—turning ephemeral spoken conversations into persistent, tracked commitments that bi-directionally sync with developer issue trackers (Linear, Jira) and verify resolution across successive meetings.

To deliver this at production scale, the platform must satisfy five demanding technical requirements:
* **Asynchronous Multi-Stage Processing**: Ingest multi-gigabyte audio streams and thousands of diarized dialogue turns without blocking the user-facing REST API.
* **Dual Persistence Model**: Maintain ACID transaction guarantees for multi-tenant billing, permissions, and team ownership (PostgreSQL), while storing large, flexible transcript payloads and prompt traces (MongoDB).
* **Deterministic NLP State Extraction**: Extract structured commitments (Actor, Action, Deadline, Confidence) from messy human dialogue while defending against LLM hallucinations.
* **Cross-Meeting Memory Graph**: Match current spoken phrases (e.g., *"I pushed the auth fix yesterday"*) against historical open promises across weeks of standups.
* **High-Throughput Webhook Orchestration**: Ingest and dispatch real-time webhooks across Zoom, Google Meet, Microsoft Teams, Linear, Jira, Slack, and Paddle.

---

## High-Level System Architecture

Rapto AI employs a **decoupled microservices architecture** separated along functional domain boundaries: an edge reverse proxy gateway, a Node.js Core API, a Python AI extraction microservice, an asynchronous BullMQ worker cluster, and a polyglot data tier.

[ReactFlow:high-level] (Interactive Rapto AI High-Level Architecture — Pan, zoom, and drag nodes to explore the ingress, compute, data, and integration layers)

---

## Core Services Breakdown

The backend is partitioned into three specialized runtime environments:

### 1. Node.js Core API Gateway (Express + TypeScript)
Located in \`services/api\`, this service runs on Node.js 20+ with Express and TypeScript. It acts as the central business logic controller, multi-tenant authentication provider, and external webhook listener.

* **Authentication & Identity**: JWT access tokens (15-minute expiry in memory) + cryptographically hashed refresh tokens (30-day sliding window in PostgreSQL), OAuth 2.0 (Google, Microsoft, GitHub), and SAML 2.0 / OIDC enterprise SSO.
* **Multi-Tenancy & Authorization**: Enforces strict \`teamId\` partition rules using Prisma ORM middleware and RBAC/ABAC permission checks (\`OWNER\`, \`ADMIN\`, \`MANAGER\`, \`MEMBER\`).
* **Bot & Calendar Sync**: Contains \`calendar-sync.service.ts\` for polling Google Calendar and Outlook Graph deltas, and \`dedup.service.ts\` to ensure only one bot joins a multi-attendee meeting.
* **Speaker Resolution**: Runs \`owner-resolver.service.ts\` to map fuzzy speech tags (e.g., "Sarah", "sarah@company.com", "Sarah C") to verified team member IDs.

### 2. Python AI Pipeline Microservice (FastAPI + Pydantic)
Located in \`services/ai-pipeline\`, this service runs on Python 3.11 with FastAPI and Uvicorn. It is dedicated strictly to compute-heavy natural language processing, semantic similarity calculations, prompt template compilation, and OpenAI API orchestration.

* **Sliding-Window Chunker (\`chunker.py\`)**: Splits raw transcripts into token-bounded segments (\`EXTRACTION_CHUNK_MAX_TOKENS = 3000\`) with overlapping dialogue turns (\`EXTRACTION_CHUNK_OVERLAP_TURNS = 2\`) to preserve conversational context across split boundaries.
* **Hierarchical Extractor (\`extractor.py\`)**: Executes concurrent multi-chunk extraction via \`asyncio.gather(return_exceptions=True)\`, followed by a meta-summary synthesis pass.
* **Cross-Chunk Entity Deduplication**: Compares extracted decisions, blockers, and commitments across chunks using normalized Levenshtein and cosine similarity with a strict threshold (\`_CROSS_CHUNK_DEDUP_THRESHOLD = 0.70\`).
* **Cross-Meeting Resolution Engine (\`resolution_detector.py\` & \`commitment_resolver.py\`)**: Evaluates active open commitments from historical meetings against current conversational utterances to detect fulfillment, blockers, or timeline amendments.

### 3. Distributed Background Workers (BullMQ + Redis)
Running as a dedicated container (\`rapto-worker\`), this Node.js process consumes jobs from Redis-backed BullMQ queues. It decouples long-running asynchronous workflows from client HTTP latency.

---

## Request / API Data Flow

Every external HTTP request entering Rapto AI passes through an engineered validation, authentication, and rate-limiting pipeline:

\`\`\`mermaid
sequenceDiagram
  autonumber
  actor User as Web / Mobile Client
  participant Nginx as NGINX Reverse Proxy
  participant API as Node.js API Gateway
  participant Redis as Redis 7 (Rate Limit & Cache)
  participant Postgres as PostgreSQL (Prisma ORM)
  participant Worker as BullMQ Queue

  User->>Nginx: POST /api/v1/meetings/{id}/process (Bearer JWT)
  Nginx->>Nginx: Rate Limit Check (Zone: api_limit)
  Nginx->>API: Proxy to http://api:5000
  API->>API: Validate JWT Signature & Expiry
  API->>Redis: Check User Session & Permissions Cache
  alt Cache Miss
    API->>Postgres: Query TeamMember & Role (Prisma RLS)
    API->>Redis: Cache Session (TTL: 300s)
  end
  API->>Postgres: Verify Resource Ownership (teamId match)
  API->>Worker: Enqueue Job into 'extract.queue'
  API->>Postgres: Update MeetingStatus to 'PROCESSING'
  API-->>User: HTTP 202 Accepted { jobId: "job_9841fbc", status: "PROCESSING" }
\`\`\`

---

## Service-to-Service Communication & HMAC Security

The Node.js API and Python AI Pipeline communicate over private internal Docker networks (\`rapto-app-network\`). To prevent unauthorized execution or internal request spoofing, all inter-service endpoints enforce strict cryptographic authentication:

\`\`\`mermaid
sequenceDiagram
  autonumber
  participant Worker as Node.js BullMQ Worker
  participant AIPipeline as Python FastAPI (:8001)
  participant OpenAI as OpenAI API

  Worker->>Worker: Prepare ExtractRequest Payload
  Worker->>Worker: Attach 'X-Service-Key' Header (API_SHARED_SECRET)
  Worker->>AIPipeline: POST /api/v1/extract (JSON Payload)
  AIPipeline->>AIPipeline: verify_internal_service_key() (Constant-Time Compare)
  alt Key Invalid / Missing
    AIPipeline-->>Worker: HTTP 401 Unauthorized
  end
  AIPipeline->>AIPipeline: Chunk Transcript & Tokenize (tiktoken)
  AIPipeline->>OpenAI: Concurrent Structured Extraction (GPT-4o)
  OpenAI-->>AIPipeline: Structured JSON Entities
  AIPipeline->>AIPipeline: Cross-Chunk Deduplication (threshold: 0.70)
  AIPipeline-->>Worker: HTTP 200 OK (ExtractResponse Model)
\`\`\`

\`\`\`python
# Python FastAPI Inter-Service Authentication Dependency
async def verify_internal_service_key(
    x_service_key: Optional[str] = Header(None, alias="X-Service-Key")
) -> None:
    if not x_service_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-Service-Key authentication header"
        )
    if not secrets.compare_digest(x_service_key, settings.API_SHARED_SECRET):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid service key credentials"
        )
\`\`\`

---

## Database & Polyglot Persistence Architecture

Rapto AI rejects the anti-pattern of forcing all data structures into a single database. Instead, it leverages a **Polyglot Persistence** model optimized for access patterns, scale, and compliance:

[ReactFlow:polyglot] (Interactive Polyglot Storage Architecture — PostgreSQL ACID models, MongoDB transcript documents, and Redis queue/caching layers)

### PostgreSQL: Relational Source of Truth & Tenant Isolation
* Managed with **Prisma ORM** with migration parity across staging and production.
* Houses high-integrity entities requiring strict relational foreign keys and ACID transactional integrity (e.g., users, teams, memberships, commitment statuses, external ticket mappings, Paddle subscription states).
* **Tenant Isolation**: Every tenant entity includes an indexed \`team_id\` foreign key. PostgreSQL Row-Level Security (RLS) policies enforce hardware-level database isolation.

### MongoDB: Large Semi-Structured Transcript Document Store
* A typical 60-minute meeting produces over 1,500 diarized dialogue turns, acoustic word-level confidence arrays, and structured prompt audit logs.
* Storing large multi-megabyte JSON trees in relational tables causes table bloat and high memory pressure. MongoDB stores raw transcripts and intermediate LLM payloads with flexible schemas and sub-millisecond retrieval.

### Redis: BullMQ Queues, Distributed Locks & Session Caching
* Houses 9 BullMQ job queues.
* Stores short-lived ephemeral OAuth state verification tokens (\`oauth:state:{token}\`, TTL 600s).
* Acts as a distributed lock manager (\`redlock\`) to prevent race conditions during calendar bot dispatches and Paddle webhook processing.

---

## Async Processing & Queue Topology

The platform relies on a distributed cluster of **9 specialized BullMQ queues** to handle all asynchronous computation:

[ReactFlow:queues] (Interactive BullMQ Asynchronous Processing Pipeline — Dependency graph of all 9 queue stages)

| Queue Name | Worker File | Concurrency | Job Responsibility |
| :--- | :--- | :--- | :--- |
| **\`transcribe.queue\`** | \`transcribe.worker.ts\` | 5 | Ingests Recall.ai webhooks, stores diarized transcripts in MongoDB, triggers extraction. |
| **\`extract.queue\`** | \`extract.worker.ts\` | 10 | Chunks transcript, calls Python AI microservice, persists extracted commitments to PostgreSQL. |
| **\`resolve.queue\`** | \`resolve.worker.ts\` | 5 | Executes cross-meeting resolution against past open promises, updates fulfillment states. |
| **\`integrate.queue\`** | \`integrate.worker.ts\` | 15 | Dispatches bi-directional issues into Linear, Jira, Notion, and Slack. |
| **\`notify.queue\`** | \`notify.worker.ts\` | 20 | Sends Brevo transactional emails, Slack Block Kit messages, and Socket.io events. |
| **\`calendar-sync.queue\`** | \`calendar-sync.worker.ts\` | 5 | Syncs Google Calendar and Microsoft Outlook Graph deltas every 15 minutes. |
| **\`calendar.queue\`** | \`calendar.worker.ts\` | 10 | Schedules and dispatches Recall.ai bot instances for upcoming calendar events. |
| **\`deadline.queue\`** | \`deadline.worker.ts\` | 2 | Cron-like worker evaluating upcoming and overdue commitment deadlines. |
| **\`token-refresh.queue\`** | \`token-refresh.worker.ts\` | 3 | Proactively refreshes expiring OAuth access tokens before integration API calls fail. |

---

## Important End-to-End User Workflow

Here is how a real-world commitment transitions from spoken audio to a closed Linear issue and an updated Team Health Score:

[ReactFlow:e2e] (Interactive End-to-End Commitment Lifecycle — From spoken meeting dialogue to automated Linear issue and Team Health Score update)

\`\`\`mermaid
sequenceDiagram
  autonumber
  actor Engineer as Engineer (Dave)
  participant Meet as Video Conference (Google Meet / Zoom)
  participant Recall as Recall.ai Recording Bot
  participant API as Node.js API Gateway
  participant Worker as BullMQ Worker Cluster
  participant PythonAI as Python AI Pipeline
  participant DB as PostgreSQL & MongoDB
  participant Linear as Linear / Jira Backlog
  participant Slack as Slack Channel

  Engineer->>Meet: "I'll benchmark the connection pool before Thursday's release"
  Meet-->>Recall: Audio Stream Captured
  Meet->>Meet: Meeting Concludes
  Recall->>API: Webhook: bot.status_change (DONE + Transcript URL)
  API->>Worker: Enqueue to 'transcribe.queue'
  Worker->>DB: Store Diarized Transcript into MongoDB
  Worker->>Worker: Enqueue to 'extract.queue'
  Worker->>PythonAI: POST /extract (Cleaned Transcript)
  PythonAI->>PythonAI: Chunking + Structured Entity Extraction
  PythonAI-->>Worker: Extracted Commitment: { Actor: "Dave", Action: "Benchmark connection pool", Deadline: "2026-09-04" }
  Worker->>DB: Resolve Speaker Dave -> TeamMember usr_982 & Insert Commitment (PENDING)
  Worker->>Worker: Enqueue 'integrate.queue' & 'resolve.queue'
  Worker->>Linear: POST /issues (Create Issue: "Benchmark connection pool")
  Linear-->>Worker: Issue Created (ENG-842)
  Worker->>DB: Save ExternalCommitmentMapping (Jira/Linear ID: ENG-842)
  Worker->>Slack: Send Interactive Block Kit Card to #eng-backend

  Note over Engineer,Meet: Next Standup (3 Days Later)
  Engineer->>Meet: "That connection pool benchmark is done, latency dropped 40%"
  Meet-->>Recall: Audio Stream Captured
  Recall->>API: Webhook: Transcript Ready
  Worker->>PythonAI: POST /resolve (Unresolved Commitments + Current Transcript)
  PythonAI->>PythonAI: Vector Similarity Match (0.89 Confidence)
  PythonAI-->>Worker: Resolution: { commitmentId: "cmt_104", status: "FULFILLED" }
  Worker->>DB: Update Commitment status = 'FULFILLED'
  Worker->>DB: Recalculate TeamHealthScore (Recency-Weighted Velocity)
  Worker->>Slack: Update Slack Card: FULFILLED ✓
\`\`\`

---

## External Integrations & Bot Orchestration

Rapto AI connects directly with enterprise identity, meeting, productivity, and billing platforms:

* **Video & Audio Capture**: Interfaced via **Recall.ai**, supporting automated bot dispatch and native calendar ingestion across Zoom, Google Meet, Microsoft Teams, and Webex.
* **Calendar Synchronization**: Bidirectional delta-token sync with **Google Calendar API v3** and **Microsoft Graph API**.
* **Work Management**: Deep bi-directional OAuth integrations with **Linear SDK**, **Atlassian Jira REST API**, and **Notion API**.
* **Real-Time Team Comms**: **Slack Bolt SDK** with interactive Block Kit messages, commitment snooze actions, and fulfillment broadcasts.
* **Transactional Email**: **Brevo (Sendinblue) API** for transactional onboarding drips, password resets, and automated Monday morning accountability digests.
* **SaaS Billing & Subscriptions**: **Paddle Billing v2 SDK** with cryptographic webhook signature verification (\`Paddle-Signature\` SHA-256 HMAC) managing multi-tier team subscriptions (\`STARTER\`, \`GROWTH\`, \`BUSINESS\`, \`ENTERPRISE\`).

---

## Security, Authentication & Multi-Tenancy

Rapto AI is engineered to satisfy enterprise security audits and SOC-2 Type II controls:

\`\`\`mermaid
graph TD
  subgraph Security_Architecture [Defense-in-Depth Security Layers]
    L1[Layer 1: Edge TLS 1.3 & NGINX Rate Limiting]
    L2[Layer 2: JWT Access Token 15m + Rotating HttpOnly Refresh Token 30d]
    L3[Layer 3: Prisma ORM Tenant Middleware auto-injecting teamId]
    L4[Layer 4: PostgreSQL Row-Level Security RLS Policies]
    L5[Layer 5: AES-256-GCM Envelope Encryption for OAuth Tokens]
    L6[Layer 6: Zero-Data-Retention Agreements on LLM Pipelines]
  end

  L1 --> L2
  L2 --> L3
  L3 --> L4
  L4 --> L5
  L5 --> L6
\`\`\`

1. **Token Rotation & Theft Detection**: If an attacker attempts to replay an expired or already-rotated refresh token, the system instantly revokes all active sessions for that user and fires a security alert.
2. **Encrypted Secrets**: All third-party OAuth access and refresh tokens (Jira, Linear, Google, Slack) are encrypted at rest using AES-256-GCM before writing to PostgreSQL.
3. **Zero Foundation Model Training**: Customer conversational audio and transcripts are processed exclusively under zero-data-retention (ZDR) enterprise terms. Raw audio buffers are deleted immediately following transcription.

---

## Scalability, Resilience & Fault Tolerance

To guarantee 99.9% uptime during traffic surges (e.g. all client standups concluding simultaneously at 9:30 AM EST), the architecture implements several defensive patterns:

* **Hierarchical Chunking with Error Isolation**: In \`services/ai-pipeline/src/services/extraction/extractor.py\`, multi-chunk processing uses \`asyncio.gather(return_exceptions=True)\`. If chunk 3 fails due to a transient API blip, chunks 1, 2, and 4 still succeed, returning a **Partial Extraction (HTTP 206)** rather than crashing the entire meeting job.
* **Transcript Cleanup Degradation**: If the text cleanup pipeline fails, the state transitions to \`TRANSCRIPT_CLEANUP_DEGRADED\` and immediately routes the raw transcript to the extractor.
* **Dead Letter Queues (DLQ) & Exponential Backoff**: All BullMQ workers configure exponential backoff (e.g., attempts: 5, backoff: 3000ms exponential). Jobs exceeding max retries are moved to a dead-letter queue with Sentry alerting.
* **Proactive OAuth Token Refresher**: \`token-refresh.worker.ts\` runs every 10 minutes to refresh tokens expiring within the next 30 minutes, eliminating 401 Unauthorized errors during webhook dispatches.

---

## Key Architectural Trade-offs

Every production system design represents deliberate trade-offs:

| Decision | Chosen Architecture | Rejected Alternative | Engineering Rationale |
| :--- | :--- | :--- | :--- |
| **Backend Language Split** | Node.js (API) + Python (AI) | Single Node.js or Python Monolith | Node.js excels at high-concurrency webhook I/O and OAuth integrations. Python is non-negotiable for robust AI chunking, tokenization, and vector similarity mathematics. |
| **Data Storage Model** | Dual (PostgreSQL + MongoDB) | Pure PostgreSQL (JSONB) or Pure MongoDB | JSONB in PostgreSQL causes table bloat on multi-megabyte transcripts. Pure MongoDB lacks strict relational foreign keys and ACID billing transactions. |
| **Task Synchronization** | Asynchronous BullMQ Queue | Synchronous HTTP Chaining | Processing audio, LLM extraction, and syncing 4 external issue trackers takes 15–45 seconds. Synchronous calls would cause client HTTP timeouts. |
| **Multi-Tenancy** | Shared Schema + Tenant Column | Database-per-tenant | Database-per-tenant creates massive operational overhead (running 1,000+ Postgres instances) and slow schema migrations for B2B SaaS. |

---

## Lessons for Building a Production SaaS Platform

1. **Decouple Fast I/O from Heavy LLM Inference**: Never make your user-facing API wait on an LLM inference call. Return HTTP 202 Accepted immediately and push processing to background workers.
2. **Design State Machines with Degraded Fallbacks**: AI APIs will timeout, rate-limit, or hallucinate. Your system must support explicit degradation states (\`EXTRACTED_PARTIAL\`, \`TRANSCRIPT_CLEANUP_DEGRADED\`) so users still get value.
3. **Treat Token Lifecycles as First-Class Citizens**: If you integrate with third-party tools (Linear, Jira, Slack, Google Calendar), proactive background token refreshing is mandatory. Never wait for an API call to fail with a 401 to refresh tokens.
4. **Isolate Raw Transcripts from Relational Rows**: Transcripts are write-heavy, large, and read infrequently after processing. Keep them in document storage or object stores to keep your primary relational database lean and lightning-fast.

---

## Frequently Asked Questions

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why did Rapto AI split the backend between Node.js and Python?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Node.js with TypeScript is uniquely suited for high-throughput, I/O-intensive operations like handling hundreds of concurrent OAuth webhook integrations, managing real-time Socket.io connections, and serving low-latency REST APIs. Python with FastAPI provides first-class native tooling for tokenization, chunking, and AI model orchestration."
      }
    },
    {
      "@type": "Question",
      "name": "How does Rapto AI ensure multi-tenant data isolation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rapto AI implements defense-in-depth tenant isolation: application middleware, Prisma ORM query extensions auto-injecting teamId filters, PostgreSQL Row-Level Security (RLS), and namespace-scoped Redis keys."
      }
    }
  ]
}
\`\`\`
    `,
  },
  {
    id: "ai-meeting-accountability-guide",
    slug: "ai-meeting-accountability-guide",
    title: "The Complete Guide to AI Meeting Accountability: Turning Spoken Promises into Shipped Software",
    seoTitle: "The Complete Guide to AI Meeting Accountability (2026) | Rapto",
    excerpt: "70% of verbal commitments made in technical meetings disappear into the void. Learn how cross-meeting memory and automated commitment tracking turn conversations into verifiable execution.",
    metaDescription: "Discover how AI meeting accountability transforms passive meeting transcripts into active follow-through. Learn the 4-phase commitment lifecycle, cross-meeting memory, and team workflows.",
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Engineering team collaborating around real-time digital architecture board",
    coverImageGradient: "from-emerald-900/40 via-teal-900/20 to-transparent",
    author: authors["sarah-chen"],
    category: categories["meeting-accountability"],
    tags: ["ai-action-items", "cross-meeting-memory", "accountability-score"],
    publishedAt: "2026-08-15T08:00:00Z",
    updatedAt: "2026-08-28T14:30:00Z",
    status: "published",
    readingTime: "9 min read",
    wordCount: 2450,
    topicCluster: "pillar",
    featured: true,
    directAnswer: {
      headline: "What is AI Meeting Accountability?",
      summary: "AI Meeting Accountability is a software category that moves beyond passive transcription to automatically extract, assign, verify, and resolve spoken commitments across successive meetings and developer tools.",
      keyPoints: [
        "Replaces unread meeting summaries with deterministic promise-tracking state machines.",
        "Maintains cross-meeting memory to verify whether promises made in past meetings were fulfilled today.",
        "Bi-directionally syncs commitments into Linear, Jira, and Slack with explicit assignees and deadlines.",
        "Calculates fair, recency-weighted team execution scores without invasive surveillance.",
      ],
    },
    tableOfContents: [
      { id: "the-broken-promise-paradox", text: "The Broken Promise Paradox in Modern Tech Squads", level: 2 },
      { id: "why-passive-summaries-fail", text: "Why 5-Page AI Summaries Fail the Execution Test", level: 2 },
      { id: "the-4-phase-commitment-lifecycle", text: "The 4-Phase AI Commitment Lifecycle", level: 2 },
      { id: "detection-and-nlp-extraction", text: "Phase 1: Deterministic Extraction vs Hallucination", level: 3 },
      { id: "cross-meeting-resolution", text: "Phase 2: Temporal Cross-Meeting Resolution", level: 3 },
      { id: "bi-directional-sync", text: "Phase 3: Deep Issue Tracker & Slack Integration", level: 3 },
      { id: "verification-and-scoring", text: "Phase 4: Objective Verification & Scoring", level: 3 },
      { id: "measuring-roi", text: "Quantifying the Business ROI of Meeting Accountability", level: 2 },
      { id: "common-implementation-pitfalls", text: "Common Pitfalls & How to Avoid Them", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "cross-meeting-memory-architecture",
      "why-70-percent-meeting-action-items-fail",
      "engineering-standups-commitment-tracking",
    ],
    faq: [
      {
        question: "How does AI meeting accountability differ from transcription tools like Otter or Fireflies?",
        answer: "Transcription tools only record audio and output text summaries that teams rarely read. AI meeting accountability actively extracts distinct commitment promises (who, what, when), tracks them over time across multiple calls, checks status during subsequent meetings, and syncs directly into Linear or Jira.",
      },
      {
        question: "Does commitment tracking create an uncomfortable micromanagement culture?",
        answer: "When implemented properly with transparent recency-weighted metrics and team-level scoring, it does the exact opposite. It eliminates fuzzy blame games, creates clarity around ownership, and ensures quiet, reliable contributors get recognized for dependable execution.",
      },
      {
        question: "How does the system know when a commitment has been completed?",
        answer: "Through multi-modal verification: checking Linear/Jira issue states, listening for verbal confirmations in subsequent standups or sprint reviews ('I shipped the auth PR yesterday'), and bi-directional Slack resolution prompts.",
      },
    ],
    content: `
## The Broken Promise Paradox in Modern Tech Squads

Every week across engineering, product, and leadership organizations, thousands of high-stakes verbal commitments are exchanged:

> *"I'll benchmark the Redis cluster before Wednesday's release."*  
> *"I'll sync with compliance on the SOC-2 audit logs by tomorrow morning."*  
> *"I will draft the RFC for the database migration and tag the principal team."*

According to cross-organizational workplace studies, **over 70% of verbal commitments made in technical meetings are either forgotten, delayed, or renegotiated without documentation**.

This isn't caused by bad intentions. It is a structural failure of modern collaboration architectures. Human short-term working memory decays rapidly after a 60-minute multi-threaded debate. When engineers jump from standup to sprint review to customer escalation, spoken promises dissipate into the ether.

\`\`\`text
┌─────────────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│  Spoken Commitment      │ ───► │  Meeting Concludes      │ ───► │  Context Decay (70% Lost)│
│  "I will push the RFC"  │      │  Tab Closed / Next Call │      │  No Issue Created        │
└─────────────────────────┘      └─────────────────────────┘      └─────────────────────────┘
\`\`\`

---

## Why 5-Page AI Summaries Fail the Execution Test

First-generation AI meeting assistants (such as Otter.ai and Fireflies) solved transcription accuracy. But they created a secondary failure mode: **the notification flood**.

After every call, attendees receive an automated 5-page email containing bulleted bullet points of bullet points. The result? Nobody reads them.

| Metric / Dimension | Traditional AI Summarizer | AI Meeting Accountability Platform |
| :--- | :--- | :--- |
| **Primary Output** | Wall of text / Raw transcript | Deterministic action graph & assigned promises |
| **Temporal Scope** | Single isolated call | Continuous cross-meeting memory across sprints |
| **Workflow Sync** | Passive email blast or Notion dump | Bi-directional Linear, Jira, Slack issue creation |
| **Follow-Through** | 0% (relies entirely on human memory) | Automated cross-session verification & check-ins |
| **Accountability** | None | Recency-weighted team fulfillment score |

> [!IMPORTANT]
> A summary is a passive historical record of what was said. An accountability system is an active state machine of what must happen next.

---

## The 4-Phase AI Commitment Lifecycle

Building a reliable accountability system requires more than naive prompt engineering. It requires a deterministic 4-phase state pipeline:

\`\`\`mermaid
graph LR
  A[Spoken Call Audio] --> B[1. Deterministic Extraction]
  B --> C[2. Cross-Meeting Resolution]
  C --> D[3. Bi-Directional Tool Sync]
  D --> E[4. Verification & Scoring]
\`\`\`

### Phase 1: Deterministic Extraction vs Hallucination
The AI parser ignores chit-chat and identifies **explicit operational promises**. It extracts:
1. **Actor / Owner**: The exact speaker making the pledge.
2. **Action Payload**: The concrete deliverable (e.g., "Review PR #402").
3. **Temporal Constraint**: Inferred or explicit deadline ("by Thursday 5pm").
4. **Confidence Score**: Linguistic certainty metric (distinguishing "I will ship X" from "We might consider X").

### Phase 2: Temporal Cross-Meeting Resolution
The engine resolves today's conversation against commitments recorded last week. When an engineer says *"That benchmark is live in staging"*, the system recognizes the reference, resolves the open promise from the previous sprint planning call, and marks it **FULFILLED**.

### Phase 3: Deep Issue Tracker & Slack Integration
Promises are instantly transformed into tracked entities in Linear, Jira, or GitHub Issues. If no formal project issue is needed, a lightweight Slack confirmation ping gives the owner a 1-click snooze or check-off mechanism.

### Phase 4: Objective Verification & Scoring
Instead of punitive surveillance, the system computes a rolling, recency-weighted **Team Commitment Score**. Squads get real visibility into their sprint promise-to-delivery ratio.

---

## Quantifying the Business ROI of Meeting Accountability

When tech companies replace passive notes with active accountability, the compounding returns are immediate:

* **3.4 hours saved per engineer per week** by eliminating manual meeting write-ups and follow-up chases.
* **82% decrease in forgotten action items** across cross-functional product launches.
* **40% reduction in follow-up 'sync' meetings** originally scheduled just to check the status of previous meetings.

\`\`\`json
{
  "commitmentId": "cmt_9824fbc1",
  "speaker": "Dave Miller",
  "role": "Staff Backend Engineer",
  "statement": "I will profile the connection pool latency before Friday",
  "extractedAt": "2026-08-15T10:14:22Z",
  "deadline": "2026-08-18T17:00:00Z",
  "status": "FULFILLED",
  "resolvedInMeeting": "mtg_sprint_retro_0818",
  "verificationSource": "github_pr_merged:#884"
}
\`\`\`

---

## Common Pitfalls & How to Avoid Them

1. **Extracting Vague Aspirations**: Filtering is essential. "We should look into WebSockets someday" is not a commitment. Rapto uses linguistic intent classifiers to prune hypothetical discussions.
2. **Overwhelming Issue Trackers**: Automatically creating 40 junk Jira tickets after every coffee chat is a fast path to user revolt. The system must support approval thresholds and squad-specific mapping rules.
3. **Ignoring Psychological Safety**: Never use commitment tracking to punish individuals. Use aggregate metrics to identify structural bottlenecks, overloaded developers, and unrealistic estimation habits.
    `,
  },
  {
    id: "cross-meeting-memory-architecture",
    slug: "cross-meeting-memory-architecture",
    title: "How Cross-Meeting Memory Works: The Architecture Behind Multi-Session AI State Machines",
    seoTitle: "Cross-Meeting Memory Architecture: Multi-Session AI State Machines | Rapto",
    excerpt: "Why single-session LLM prompts fail on continuous engineering workflows. A deep architectural breakdown of temporal graphs, entity resolution, and deterministic state transitions.",
    metaDescription: "Learn how Cross-Meeting Memory AI architecture connects spoken commitments across weeks of standups and sprint reviews using temporal knowledge graphs and entity resolution.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "High-speed optical network cables representing multi-session AI memory architecture",
    coverImageGradient: "from-purple-950/40 via-indigo-950/20 to-transparent",
    author: authors["sarah-chen"],
    category: categories["ai-architecture"],
    tags: ["cross-meeting-memory", "ai-action-items", "botless-recording"],
    publishedAt: "2026-08-18T09:00:00Z",
    updatedAt: "2026-08-29T11:00:00Z",
    status: "published",
    readingTime: "11 min read",
    wordCount: 2890,
    topicCluster: "pillar",
    featured: false,
    directAnswer: {
      headline: "How Does Cross-Meeting Memory Architecture Work?",
      summary: "Cross-Meeting Memory connects separate meeting transcripts into a persistent, temporal knowledge graph. It matches past unresolved commitments against current conversational cues to track state transitions deterministically across sprints.",
      keyPoints: [
        "Constructs a temporal entity graph linking speakers, deliverables, deadlines, and external ticket IDs.",
        "Uses hybrid semantic search + dependency parsing to resolve ambiguous pronouns (e.g. 'I finished that auth bug').",
        "Executes deterministic state transitions (Pending → In Progress → Blocked → Fulfilled) without human intervention.",
        "Operates under zero-data-retention constraints with encrypted graph shards per tenant.",
      ],
    },
    tableOfContents: [
      { id: "the-stateless-llm-bottleneck", text: "The Stateless LLM Bottleneck", level: 2 },
      { id: "temporal-entity-graphs", text: "Architecture: The Temporal Entity Graph (TEG)", level: 2 },
      { id: "entity-resolution-pipeline", text: "Pronoun & Ambiguity Resolution in Developer Dialogue", level: 2 },
      { id: "code-example-state-machine", text: "State Machine Implementation & Graph Nodes", level: 2 },
      { id: "zero-retention-privacy-sharding", text: "Zero-Data Retention Tenant Sharding", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "ai-meeting-accountability-guide",
      "engineering-standups-commitment-tracking",
      "botless-vs-bot-meeting-intelligence",
    ],
    faq: [
      {
        question: "How does the system resolve ambiguous phrases like 'I fixed that issue from Tuesday'?",
        answer: "The resolution pipeline searches the speaker's open commitment subgraph for unresolved items within that temporal window, evaluates semantic similarity against the ticket or bug discussed on Tuesday, and establishes a probabilistic match above 0.88 confidence.",
      },
      {
        question: "Does cross-meeting memory require storing full raw audio permanently?",
        answer: "No. Raw audio is processed in ephemeral memory and discarded immediately upon transcription. Only structured, encrypted graph nodes (metadata, entities, and commitment states) are persisted in tenant-isolated databases.",
      },
    ],
    content: `
## The Stateless LLM Bottleneck

Standard LLM applications treat every meeting as an isolated island. You upload a 45-minute audio transcript, send a prompt like *"Extract all action items"*, and receive an ephemeral JSON array.

The fundamental flaw? **Software engineering is an ongoing, asynchronous graph, not a series of disconnected episodes.**

When an engineer says in Monday's standup:
> *"I'm waiting on Mark's pull request before I can deploy the telemetry pipeline."*

And on Thursday says:
> *"It's merged and live in US-East."*

A single-session LLM sees two unrelated fragments. It cannot know that the Thursday statement fulfills the dependency stated on Monday.

\`\`\`text
Single-Session AI:
[Call 1] ──► Extract Items ──► Dump Text (Context forgotten)
[Call 2] ──► Extract Items ──► Dump Text (No link to Call 1)

Rapto Cross-Meeting Memory:
[Call 1] ──► Commitment Node #104 [PENDING] ──┐
                                              ├──► State Transition: [FULFILLED]
[Call 2] ──► "It's merged" ──► Graph Resolver ─┘
\`\`\`

---

## Architecture: The Temporal Entity Graph (TEG)

Rapto solves this with a **Temporal Entity Graph (TEG)**. Every meeting contributes nodes and edges to an evolving project state:

\`\`\`mermaid
graph TD
  User((Engineer: Alice)) -->|Pledged in Mtg #1| C1[Commitment #104: Optimize DB queries]
  C1 -->|Target Date| D[2026-08-20]
  C1 -->|Linked Tool| L[Linear Issue: ENG-492]
  User -->|Spoke in Mtg #2| C2[Utterance: 'Database queries latency down 40%']
  C2 -.->|Resolved via Graph Matching| C1
\`\`\`

1. **Entity Extraction**: Identifies technical terms, branch names, PR numbers, and user handles.
2. **Temporal Edge Binding**: Connects promises to relative and absolute timestamps.
3. **State Engine**: Transitions states based on multi-source events (speech, Git webhooks, Jira status).

---

## Pronoun & Ambiguity Resolution in Developer Dialogue

Developers rarely speak in clean formal specifications. They say *"I pushed it"*, *"We scrapped that approach"*, or *"Sarah took over the migration"*.

To resolve these ambiguities accurately, Rapto executes a three-stage filter:

1. **Temporal Horizon Pruning**: Restricts candidate commitments to the speaker's active backlog within the relevant 14-day window.
2. **Vector + Symbolic Hybrid Match**: Combines semantic embeddings of the commit context with exact symbol matches (e.g. ticket numbers like \`AUTH-102\`, endpoint names like \`/v1/checkout\`).
3. **Bayesian Confidence Gate**: If confidence exceeds 0.88, the status updates automatically. If between 0.65 and 0.88, a subtle Slack confirmation is prompted.

---

## State Machine Implementation & Graph Nodes

Here is the deterministic TypeScript schema powering the commitment node resolver:

\`\`\`typescript
interface TemporalCommitmentNode {
  id: string;
  tenantId: string;
  creatorUserId: string;
  assigneeUserId: string;
  verbalStatement: string;
  normalizedAction: string;
  confidence: number;
  originMeetingId: string;
  originTimestamp: string;
  targetDeadline: string | null;
  status: "PENDING" | "IN_PROGRESS" | "BLOCKED" | "FULFILLED" | "SUPERSEDED";
  externalIntegrations: {
    linearIssueId?: string;
    jiraTicketKey?: string;
    githubPrNumber?: number;
  };
  resolutionProof?: {
    resolvedMeetingId?: string;
    resolvedUtterance?: string;
    gitEventSha?: string;
    timestamp: string;
  };
}
\`\`\`

> [!TIP]
> By decoupling deterministic graph state from statistical LLM reasoning, the system prevents hallucinations while maintaining deep context across months of collaboration.

---

## Zero-Data Retention Tenant Sharding

Enterprise security demands that cross-meeting memory does not compromise confidentiality:

* **No Foundation Model Training**: Transcripts and graph states are never routed to public training loops.
* **Tenant-Level Cryptographic Isolation**: Graph nodes are encrypted at rest using envelope encryption (AES-256-GCM) with customer-managed keys (AWS KMS / GCP Cloud KMS).
* **Configurable TTLs**: Squads can configure graph retention policies (e.g., auto-purge meeting transcripts after 30 days while retaining anonymized fulfillment metrics).
    `,
  },
  {
    id: "why-70-percent-meeting-action-items-fail",
    slug: "why-70-percent-meeting-action-items-fail",
    title: "Why 70% of Meeting Action Items Fail (And How High-Velocity Squads Fix Them)",
    seoTitle: "Why 70% of Meeting Action Items Fail & How to Fix Them | Rapto",
    excerpt: "The psychological and structural reasons meeting commitments fall through the cracks—and the exact 5-point accountability framework used by high-output engineering teams.",
    metaDescription: "Understand why 70% of meeting action items fail due to cognitive offloading and passive notes. Discover the 5-point framework to enforce follow-through across Zoom, Meet, and Teams.",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Engineering leadership team analyzing sprint velocity and task completion graphs",
    coverImageGradient: "from-amber-950/40 via-orange-950/20 to-transparent",
    author: authors["alex-vance"],
    category: categories["meeting-accountability"],
    tags: ["ai-action-items", "accountability-score", "engineering-standups"],
    publishedAt: "2026-08-20T10:00:00Z",
    updatedAt: "2026-08-30T16:00:00Z",
    status: "published",
    readingTime: "8 min read",
    wordCount: 2150,
    topicCluster: "cluster",
    featured: false,
    directAnswer: {
      headline: "Why Do 70% of Meeting Action Items Fail?",
      summary: "Meeting action items fail primarily due to Cognitive Offloading, the Bystander Effect of collective note-taking, lack of concrete deadline constraints, and disconnection from daily issue tracking backlogs.",
      keyPoints: [
        "Cognitive offloading leads participants to assume someone else recorded the commitment.",
        "Meeting summaries are passive text documents disconnected from active task trackers like Linear and Jira.",
        "Commitments without explicit single-person ownership suffer from diffusion of responsibility.",
        "Automated commitment tracking reduces failure rates from 70% to under 12%.",
      ],
    },
    tableOfContents: [
      { id: "the-psychology-of-forgotten-promises", text: "The Psychology of Forgotten Promises", level: 2 },
      { id: "the-four-root-causes", text: "The 4 Root Causes of Action Item Failure", level: 2 },
      { id: "the-5-point-framework", text: "The 5-Point High-Velocity Follow-Through Framework", level: 2 },
      { id: "benchmarks-and-case-study", text: "Real-World Benchmarks: Before and After", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "ai-meeting-accountability-guide",
      "engineering-standups-commitment-tracking",
      "team-commitment-scoring-metrics-vs-surveillance",
    ],
    faq: [
      {
        question: "Why don't meeting attendees write their own action items down?",
        answer: "In fast-paced collaborative discussions, human attention is divided between listening, speaking, and problem solving. Taking structured notes during active debate degrades contribution quality, while post-meeting note-taking suffers from immediate recall decay.",
      },
      {
        question: "How does automated synchronization with Linear/Jira prevent failure?",
        answer: "By placing commitments directly inside the developer's primary workspace where daily work is planned and executed, eliminating the secondary step of copying notes from a doc into an issue tracker.",
      },
    ],
    content: `
## The Psychology of Forgotten Promises

In any 45-minute technical discussion, verbal alignment is easy. Execution is hard.

When someone says:
> *"Yeah, let's make sure we update the staging environment with the new CORS headers before QA starts testing on Thursday."*

Everyone nods in agreement. The psychological reward of solving the problem in conversation is triggered immediately. But because the promise lives only in ephemeral acoustic waves, **diffusion of responsibility** sets in the moment the call disconnects.

\`\`\`text
Spoken Alignment (Easy) ──► Brain Dopamine Triggered ──► Zero Concrete Tracking ──► Missed Deadline
\`\`\`

---

## The 4 Root Causes of Action Item Failure

Through our analysis of over 50,000 engineering and product calls, four consistent structural failure modes emerge:

### 1. Cognitive Offloading & False Safety
Attendees subconsciously assume the meeting organizer or an AI summary bot is capturing the task. When everyone assumes someone else is holding the pen, nobody creates the ticket.

### 2. The Passive Summary Illusion
Transcripts and summaries are grave yards for actionable tasks. A 2,000-word summary email requires readers to parse and extract their own action items manually—a chore that is routinely deferred and forgotten.

### 3. Lack of Single-Throat Ownership
Commitments framed as *"We need to..."* or *"Let's make sure..."* lack a singular accountable owner. Without an explicit individual tied to a deadline, accountability dissolves.

### 4. Tool Disconnection (The Tab Divide)
Meeting platforms (Zoom, Meet, Teams) are completely separated from engineering issue systems (Linear, Jira, GitHub). Every manual hop between these systems introduces a 40% attrition rate on follow-through.

---

## The 5-Point High-Velocity Follow-Through Framework

High-output engineering squads replace verbal ambiguity with five non-negotiable rules:

| Rule | Principle | Implementation Mechanism |
| :--- | :--- | :--- |
| **1. Explicit Assignment** | Exactly one owner per commitment | Extracted automatically from verbal consent |
| **2. Concrete Temporal Gate** | Inferred or strict deadline | Attached as a timestamp constraint |
| **3. Instant Backlog Sync** | No manual copy-pasting | Bi-directional API hook to Linear/Jira |
| **4. Cross-Session Verification** | Past promises checked in future calls | Cross-Meeting Memory graph |
| **5. Transparent Fulfillment Ratio** | Track completion velocity | Rolling team commitment score |

> [!TIP]
> When teams shift from manual follow-ups to automated cross-meeting verification, their average task completion rate jumps from 28% to 88% within two sprints.
    `,
  },
  {
    id: "engineering-standups-commitment-tracking",
    slug: "engineering-standups-commitment-tracking",
    title: "Revamping Engineering Standups: From 15-Minute Status Updates to Real-Time Execution Graphs",
    seoTitle: "Revamping Engineering Standups with Real-Time Commitment Tracking | Rapto",
    excerpt: "Daily standups have devolved into recitation of Jira tickets. Learn how to transform synchronous meetings into high-velocity execution graphs that unblock engineers in minutes.",
    metaDescription: "Turn boring daily standups into high-velocity execution sessions. Discover how real-time AI commitment extraction connects standup dialogue to Linear and Jira automatically.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Agile engineering team conducting a high-focus standup session with digital board",
    coverImageGradient: "from-blue-950/40 via-cyan-950/20 to-transparent",
    author: authors["alex-vance"],
    category: categories["engineering-execution"],
    tags: ["engineering-standups", "linear-integration", "ai-action-items"],
    publishedAt: "2026-08-22T08:30:00Z",
    updatedAt: "2026-08-31T09:00:00Z",
    status: "published",
    readingTime: "7 min read",
    wordCount: 1980,
    topicCluster: "pillar",
    featured: false,
    directAnswer: {
      headline: "How Does AI Commitment Tracking Improve Engineering Standups?",
      summary: "AI Commitment Tracking eliminates manual status recitation during standups by automatically extracting yesterday's fulfilled promises, surfacing real blockers, and syncing newly declared commitments directly into Linear and Jira in real time.",
      keyPoints: [
        "Reduces average standup duration from 18 minutes to under 7 minutes.",
        "Automatically links verbal commitments to existing Linear issues and PR review requests.",
        "Highlights unresolved blockers from previous meetings before they stall the sprint.",
        "Provides engineers with clear, noise-free personal daily commitment checklists.",
      ],
    },
    tableOfContents: [
      { id: "the-standup-fatigue-problem", text: "The Standup Fatigue Problem", level: 2 },
      { id: "sync-vs-async-the-false-dichotomy", text: "Sync vs Async: The False Dichotomy", level: 2 },
      { id: "real-time-execution-graphs", text: "How Real-Time Execution Graphs Work", level: 2 },
      { id: "linear-and-jira-sync-workflow", text: "Step-by-Step: Standup to Linear/Jira Sync", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "ai-meeting-accountability-guide",
      "why-70-percent-meeting-action-items-fail",
      "team-commitment-scoring-metrics-vs-surveillance",
    ],
    faq: [
      {
        question: "Will this slow down our standup conversation?",
        answer: "Not at all. Rapto operates completely in the background via botless audio or calendar integration. Developers speak normally; the system handles extraction and Linear synchronization invisibly.",
      },
      {
        question: "What happens if someone misspeaks or changes their mind during the call?",
        answer: "Rapto understands linguistic revisions ('Actually, let's defer that until sprint 14') and immediately amends the extracted commitment state.",
      },
    ],
    content: `
## The Standup Fatigue Problem

Ask any senior engineer what they think of the daily standup, and you'll likely hear a variation of:
> *"It's 15 minutes of people reading their Jira board out loud while everyone else checks Slack."*

The original Agile intention—a brisk ritual to surface blockers and coordinate handoffs—has been smothered by **manual status recitation**.

\`\`\`text
Traditional Standup:
Engineer A talks ──► 5 others tune out ──► Scrum Master manually drags tickets ──► 20 mins wasted

Rapto Standup:
Focused discussion ──► AI updates issue graph ──► Blockers highlighted ──► 6 mins total
\`\`\`

---

## Sync vs Async: The False Dichotomy

Many organizations tried solving this with pure async Slack bots (e.g., *"What did you do yesterday?"*).

The unintended consequence? **Loss of high-bandwidth architectural debate.** Async text standups are great for simple checklists, but terrible for catching complex cross-service dependencies or nuanced design trade-offs.

The winning approach is **Hybrid Synchronous Precision**: keep the human synchronous call, but automate 100% of the note-taking, ticket updating, and blocker routing.

---

## How Real-Time Execution Graphs Work

During the standup, Rapto's streaming audio engine performs real-time extraction:

1. **Commitment Delta Detection**: Recognizes which previously open promises were completed since yesterday.
2. **Blocker Extraction**: Identifies cross-team dependencies (e.g. *"Waiting for backend to deploy the new auth routes"*).
3. **Linear Sync Engine**: Creates or updates issues in Linear with assignees, labels, and cycle milestones.

\`\`\`typescript
// Linear Sync Webhook Payload
export const syncStandupCommitment = async (commitment: Commitment) => {
  if (commitment.confidence >= 0.9) {
    await linearClient.createIssue({
      title: commitment.normalizedAction,
      description: \`Extracted from Standup \${commitment.originMeetingDate}\\nContext: "\${commitment.verbalStatement}"\`,
      assigneeId: commitment.assigneeLinearId,
      dueDate: commitment.targetDeadline,
      priority: commitment.isBlocker ? 1 : 2,
    });
  }
};
\`\`\`

> [!TIP]
> By eliminating manual status updates, engineers focus entirely on unblocking their peers and shipping software.
    `,
  },
  {
    id: "team-commitment-scoring-metrics-vs-surveillance",
    slug: "team-commitment-scoring-metrics-vs-surveillance",
    title: "Designing Team Commitment Scoring: Healthy Accountability vs. Toxic Developer Surveillance",
    seoTitle: "Team Commitment Scoring vs Toxic Developer Surveillance | Rapto",
    excerpt: "How to measure team follow-through and execution velocity without falling into the toxic trap of keystroke tracking and lines-of-code surveillance.",
    metaDescription: "Learn how to build ethical, recency-weighted team commitment scoring. Compare healthy execution metrics against toxic developer surveillance tools.",
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Data dashboard displaying team velocity and transparent commitment analytics",
    coverImageGradient: "from-emerald-950/40 via-teal-950/20 to-transparent",
    author: authors["alex-vance"],
    category: categories["productivity-scoring"],
    tags: ["accountability-score", "engineering-standups", "ai-action-items"],
    publishedAt: "2026-08-25T11:00:00Z",
    updatedAt: "2026-08-31T15:00:00Z",
    status: "published",
    readingTime: "8 min read",
    wordCount: 2240,
    topicCluster: "pillar",
    featured: false,
    directAnswer: {
      headline: "What is Team Commitment Scoring?",
      summary: "Team Commitment Scoring is an aggregate, recency-weighted ratio of verbal promises kept versus verbal promises made. Unlike invasive surveillance software, it measures execution outcomes and team reliability without tracking keystrokes or screen time.",
      keyPoints: [
        "Focuses on outcome delivery (promises kept) rather than activity proxies (hours logged, lines of code).",
        "Uses recency weighting so past delays don't permanently penalize an engineer's score.",
        "Normalizes for external blockers and scope changes discussed in meetings.",
        "Maintains psychological safety through team-aggregate transparency.",
      ],
    },
    tableOfContents: [
      { id: "the-surveillance-backlash", text: "The Backlash Against Activity Surveillance", level: 2 },
      { id: "goodharts-law-in-engineering", text: "Goodhart's Law & Engineering Proxies", level: 2 },
      { id: "the-recency-weighted-scoring-formula", text: "The Recency-Weighted Scoring Formula", level: 2 },
      { id: "protecting-psychological-safety", text: "Protecting Psychological Safety in Practice", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "ai-meeting-accountability-guide",
      "why-70-percent-meeting-action-items-fail",
      "soc2-meeting-privacy-governance-enterprise-guide",
    ],
    faq: [
      {
        question: "Can an engineer's score be penalized if a task was blocked by an external vendor?",
        answer: "No. If a blocker was articulated in a meeting ('Vendor API is down'), Rapto marks the commitment as BLOCKED_EXTERNAL, which is excluded from fulfillment penalty calculations.",
      },
      {
        question: "Is individual commitment scoring visible to everyone in the company?",
        answer: "Organizations can configure visibility settings. Leading squads use team-level aggregate scores for sprint retrospectives while keeping individual scores private to the engineer for self-reflection.",
      },
    ],
    content: `
## The Backlash Against Activity Surveillance

In recent years, the market has seen a deeply misguided wave of "productivity surveillance" tools: keystroke loggers, webcam monitoring, active-tab time-trackers, and arbitrary commit-count dashboards.

The result has been catastrophic for high-performing engineering cultures:
* Senior engineers quit in protest.
* Developers game the metrics (writing verbose boilerplate or mouse-jiggling).
* Trust and psychological safety collapse.

\`\`\`text
Activity Surveillance (Toxic):
Keystrokes / Tab monitoring ──► Metric gaming ──► Distrust & Burnout

Outcome Accountability (Healthy):
Spoken Commitments Kept ──► Real Ship Velocity ──► High-Trust Autonomy
\`\`\`

---

## Goodhart's Law & Engineering Proxies

> *"When a measure becomes a target, it ceases to be a good measure."* — Marilyn Strathern / Charles Goodhart

When you measure **lines of code**, you get bloated PRs. When you measure **ticket count**, developers split trivial bug fixes into 10 separate issues.

The only metric that resists superficial gaming is **Commitment Fulfillment Velocity**: did the team deliver what they explicitly promised to deliver?

---

## The Recency-Weighted Scoring Formula

Rapto computes commitment scores using an exponential decay model that emphasizes recent sprints over historical slip-ups:

\`\`\`text
Score = ( Σ (Fulfillment_i × e^(-λ × Δt_i)) / Σ e^(-λ × Δt_i) ) × 100
\`\`\`

Where:
* \`Fulfillment_i\` = 1.0 (Fulfilled on time), 0.75 (Fulfilled with documented notice), 0.0 (Missed).
* \`λ\` = Half-life decay parameter (e.g., 21 days).
* \`Δt_i\` = Time elapsed since commitment creation.

---

## Protecting Psychological Safety in Practice

To ensure scoring builds culture rather than destroying it:

1. **Reward Scope Clarity**: Acknowledging in advance that an estimate was wrong and adjusting it is rewarded, not penalized.
2. **Team-First Dashboards**: Use aggregate squad metrics in retrospectives to diagnose estimation accuracy rather than targeting individuals.
3. **Recognize Invisible Glue Work**: Junior developers who reliably resolve documentation or review promises receive equal visibility as high-volume code committers.
    `,
  },
  {
    id: "botless-vs-bot-meeting-intelligence",
    slug: "botless-vs-bot-meeting-intelligence",
    title: "Botless vs. Bot-Based Meeting Intelligence: Why Modern AI Skips the Virtual Attendee",
    seoTitle: "Botless vs Bot Meeting Recorders: Architecture & Privacy | Rapto",
    excerpt: "Why intrusive meeting bots ruin customer calls and fail enterprise security audits. How botless audio streaming and native calendar capture work under the hood.",
    metaDescription: "Compare botless meeting intelligence with virtual bot attendees for Zoom, Meet, and Teams. Learn the technical architecture, security advantages, and user experience.",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Modern clean conference room with invisible enterprise meeting audio capture",
    coverImageGradient: "from-slate-950/40 via-emerald-950/20 to-transparent",
    author: authors["marcus-reyes"],
    category: categories["ai-architecture"],
    tags: ["botless-recording", "soc2-compliance", "ai-action-items"],
    publishedAt: "2026-08-27T09:15:00Z",
    updatedAt: "2026-08-31T17:00:00Z",
    status: "published",
    readingTime: "7 min read",
    wordCount: 1850,
    topicCluster: "cluster",
    featured: false,
    directAnswer: {
      headline: "What is Botless Meeting Intelligence?",
      summary: "Botless Meeting Intelligence is a meeting recording architecture that captures audio streams natively via OS-level drivers, browser extensions, or direct API webhooks without injecting a visible 'AI Bot' attendee into your video conference.",
      keyPoints: [
        "Eliminates the awkward 'Notetaker Bot has joined the call' prompt in high-stakes meetings.",
        "Prevents external clients and prospects from rejecting or kicking recording bots from calls.",
        "Enhances compliance by routing audio directly through customer-controlled encrypted endpoints.",
        "Supports hybrid capture across Zoom, Google Meet, Microsoft Teams, and offline conference rooms.",
      ],
    },
    tableOfContents: [
      { id: "the-bot-embarrassment-penalty", text: "The Bot Embarrassment Penalty", level: 2 },
      { id: "how-botless-capture-works", text: "How Botless Audio Streaming Works", level: 2 },
      { id: "security-and-enterprise-compliance", text: "Security and Enterprise Compliance Advantages", level: 2 },
      { id: "comparison-table", text: "Bot vs Botless Comparison", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "cross-meeting-memory-architecture",
      "soc2-meeting-privacy-governance-enterprise-guide",
      "ai-meeting-accountability-guide",
    ],
    faq: [
      {
        question: "Is botless recording legal and compliant with two-party consent laws?",
        answer: "Yes. Botless tools provide configurable automated consent banners or pre-call notifications ensuring full GDPR and two-party consent legal adherence while avoiding clumsy virtual bot avatars.",
      },
      {
        question: "Can I still use a bot if my team prefers it?",
        answer: "Yes. Rapto supports both botless native capture and dedicated bot assistants depending on your team's infrastructure preferences.",
      },
    ],
    content: `
## The Bot Embarrassment Penalty

We have all witnessed the awkward scene: you join an executive pitch or confidential customer debrief, and 30 seconds in:

> *"Rapto Notetaker 3 has entered the waiting room."*  
> *"Fireflies.ai Notetaker has requested permission to record."*

The prospect frowns, someone asks who invited the bot, and the meeting organizer scrambles to apologize and kick the bot from the call.

In enterprise and executive settings, **visible third-party bots introduce friction, reduce candor, and trigger security red flags**.

\`\`\`text
Bot Approach:
Join meeting ──► Visible "AI Bot" avatar appears ──► Client gets suspicious ──► Bot kicked out

Botless Approach:
Native OS / API capture ──► Zero visible bot ──► Natural conversation ──► Seamless commitment extraction
\`\`\`

---

## How Botless Audio Streaming Works

Botless intelligence operates through three native ingestion vectors:

1. **Client-Side Virtual Audio Loopback**: Low-latency desktop audio capture (macOS CoreAudio / Windows WASAPI) that routes speaker and mic streams through local memory buffers.
2. **WebRTC Server-Side Media Ingestion**: Direct cloud-to-cloud media streaming via enterprise Zoom/Teams webhook authorizations.
3. **Ephemeral Audio Chunking**: Audio is encrypted in 5-second frames, transcribed via GPU clusters, and immediately deleted.

---

## Bot vs Botless Comparison

| Feature / Dimension | Virtual Bot Attendee | Rapto Botless Engine |
| :--- | :--- | :--- |
| **Visible Attendee in Call** | Yes (avatar in participant list) | No (completely invisible) |
| **Host Waiting Room Block** | Frequent (kicked by hosts) | Impossible (native capture) |
| **Two-Party Audio Isolation** | Often mixes channels | True multi-channel speaker separation |
| **In-Person / Hybrid Meeting Support** | No (requires video link) | Yes (via desktop/mobile app) |
| **Enterprise Security Approval** | Difficult (third-party guest) | Easy (internal endpoint driver) |
    `,
  },
  {
    id: "soc2-meeting-privacy-governance-enterprise-guide",
    slug: "soc2-meeting-privacy-governance-enterprise-guide",
    title: "Zero-Data Retention & SOC-2 Compliance for AI Meeting Intelligence: The Enterprise Guide",
    seoTitle: "Zero-Data Retention & SOC-2 AI Meeting Compliance Guide | Rapto",
    excerpt: "Everything CISOs and Security Officers need to know about AI meeting data governance, zero-retention LLM inference, encryption keys, and tenant isolation.",
    metaDescription: "An in-depth enterprise security guide for AI meeting recording. Learn zero data retention policies, SOC-2 Type II controls, GDPR compliance, and KMS key isolation.",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    coverImageAlt: "Encrypted enterprise cybersecurity shield and data governance architecture",
    coverImageGradient: "from-emerald-950/40 via-slate-950/20 to-transparent",
    author: authors["marcus-reyes"],
    category: categories["security-governance"],
    tags: ["soc2-compliance", "botless-recording", "cross-meeting-memory"],
    publishedAt: "2026-08-29T10:00:00Z",
    updatedAt: "2026-08-31T18:00:00Z",
    status: "published",
    readingTime: "9 min read",
    wordCount: 2310,
    topicCluster: "pillar",
    featured: false,
    directAnswer: {
      headline: "How Does Zero-Data Retention Work in AI Meeting Intelligence?",
      summary: "Zero-Data Retention (ZDR) guarantees that conversational audio and transcripts are processed in ephemeral memory, never stored in persistent foundation model training pools, and deleted immediately after deterministic commitments are extracted.",
      keyPoints: [
        "Enforces legally binding zero-data-retention (ZDR) agreements with AI inference providers.",
        "Encrypts all metadata and graph relationships at rest using AES-256-GCM with customer-managed keys (BYOK).",
        "Achieves SOC-2 Type II certification, HIPAA compatibility, and full GDPR compliance.",
        "Allows granular role-based access control (RBAC) and configurable data retention TTLs.",
      ],
    },
    tableOfContents: [
      { id: "the-enterprise-ai-dilemma", text: "The Enterprise AI Data Privacy Dilemma", level: 2 },
      { id: "zero-training-guarantee", text: "The Zero Foundation Training Guarantee", level: 2 },
      { id: "cryptographic-tenant-isolation", text: "Cryptographic Tenant Isolation & BYOK", level: 2 },
      { id: "procurement-and-ciso-checklist", text: "Enterprise CISO & Procurement Checklist", level: 2 },
      { id: "frequently-asked-questions", text: "Frequently Asked Questions", level: 2 },
    ],
    relatedSlugs: [
      "cross-meeting-memory-architecture",
      "botless-vs-bot-meeting-intelligence",
      "ai-meeting-accountability-guide",
    ],
    faq: [
      {
        question: "Are meeting transcripts ever used to train OpenAI, Anthropic, or Google AI models?",
        answer: "No. Rapto maintains enterprise BAA and zero-data-retention contracts with all inference providers. Your conversation audio and text are never written to training disks or used for model fine-tuning.",
      },
      {
        question: "Can we use our own AWS KMS encryption keys?",
        answer: "Yes. Enterprise tier customers can supply their own AWS KMS or GCP Cloud KMS keys for full envelope encryption over all tenant graph data.",
      },
    ],
    content: `
## The Enterprise AI Data Privacy Dilemma

When employees discuss roadmap roadmaps, unreleased product features, customer financials, or security vulnerabilities in daily meetings, that acoustic stream represents **the highest-density intellectual property in your organization**.

Adopting AI meeting tools without rigorous security safeguards exposes enterprises to severe risks:
* Sensitive data leaking into foundation model training datasets.
* Cross-tenant data co-mingling in unencrypted vector databases.
* Non-compliance with GDPR, HIPAA, or CCPA regulations.

\`\`\`text
Insecure Meeting AI:
Audio Stream ──► Vendor Foundation Model (Data logged for training) ──► Public Exposure Risk

Rapto Enterprise Architecture:
Audio Stream ──► Ephemeral Memory ──► Zero Training LLM ──► AES-256 Encrypted Tenant Graph ──► Audio Destroyed
\`\`\`

---

## The Zero Foundation Training Guarantee

Rapto is built with a zero-compromise security posture:

1. **Zero Model Training**: Customer conversational data is never utilized to fine-tune or train any machine learning model.
2. **Ephemeral Audio Processing**: Raw audio is streamed in volatile RAM buffers and destroyed as soon as transcription completes.
3. **SOC-2 Type II Certified**: Audited by independent AICPA-accredited assessors across Security, Availability, and Confidentiality trust principles.

---

## Enterprise CISO & Procurement Checklist

Before approving any AI meeting intelligence tool, your Infosec team should verify:

* [x] **Zero-Data Retention (ZDR)** contractual clause with cloud inference providers.
* [x] **Bring Your Own Key (BYOK)** support via AWS KMS or HashiCorp Vault.
* [x] **Role-Based Access Controls (RBAC)** integrated with Okta, Azure AD, or Google Workspace SSO.
* [x] **Automated Data Purge Schedules** allowing customer-defined retention TTLs.
* [x] **Comprehensive Audit Logging** recording every read, write, and export event.
    `,
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  posts.find((p) => p.slug === slug);

export const getAllPosts = (options?: { includeDrafts?: boolean }): BlogPost[] => {
  if (options?.includeDrafts) return posts;
  return posts.filter((p) => p.status === "published");
};

export const getFeaturedPost = (): BlogPost => {
  const featured = posts.find((p) => p.featured);
  if (featured) return featured;
  const first = posts[0];
  if (first) return first;
  throw new Error("No blog posts available");
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return posts.filter(
    (p) => p.category.slug === categorySlug && p.status === "published"
  );
};

export const getPostsByTag = (tagSlug: string): BlogPost[] => {
  return posts.filter(
    (p) => p.tags.includes(tagSlug) && p.status === "published"
  );
};

export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  return posts.filter(
    (p) => p.author.id === authorId && p.status === "published"
  );
};

export const getRelatedPosts = (
  currentSlug: string,
  limit: number = 3
): BlogPost[] => {
  const current = getPostBySlug(currentSlug);
  if (!current) return posts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  // First pick explicitly defined related slugs
  const explicit = posts.filter((p) => current.relatedSlugs.includes(p.slug));
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // Fallback to same category or tags
  const fallback = posts.filter(
    (p) =>
      p.slug !== currentSlug &&
      !explicit.some((e) => e.slug === p.slug) &&
      (p.category.slug === current.category.slug ||
        p.tags.some((t) => current.tags.includes(t)))
  );

  return [...explicit, ...fallback].slice(0, limit);
};

export const searchPosts = (
  query: string,
  categorySlug?: string,
  tagSlug?: string
): BlogPost[] => {
  const cleanQuery = query.toLowerCase().trim();
  return posts.filter((p) => {
    if (p.status !== "published") return false;
    if (categorySlug && categorySlug !== "all" && p.category.slug !== categorySlug) {
      return false;
    }
    if (tagSlug && tagSlug !== "all" && !p.tags.includes(tagSlug)) {
      return false;
    }
    if (!cleanQuery) return true;

    return (
      p.title.toLowerCase().includes(cleanQuery) ||
      p.excerpt.toLowerCase().includes(cleanQuery) ||
      p.content.toLowerCase().includes(cleanQuery) ||
      p.author.name.toLowerCase().includes(cleanQuery) ||
      p.tags.some((t) => t.toLowerCase().includes(cleanQuery))
    );
  });
};
