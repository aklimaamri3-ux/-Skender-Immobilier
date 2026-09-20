import Link from "next/link";
import { KeySquare, MessageCircle } from "lucide-react";

export function RentalCta({ whatsappHref }: { whatsappHref: string }) {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="card-premium flex flex-col items-center gap-6 p-8 text-center sm:p-12 lg:flex-row lg:justify-between lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-or/30">
              <KeySquare className="text-or" size={26} />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Vous cherchez un logement en location ?
              </h2>
              <p className="mt-2 text-blanc/70">
                Appartements et villas disponibles, gestion locative sereine.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/location" className="btn-gold">
              Voir les locations
            </Link>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              <MessageCircle size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
