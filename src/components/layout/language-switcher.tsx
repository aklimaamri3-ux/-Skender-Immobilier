"use client";

import { useState, useTransition } from "react";
import { Globe } from "lucide-react";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { setLocale } from "@/lib/actions/locale";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    startTransition(async () => {
      await setLocale(next);
      window.location.reload();
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={pending}
        className="flex items-center gap-1.5 rounded-md border border-or/20 px-2.5 py-1.5 text-xs font-medium text-blanc/80 hover:border-or/50 hover:text-or-clair"
        aria-label="Changer de langue"
      >
        <Globe size={14} />
        {locale.toUpperCase()}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute end-0 z-50 mt-2 w-36 rounded-md border border-or/20 bg-noir-soft py-1 shadow-lg">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => choose(l)}
                className={`block w-full px-3 py-2 text-start text-sm ${
                  l === locale
                    ? "text-or-clair"
                    : "text-blanc/80 hover:bg-charbon hover:text-or-clair"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
