import type { Metadata } from "next";
import { getSettings } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez SKENDER IMMOBILIER, votre partenaire immobilier de confiance en Algérie.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  return (
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
    </div>
  );
}
