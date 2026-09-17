import Link from "next/link";
import { Building2, Home as HomeIcon, LayoutGrid } from "lucide-react";

export function Hero({
  stats,
}: {
  stats: { projects: number; apartments: number; villas: number };
}) {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-noir">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,75,0.16),_transparent_60%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.4)_0%,rgba(11,11,13,0.85)_75%,rgba(11,11,13,1)_100%),url('/images/hero-bousmail.jpg')] bg-cover bg-center opacity-70"
        aria-hidden
      />

      <div className="section-container relative z-10 py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-or-clair animate-fade-up">
          Immobilier premium en Algérie
        </p>
        <h1
          className="max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="gold-gradient-text">SKENDER IMMOBILIER</span>
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
          Des programmes immobiliers d&apos;exception à Bousmail, bientôt à Alger et
          à Blida — appartements et villas conçus pour votre confort et pensés
          comme un investissement d&apos;avenir.
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
            Découvrir nos projets
          </Link>
          <Link href="/contact#rendez-vous" className="btn-outline-gold">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </section>
  );
}
