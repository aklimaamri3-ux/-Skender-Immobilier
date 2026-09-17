import type { Metadata } from "next";
import Image from "next/image";
import { getSettings } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez SKENDER IMMOBILIER, votre partenaire immobilier de confiance en Algérie.",
};

const values = [
  { label: "Confiance" },
  { label: "Sécurité" },
  { label: "Qualité" },
  { label: "Accompagnement" },
];

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
        <Image
          src="/brand/logo-full.png"
          alt={`${settings.name} — ${settings.slogan}`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/10 to-noir/30" />
      </div>

      <div className="section-container py-16">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          À propos
        </p>
        <h1 className="mb-8 font-display text-4xl font-bold">{settings.name}</h1>
        <p className="mb-2 text-lg uppercase tracking-[0.15em] text-or-clair">
          {settings.slogan}
        </p>
        <p className="mt-6 max-w-3xl leading-relaxed text-blanc/75">
          {settings.about}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.label}
              className="rounded-lg border border-or/15 py-6 text-center text-sm font-semibold uppercase tracking-widest text-or-clair"
            >
              {v.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
