import Link from "next/link";
import { statusPageUrl } from "./footer.content";

export function StatusIndicator() {
  const isOperational = true;

  return (
    <Link 
      href={statusPageUrl}
      className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/5 py-2 pl-3 pr-4 font-mono text-xs text-[var(--color-ink-on-dark-muted)] transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative flex h-2 w-2 items-center justify-center">
        {/* Glow */}
        <div className={`absolute h-full w-full rounded-full ${isOperational ? 'bg-[var(--color-brand-500)] animate-status-pulse' : 'bg-[var(--color-ember-500)]'}`} />
        {/* Solid center */}
        <div className={`absolute h-1.5 w-1.5 rounded-full ${isOperational ? 'bg-[#4ade80]' : 'bg-[#fb923c]'}`} />
      </div>
      <span className="tracking-wide">{isOperational ? "All systems operational" : "Some systems degraded"}</span>
    </Link>
  );
}
