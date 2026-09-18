import type { Metadata } from "next";
import { getSettings } from "@/lib/data/public";
import { whatsappLink } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur l'achat, la location et le financement avec SKENDER IMMOBILIER.",
};

const faqs = [
  {
    q: "Comment réserver un bien ?",
    a: "Contactez-nous via WhatsApp, téléphone ou le formulaire de demande de visite sur la page du projet qui vous intéresse. Un conseiller vous accompagne ensuite jusqu'à la réservation.",
  },
  {
    q: "Quels documents sont nécessaires pour l'achat ?",
    a: "Une pièce d'identité, un justificatif de revenus et, selon le mode de financement, les documents bancaires correspondants. Notre équipe vous précise la liste exacte selon votre situation.",
  },
  {
    q: "Proposez-vous un accompagnement pour le financement ?",
    a: "Oui, nous vous orientons vers les meilleures options de financement (crédit immobilier, échelonnement) adaptées à votre projet.",
  },
  {
    q: "Puis-je louer un bien au lieu de l'acheter ?",
    a: "Oui, certains biens de nos résidences sont disponibles à la location. Consultez la page Location ou contactez-nous directement.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Chaque projet a une date de livraison indiquée sur sa page dédiée. Nous tenons nos clients informés de l'avancement des travaux.",
  },
  {
    q: "Comment suivre l'évolution des biens disponibles ?",
    a: "Chaque bien affiche son statut en temps réel : Disponible, Réservé ou Vendu, directement sur la page du projet.",
  },
];

export default async function FaqPage() {
  const settings = await getSettings();
  const waLink = whatsappLink(
    settings,
    `Bonjour ${settings.name}, j'ai une question qui n'est pas dans la FAQ.`
  );

  return (
    <div className="section-container py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
        FAQ
      </p>
      <h1 className="mb-10 font-display text-4xl font-bold">
        Questions fréquentes
      </h1>

      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((item) => (
          <details key={item.q} className="card-premium group p-5">
            <summary className="cursor-pointer list-none font-display text-lg font-semibold text-blanc marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-or-clair transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-blanc/70">{item.a}</p>
          </details>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center">
        <p className="mb-4 text-sm text-blanc/60">
          Une autre question ? Nous vous répondons rapidement.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <MessageCircle size={18} /> Poser une question sur WhatsApp
        </a>
      </div>
    </div>
  );
}
