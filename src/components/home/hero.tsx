import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  ChevronDown,
  Home as HomeIcon,
  LayoutGrid,
  MapPin,
} from "lucide-react";

export function Hero({
  stats,
  heroImageUrl,
  location,
}: {
  stats: { projects: number; apartments: number; villas: number };
  heroImageUrl?: string | null;
  location?: string;
}) {
  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden bg-noir">
      {heroImageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
          aria-hidden
        />
      ) : null}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.55)_0%,rgba(11,11,13,0.7)_55%,rgba(11,11,13,0.96)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,75,0.14),_transparent_60%)]"
        aria-hidden
      />

      <div className="section-container relative z-10 flex flex-1 items-center py-20">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-or-clair animate-fade-up">
            <span className="h-px w-10 bg-or-clair/60" />
            Immobilier premium en Algérie
          </p>
          <h1
            className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="gold-gradient-text">SKENDER</span> IMMOBILIER
          </h1>
          <p
            className="mt-4 max-w-xl text-lg font-medium uppercase tracking-[0.15em] text-blanc/90 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Votre projet, notre engagement
          </p>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-blanc/70 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Des programmes immobiliers d&apos;exception à Bousmail, bientôt à
            Alger et à Blida — appartements et villas conçus pour votre
            confort et pensés comme un investissement d&apos;avenir.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-8 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex items-center gap-2 text-blanc/85">
              <LayoutGrid size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.projects}</span>
              <span className="text-sm uppercase tracking-wide">projet{stats.projects > 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-blanc/85">
              <Building2 size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.apartments}</span>
              <span className="text-sm uppercase tracking-wide">appartements</span>
            </div>
            <div className="flex items-center gap-2 text-blanc/85">
              <HomeIcon size={20} className="text-or" />
              <span className="font-display text-xl font-bold text-or-clair">{stats.villas}</span>
              <span className="text-sm uppercase tracking-wide">villas</span>
            </div>
          </div>

          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link href="/projets" className="btn-gold">
              Découvrir nos projets <ArrowRight size={18} />
            </Link>
            <Link href="/contact#rendez-vous" className="btn-outline-gold">
              Prendre rendez-vous <CalendarClock size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="section-container relative z-10 flex flex-col gap-4 border-t border-or/10 py-5 text-xs text-blanc/70 sm:flex-row sm:items-center sm:justify-between">
        {location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-or" />
            <div>
              <p className="font-medium text-blanc/90">{location}</p>
              <p className="uppercase tracking-widest text-blanc/50">
                Des lieux qui ont du sens
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 uppercase tracking-widest text-blanc/60">
          <ChevronDown size={16} className="animate-bounce text-or" />
          Scroller pour découvrir
        </div>

        <p className="uppercase tracking-[0.3em] text-blanc/50">
          Qualité · Confiance · Avenir
        </p>
      </div>
    </section>
  );
}
