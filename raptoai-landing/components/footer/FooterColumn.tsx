import Link from "next/link";

interface ColumnProps {
  header: string;
  links: readonly { label: string; href: string }[];
}

export function FooterColumn({ header, links }: ColumnProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 font-semibold">
        {header}
      </h3>
      <ul className="flex flex-col gap-4 group/list">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group relative inline-flex font-sans text-sm text-[var(--color-ink-on-dark-muted)] transition-colors duration-300 ease-out hover:text-white group-hover/list:text-white/40 group-hover/list:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-300)] rounded-sm"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-[var(--color-brand-300)] to-transparent transition-all duration-300 ease-out group-hover:w-full group-focus-visible:w-full" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
