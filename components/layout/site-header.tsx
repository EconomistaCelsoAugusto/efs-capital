import Link from "next/link";
import { Search } from "lucide-react";
import { MarketTicker } from "./market-ticker";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#analises", label: "Análises" },
  { href: "/#macro", label: "Macro" },
  { href: "/#internacional", label: "Internacional" },
  { href: "/#educacao", label: "Educação" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl text-paper">EFS</span>
          <span className="font-serif text-2xl text-gold-300 italic">CAPITAL</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-graphite-300 transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Buscar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-300 transition-colors hover:bg-navy-700 hover:text-paper"
        >
          <Search size={18} />
        </button>
      </div>
      <MarketTicker />
    </header>
  );
}
