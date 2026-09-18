"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/projets", label: dict.nav.projects },
    { href: "/location", label: dict.nav.location },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/faq", label: dict.nav.faq },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-or/15 bg-noir/90 backdrop-blur">
      <div className="section-container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl font-bold tracking-wide gold-gradient-text sm:text-2xl">
            SKENDER IMMOBILIER
          </span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.25em] text-blanc/60 sm:block">
            {dict.hero.slogan}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
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
          <LanguageSwitcher locale={locale} />
          <Link href="/contact#rendez-vous" className="btn-gold text-sm">
            {dict.nav.appointment}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            aria-label="Ouvrir le menu"
            className="text-blanc"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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
              {dict.nav.appointment}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
