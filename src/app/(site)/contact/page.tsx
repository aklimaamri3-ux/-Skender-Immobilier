import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { getPublishedProjects, getSettings } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez SKENDER IMMOBILIER par téléphone, email, WhatsApp ou via notre formulaire.",
};

export default async function ContactPage() {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getPublishedProjects(),
  ]);

  return (
    <div className="section-container py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
        Contact
      </p>
      <h1 className="mb-10 font-display text-4xl font-bold">Contactez-nous</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <ul className="space-y-5 text-blanc/80">
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-or" /> {settings.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-or" /> {settings.email}
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 text-or" /> {settings.address}
            </li>
          </ul>

          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-or/20">
            <iframe
              title="Carte SKENDER IMMOBILIER"
              className="h-full w-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
            />
          </div>
        </div>

        <div id="rendez-vous" className="card-premium p-6 sm:p-8">
          <h2 className="mb-6 font-display text-xl font-semibold">
            Envoyez-nous un message
          </h2>
          <VisitRequestForm projects={projects.map((p) => ({ id: p.id, name: p.name }))} />
        </div>
      </div>
    </div>
  );
}
