"use client";

import * as React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  Position,
  Handle,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Layers,
  Server,
  Database,
  Cpu,
  Workflow,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Boxes,
  Zap,
} from "lucide-react";

// Custom Node Component for high-craft dark-mode architecture styling
export function ServiceCardNode({
  data,
}: {
  data: {
    title: string;
    subtitle?: string;
    badge?: string;
    icon?: string;
    variant?: "primary" | "secondary" | "accent" | "storage" | "external";
    handles?: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
  };
}) {
  const variantStyles = {
    primary: "border-[var(--color-brand-500)]/60 bg-[#0c1a14] text-white shadow-tier-2",
    secondary: "border-white/20 bg-[#111618] text-white/90 shadow-tier-1",
    accent: "border-[var(--color-ember-500)]/60 bg-[#1c130d] text-white shadow-tier-2",
    storage: "border-blue-500/50 bg-[#0d1527] text-white shadow-tier-2",
    external: "border-purple-500/50 bg-[#170e24] text-white shadow-tier-1",
  };

  const badgeColors = {
    primary: "bg-[var(--color-brand-500)]/20 text-[var(--color-brand-300)] border-[var(--color-brand-500)]/40",
    secondary: "bg-white/10 text-white/70 border-white/20",
    accent: "bg-[var(--color-ember-500)]/20 text-[var(--color-ember-400)] border-[var(--color-ember-500)]/40",
    storage: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    external: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  };

  const currentVariant = data.variant || "secondary";

  return (
    <div
      className={`relative px-4 py-3.5 rounded-[var(--radius-lg)] border-2 min-w-[200px] max-w-[280px] font-sans transition-all duration-200 hover:scale-[1.02] ${variantStyles[currentVariant]}`}
    >
      {/* Target & Source Handles */}
      {data.handles?.top !== false && (
        <Handle type="target" position={Position.Top} className="!bg-[var(--color-brand-400)] !w-2.5 !h-2.5" />
      )}
      {data.handles?.bottom !== false && (
        <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-brand-400)] !w-2.5 !h-2.5" />
      )}
      {data.handles?.left && (
        <Handle type="target" position={Position.Left} id="left" className="!bg-[var(--color-brand-400)] !w-2.5 !h-2.5" />
      )}
      {data.handles?.right && (
        <Handle type="source" position={Position.Right} id="right" className="!bg-[var(--color-brand-400)] !w-2.5 !h-2.5" />
      )}

      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="font-display font-bold text-sm tracking-tight text-white line-clamp-1">
          {data.title}
        </span>
        {data.badge && (
          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border font-semibold ${badgeColors[currentVariant]}`}
          >
            {data.badge}
          </span>
        )}
      </div>

      {data.subtitle && (
        <p className="text-xs text-white/70 leading-relaxed font-sans">
          {data.subtitle}
        </p>
      )}
    </div>
  );
}

const nodeTypes = {
  serviceNode: ServiceCardNode,
};

export interface ArchitectureDiagramProps {
  type: "high-level" | "data-flow" | "polyglot" | "queues" | "e2e";
  caption?: string;
  className?: string;
}

export function ArchitectureFlowDiagram({
  type,
  caption,
  className = "",
}: ArchitectureDiagramProps) {
  // Define nodes and edges based on diagram type
  const { nodes, edges } = React.useMemo(() => {
    if (type === "high-level") {
      const initialNodes: Node[] = [
        // Clients
        {
          id: "client-web",
          type: "serviceNode",
          position: { x: 50, y: 30 },
          data: {
            title: "Next.js 14 Web App",
            subtitle: "React 19 · App Router · PWA",
            badge: "Client",
            variant: "secondary",
            handles: { top: false, bottom: true },
          },
        },
        {
          id: "client-mobile",
          type: "serviceNode",
          position: { x: 320, y: 30 },
          data: {
            title: "Mobile App & PWA",
            subtitle: "Push Alerts · Standup Voice",
            badge: "Client",
            variant: "secondary",
            handles: { top: false, bottom: true },
          },
        },
        // Edge Ingress
        {
          id: "edge-nginx",
          type: "serviceNode",
          position: { x: 180, y: 150 },
          data: {
            title: "NGINX 1.25 Edge Proxy",
            subtitle: "SSL Termination · Rate Limit · WSS",
            badge: "Ingress",
            variant: "primary",
          },
        },
        // Compute Services
        {
          id: "api-node",
          type: "serviceNode",
          position: { x: 30, y: 280 },
          data: {
            title: "Node.js Core API",
            subtitle: "Express · TS · Auth · Integrations",
            badge: ":5000",
            variant: "primary",
            handles: { top: true, bottom: true, right: true },
          },
        },
        {
          id: "ai-pipeline",
          type: "serviceNode",
          position: { x: 330, y: 280 },
          data: {
            title: "Python AI Pipeline",
            subtitle: "FastAPI · Chunker · Resolver",
            badge: ":8001",
            variant: "accent",
            handles: { top: true, bottom: true, left: true },
          },
        },
        {
          id: "worker-bullmq",
          type: "serviceNode",
          position: { x: 180, y: 410 },
          data: {
            title: "BullMQ Worker Cluster",
            subtitle: "9 Queues · Linear/Jira Sync",
            badge: "Worker",
            variant: "primary",
          },
        },
        // Storage Tier
        {
          id: "db-postgres",
          type: "serviceNode",
          position: { x: 20, y: 550 },
          data: {
            title: "PostgreSQL 16 (ACID)",
            subtitle: "Prisma ORM · RLS · Billing",
            badge: "Primary DB",
            variant: "storage",
            handles: { top: true, bottom: false },
          },
        },
        {
          id: "db-mongo",
          type: "serviceNode",
          position: { x: 240, y: 550 },
          data: {
            title: "MongoDB 7 (Transcripts)",
            subtitle: "Diarized Speech · Prompt Traces",
            badge: "Doc Store",
            variant: "storage",
            handles: { top: true, bottom: false },
          },
        },
        {
          id: "db-redis",
          type: "serviceNode",
          position: { x: 460, y: 550 },
          data: {
            title: "Redis 7 (In-Memory)",
            subtitle: "BullMQ Queues · Caching · Locks",
            badge: "Queue/Cache",
            variant: "storage",
            handles: { top: true, bottom: false },
          },
        },
      ];

      const initialEdges: Edge[] = [
        { id: "e1-1", source: "client-web", target: "edge-nginx", animated: true, style: { stroke: "#10b981" } },
        { id: "e1-2", source: "client-mobile", target: "edge-nginx", animated: true, style: { stroke: "#10b981" } },
        { id: "e2-1", source: "edge-nginx", target: "api-node", animated: true, style: { stroke: "#10b981" } },
        { id: "e2-2", source: "api-node", target: "ai-pipeline", animated: true, label: "HMAC /extract", style: { stroke: "#f97316" } },
        { id: "e3-1", source: "api-node", target: "worker-bullmq", style: { stroke: "#10b981" } },
        { id: "e3-2", source: "worker-bullmq", target: "ai-pipeline", style: { stroke: "#f97316" } },
        { id: "e4-1", source: "api-node", target: "db-postgres", style: { stroke: "#3b82f6" } },
        { id: "e4-2", source: "worker-bullmq", target: "db-mongo", style: { stroke: "#3b82f6" } },
        { id: "e4-3", source: "worker-bullmq", target: "db-redis", style: { stroke: "#3b82f6" } },
      ];

      return { nodes: initialNodes, edges: initialEdges };
    }

    if (type === "queues") {
      const initialNodes: Node[] = [
        {
          id: "q-ingress",
          type: "serviceNode",
          position: { x: 200, y: 20 },
          data: {
            title: "Recall.ai / Calendar Sync",
            subtitle: "Webhooks & Meeting Audio Streams",
            badge: "Trigger",
            variant: "secondary",
          },
        },
        {
          id: "q-transcribe",
          type: "serviceNode",
          position: { x: 50, y: 150 },
          data: {
            title: "transcribe.queue",
            subtitle: "Concurrency: 5 · Stores raw audio in Mongo",
            badge: "Queue 1",
            variant: "primary",
          },
        },
        {
          id: "q-extract",
          type: "serviceNode",
          position: { x: 350, y: 150 },
          data: {
            title: "extract.queue",
            subtitle: "Concurrency: 10 · Calls FastAPI extractor",
            badge: "Queue 2",
            variant: "accent",
          },
        },
        {
          id: "q-resolve",
          type: "serviceNode",
          position: { x: 50, y: 290 },
          data: {
            title: "resolve.queue",
            subtitle: "Concurrency: 5 · Cross-meeting resolution",
            badge: "Queue 3",
            variant: "primary",
          },
        },
        {
          id: "q-integrate",
          type: "serviceNode",
          position: { x: 350, y: 290 },
          data: {
            title: "integrate.queue",
            subtitle: "Concurrency: 15 · Linear/Jira/Notion sync",
            badge: "Queue 4",
            variant: "external",
          },
        },
        {
          id: "q-notify",
          type: "serviceNode",
          position: { x: 200, y: 430 },
          data: {
            title: "notify.queue",
            subtitle: "Concurrency: 20 · Slack cards & Brevo email",
            badge: "Queue 5",
            variant: "primary",
          },
        },
      ];

      const initialEdges: Edge[] = [
        { id: "eq-1", source: "q-ingress", target: "q-transcribe", animated: true, style: { stroke: "#10b981" } },
        { id: "eq-2", source: "q-transcribe", target: "q-extract", animated: true, style: { stroke: "#f97316" } },
        { id: "eq-3", source: "q-extract", target: "q-resolve", animated: true, style: { stroke: "#10b981" } },
        { id: "eq-4", source: "q-extract", target: "q-integrate", animated: true, style: { stroke: "#a855f7" } },
        { id: "eq-5", source: "q-resolve", target: "q-notify", animated: true, style: { stroke: "#10b981" } },
        { id: "eq-6", source: "q-integrate", target: "q-notify", animated: true, style: { stroke: "#10b981" } },
      ];

      return { nodes: initialNodes, edges: initialEdges };
    }

    if (type === "polyglot") {
      const initialNodes: Node[] = [
        {
          id: "poly-app",
          type: "serviceNode",
          position: { x: 220, y: 20 },
          data: {
            title: "Rapto Application Layer",
            subtitle: "Node.js API & Python FastAPI Worker",
            badge: "Unified Compute",
            variant: "primary",
          },
        },
        {
          id: "poly-pg",
          type: "serviceNode",
          position: { x: 30, y: 170 },
          data: {
            title: "PostgreSQL 16 (Relational)",
            subtitle: "Users · Teams · Commitments · Billing",
            badge: "ACID Source",
            variant: "storage",
          },
        },
        {
          id: "poly-mongo",
          type: "serviceNode",
          position: { x: 240, y: 170 },
          data: {
            title: "MongoDB 7 (Document Store)",
            subtitle: "Diarized Turns · Transcripts · Prompt Logs",
            badge: "Document Store",
            variant: "storage",
          },
        },
        {
          id: "poly-redis",
          type: "serviceNode",
          position: { x: 450, y: 170 },
          data: {
            title: "Redis 7 (In-Memory)",
            subtitle: "BullMQ Queues · Rate Limits · Redlock",
            badge: "Queue/Cache",
            variant: "storage",
          },
        },
      ];

      const initialEdges: Edge[] = [
        { id: "ep-1", source: "poly-app", target: "poly-pg", label: "Prisma ORM", animated: true, style: { stroke: "#3b82f6" } },
        { id: "ep-2", source: "poly-app", target: "poly-mongo", label: "Motor / Mongoose", animated: true, style: { stroke: "#3b82f6" } },
        { id: "ep-3", source: "poly-app", target: "poly-redis", label: "ioredis / BullMQ", animated: true, style: { stroke: "#3b82f6" } },
      ];

      return { nodes: initialNodes, edges: initialEdges };
    }

    // Default e2e workflow
    const initialNodes: Node[] = [
      {
        id: "e2e-1",
        type: "serviceNode",
        position: { x: 20, y: 30 },
        data: {
          title: "1. Spoken Meeting Call",
          subtitle: "Google Meet / Zoom audio stream",
          badge: "Acoustic Input",
          variant: "secondary",
        },
      },
      {
        id: "e2e-2",
        type: "serviceNode",
        position: { x: 240, y: 30 },
        data: {
          title: "2. Recall.ai Webhook",
          subtitle: "Diarized raw audio turn capture",
          badge: "Ingestion",
          variant: "primary",
        },
      },
      {
        id: "e2e-3",
        type: "serviceNode",
        position: { x: 460, y: 30 },
        data: {
          title: "3. FastAPI AI Chunking",
          subtitle: "GPT-4o commitment extraction",
          badge: "NLP Reasoning",
          variant: "accent",
        },
      },
      {
        id: "e2e-4",
        type: "serviceNode",
        position: { x: 20, y: 200 },
        data: {
          title: "4. Linear / Jira Sync",
          subtitle: "Bi-directional issue creation",
          badge: "Issue Tracker",
          variant: "external",
        },
      },
      {
        id: "e2e-5",
        type: "serviceNode",
        position: { x: 240, y: 200 },
        data: {
          title: "5. Cross-Meeting Memory",
          subtitle: "Resolves past open promises",
          badge: "State Machine",
          variant: "primary",
        },
      },
      {
        id: "e2e-6",
        type: "serviceNode",
        position: { x: 460, y: 200 },
        data: {
          title: "6. Team Score Velocity",
          subtitle: "Recency-weighted fulfillment update",
          badge: "Accountability",
          variant: "primary",
        },
      },
    ];

    const initialEdges: Edge[] = [
      { id: "ee-1", source: "e2e-1", target: "e2e-2", animated: true, style: { stroke: "#10b981" } },
      { id: "ee-2", source: "e2e-2", target: "e2e-3", animated: true, style: { stroke: "#f97316" } },
      { id: "ee-3", source: "e2e-3", target: "e2e-4", animated: true, style: { stroke: "#a855f7" } },
      { id: "ee-4", source: "e2e-3", target: "e2e-5", animated: true, style: { stroke: "#10b981" } },
      { id: "ee-5", source: "e2e-5", target: "e2e-6", animated: true, style: { stroke: "#10b981" } },
    ];

    return { nodes: initialNodes, edges: initialEdges };
  }, [type]);

  return (
    <figure className={`my-8 rounded-[var(--radius-xl)] bg-[var(--color-canvas-dark)] border border-white/10 shadow-tier-3 overflow-hidden ${className}`}>
      {/* Header bar with controls info */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 text-xs font-mono text-white/70">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-[var(--color-brand-400)]" />
          <span className="font-semibold text-white">
            Interactive Architecture Diagram (React Flow)
          </span>
        </div>
        <span className="text-[11px] text-white/50 hidden sm:inline">
          Pan · Zoom · Drag nodes to explore
        </span>
      </div>

      {/* React Flow Viewport Container */}
      <div className="w-full h-[460px] sm:h-[520px] bg-[#070c0a] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.5}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(255, 255, 255, 0.1)" />
          <Controls className="!bg-[#111618] !border-white/15 !rounded-lg" />
          <MiniMap
            nodeColor={(n) => {
              if (n.data?.variant === "primary") return "#10b981";
              if (n.data?.variant === "accent") return "#f97316";
              if (n.data?.variant === "storage") return "#3b82f6";
              if (n.data?.variant === "external") return "#a855f7";
              return "#4b5563";
            }}
            className="!bg-[#0c1214] !border-white/15 !rounded-lg hidden md:block"
          />
        </ReactFlow>
      </div>

      {caption && (
        <figcaption className="px-5 py-3 text-xs font-sans text-white/60 bg-white/5 border-t border-white/10 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
