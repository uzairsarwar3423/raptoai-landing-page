import { tokens } from "@/lib/tokens";

export default function TokenTestPage() {
  const swatches = Object.entries(tokens.color);
  return (
    <div className="p-10 bg-[var(--color-paper)] min-h-screen">
      <h1 className="font-display text-[var(--text-display-l)] text-[var(--color-ink-900)] mb-8">Token Verification</h1>
      <div className="grid grid-cols-4 gap-4 mb-12">
        {swatches.map(([name, value]) => (
          <div key={name} className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-ink-900)]/10">
            <div className="h-20" style={{ background: value }} />
            <p className="font-mono text-[var(--text-mono-s)] p-2 text-[var(--color-ink-700)]">{name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mb-12">
        <div className="shadow-tier-1 p-6 bg-[var(--color-paper-raised)] rounded-[var(--radius-lg)]">Tier 1</div>
        <div className="shadow-tier-2 p-6 bg-[var(--color-paper-raised)] rounded-[var(--radius-lg)]">Tier 2</div>
        <div className="shadow-tier-3 p-6 bg-[var(--color-paper-raised)] rounded-[var(--radius-lg)]">Tier 3</div>
      </div>
      <p className="font-display text-[var(--text-display-xl)] text-[var(--color-ink-900)]">Display XL / Display Font (Placeholder for General Sans)</p>
      <p className="font-body text-[var(--text-body-l)] text-[var(--color-ink-700)]">Body L / Inter Variable</p>
      <p className="font-mono text-[var(--text-mono-s)] text-[var(--color-ink-500)]">Mono S / JetBrains Mono — commitment_id_4f21a</p>
    </div>
  );
}
