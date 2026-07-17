"use client";

import Link from "next/link";
import { navCTA } from "./nav.content";

export function NavCTAGroup() {
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Link 
        href={navCTA.secondary.href}
        className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/5"
      >
        {navCTA.secondary.label}
      </Link>
      <Link 
        href={navCTA.primary.href}
        className="px-4 py-2 text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all rounded-full shadow-[0_0_15px_-3px_rgba(255,255,255,0.4)] hover:shadow-[0_0_20px_-3px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95"
      >
        {navCTA.primary.label}
      </Link>
    </div>
  );
}
