import { Mail, MapPin, Phone } from "lucide-react";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import type { AgencySettings, Project } from "@/types/database";

export function ContactSection({
  settings,
  projects,
}: {
  settings: AgencySettings;
  projects: Pick<Project, "id" | "name">[];
}) {
  return (
    <section id="rendez-vous" className="bg-noir-soft py-20">
      <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
            Contact
          </p>
          <h2 className="mb-6 font-display text-3xl font-bold sm:text-4xl">
            Prenez rendez-vous
          </h2>
          <p className="mb-8 text-blanc/70">
            Une question, une visite à programmer ? Notre équipe vous répond
            rapidement.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-or" /> {settings.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-or" /> {settings.email}
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-or" /> {settings.address}
            </li>
          </ul>
        </div>

        <div className="card-premium p-6 sm:p-8">
          <VisitRequestForm projects={projects} />
        </div>
      </div>
    </section>
  );
}
