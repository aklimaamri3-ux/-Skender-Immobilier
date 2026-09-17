"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/projets", label: "Projets" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-or/15 bg-noir/90 backdrop-blur">
      <div className="section-container flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-bold tracking-wide gold-gradient-text sm:text-2xl">
            SKENDER IMMOBILIER
          </span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.25em] text-blanc/60 sm:block">
            Votre projet, notre engagement
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-or-clair ${
                pathname === link.href ? "text-or-clair" : "text-blanc/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact#rendez-vous" className="btn-gold text-sm">
            Prendre rendez-vous
          </Link>
        </nav>

        <button
          aria-label="Ouvrir le menu"
          className="text-blanc md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-or/10 bg-noir-soft md:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded px-2 py-3 text-sm font-medium ${
                  pathname === link.href
                    ? "text-or-clair"
                    : "text-blanc/85 hover:text-or-clair"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#rendez-vous"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 text-sm"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
