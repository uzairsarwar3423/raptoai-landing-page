"use client";

import Link from "next/link";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="font-display text-2xl font-bold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm text-white flex items-center"
      aria-label="Rapto Home"
    >
      Rapt<span className="relative inline-block">
        o
        <span className="absolute top-[5px] -right-[5px] w-[6px] h-[6px] rounded-full bg-[var(--color-brand-300)] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
      </span>
    </Link>
  );
}
