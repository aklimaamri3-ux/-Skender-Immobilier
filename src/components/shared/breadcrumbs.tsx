import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-blanc/55">
      <Link href="/" className="flex items-center gap-1 hover:text-or-clair">
        <Home size={13} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-blanc/30" />
          {item.href ? (
            <Link href={item.href} className="hover:text-or-clair">
              {item.label}
            </Link>
          ) : (
            <span className="text-blanc/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
