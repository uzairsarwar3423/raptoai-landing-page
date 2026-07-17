import Link from "next/link";
import { StatusIndicator } from "./StatusIndicator";

export function FooterBottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative flex flex-col items-center justify-between gap-6 pt-8 md:flex-row md:gap-0">
      
      {/* 10/10 Detail: Premium gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0" />

      <div className="flex items-center gap-2 text-sm text-[var(--color-ink-on-dark-muted)] order-3 md:order-1 font-mono">
        <span>© {currentYear} Rapto Inc.</span>
        <span className="text-white/20 px-2">•</span>
        <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
        <span className="text-white/20 px-2">•</span>
        <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
      </div>
      
      <div className="order-2 md:order-2">
        <StatusIndicator />
      </div>

      <div className="flex items-center gap-4 order-1 md:order-3">
        <SocialLink href="https://twitter.com/rapto_ai" ariaLabel="Rapto on X">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        </SocialLink>
        <SocialLink href="https://linkedin.com/company/rapto" ariaLabel="Rapto on LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </SocialLink>
        <SocialLink href="https://github.com/rapto-ai" ariaLabel="Rapto on GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.022c3.182-.352 6.53-1.54 6.53-7.066a5.2 5.2 0 0 0-1.53-3.666 4.8 4.8 0 0 0-.15-3.618s-1.25-.4-4.1 1.54A13.3 13.3 0 0 0 12 2a13.3 13.3 0 0 0-3.32 1.54C5.8 1.6 4.55 2 4.55 2a4.8 4.8 0 0 0-.15 3.618 5.2 5.2 0 0 0-1.53 3.666c0 5.514 3.33 6.702 6.5 7.054a4.8 4.8 0 0 0-1.02 3.018V22" />
          </svg>
        </SocialLink>
      </div>
    </div>
  );
}

function SocialLink({ href, ariaLabel, children }: { href: string; ariaLabel: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[var(--color-ink-on-dark-muted)] transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(34,197,94,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)]"
      aria-label={ariaLabel}
    >
      {/* 10/10 Detail: Subtly glowing backdrop inside the button on hover */}
      <span className="absolute inset-0 rounded-full bg-[var(--color-brand-500)]/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
