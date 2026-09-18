import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Home as HomeIcon,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function Hero({
  stats,
  heroImageUrl,
  location,
  locale,
}: {
  stats: { projects: number; apartments: number; villas: number };
  heroImageUrl?: string | null;
  location?: string;
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <section className="theme-dark relative flex min-h-[85vh] flex-col overflow-hidden bg-noir">
      {heroImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
          aria-hidden
        />
      ) : null}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,13,0.88)_0%,rgba(11,11,13,0.75)_45%,rgba(11,11,13,0.4)_75%,rgba(11,11,13,0.25)_100%),linear-gradient(180deg,rgba(11,11,13,0.55)_0%,rgba(11,11,13,0.55)_55%,rgba(11,11,13,0.92)_100%)]"
        aria-hidden
      />

      <div className="section-container relative z-10 flex flex-1 items-center py-20">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-or-clair animate-fade-up">
            <span className="h-px w-10 bg-or-clair/60" />
            {dict.hero.eyebrow}
          </p>
          <h1
            className="max-w-3xl font-display text-4xl font-bold leading-tight text-blanc-pur sm:text-6xl animate-fade-up"
            style={{ animationDelay: "0.1s", textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
          >
            <span className="gold-gradient-text">SKENDER</span> IMMOBILIER
          </h1>
          <p
            className="mt-4 max-w-xl text-lg font-medium uppercase tracking-[0.15em] text-blanc/90 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {dict.hero.slogan}
          </p>

          <div
            className="mt-8 flex flex-wrap gap-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-2 text-blanc/85">
              <LayoutGrid size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.projects}</span>
              <span className="text-sm uppercase tracking-wide">
                {stats.projects > 1 ? dict.hero.statProjects : dict.hero.statProject}
              </span>
            </div>
            <div className="flex items-center gap-2 text-blanc/85">
              <Building2 size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.apartments}</span>
              <span className="text-sm uppercase tracking-wide">{dict.hero.statApartments}</span>
            </div>
            <div className="flex items-center gap-2 text-blanc/85">
              <HomeIcon size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.villas}</span>
              <span className="text-sm uppercase tracking-wide">{dict.hero.statVillas}</span>
            </div>
          </div>

          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <Link href="/projets" className="btn-gold">
              {dict.hero.discover} <ArrowRight size={18} className="flip-rtl" />
            </Link>
            <Link href="/contact#rendez-vous" className="btn-outline-gold">
              {dict.hero.appointment} <CalendarClock size={18} />
            </Link>
          </div>
        </div>
      </div>

      {location && (
        <div className="section-container relative z-10 flex items-center gap-2 border-t border-or/10 py-4 text-xs text-blanc/70">
          <MapPin size={16} className="shrink-0 text-or" />
          <p className="font-medium text-blanc/90">{location}</p>
        </div>
      )}
    </section>
  );
}
