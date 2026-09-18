import type { Metadata } from "next";
import { KeySquare, MessageCircle, Phone } from "lucide-react";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { ProjectCard } from "@/components/projects/project-card";
import { getPublishedProjects, getSettings } from "@/lib/data/public";
import { telLink, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Location",
  description:
    "Location d'appartements et de villas avec SKENDER IMMOBILIER — gestion locative simple et sereine.",
};

export default async function LocationPage() {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getPublishedProjects(),
  ]);

  const waLink = whatsappLink(
    settings,
    `Bonjour ${settings.name}, je suis intéressé(e) par une location.`
  );

  return (
    <div className="section-container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-or/30 bg-charbon">
          <KeySquare className="text-or" size={26} />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Location
        </p>
        <h1 className="mb-4 font-display text-4xl font-bold">
          Trouvez votre logement en location
        </h1>
        <p className="text-blanc/70">
          Appartements et villas disponibles à la location dans nos
          résidences. Contactez-nous directement, nous vous orientons vers
          le bien qui correspond à vos besoins.
        </p>
        {settings.rental_count > 0 && (
          <p className="mt-4 font-display text-sm uppercase tracking-[0.2em] text-or-clair">
            {settings.rental_count} biens actuellement disponibles en location
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a href={telLink(settings.phone)} className="btn-outline-gold">
            <Phone size={18} /> Appeler
          </a>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-6 text-center font-display text-2xl font-semibold">
            Nos résidences
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-14 max-w-xl card-premium p-6 sm:p-8">
        <h2 className="mb-6 text-center font-display text-xl font-semibold">
          Faire une demande de location
        </h2>
        <VisitRequestForm projects={projects.map((p) => ({ id: p.id, name: p.name }))} />
      </div>
    </div>
  );
}
