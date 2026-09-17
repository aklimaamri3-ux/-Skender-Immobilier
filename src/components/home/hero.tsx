import Link from "next/link";

export function Hero() {
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
