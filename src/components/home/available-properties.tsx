import Link from "next/link";
import { PropertyCard } from "@/components/property/property-card";
import type { PropertyWithRelations } from "@/types/database";

export function AvailableProperties({
  properties,
}: {
  properties: PropertyWithRelations[];
}) {
  if (properties.length === 0) return null;

  return (
    <section className="bg-noir-soft py-20">
      <div className="section-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
              Biens disponibles
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Appartements et villas à saisir
            </h2>
          </div>
          <Link href="/projets" className="btn-outline-gold text-sm">
            Voir tous les biens
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {properties.slice(0, 8).map((property) => (
            <div key={property.id}>
              <PropertyCard property={property} projectSlug={property.projects?.slug ?? ""} />
              {property.projects?.name && (
                <p className="mt-2 text-center text-xs uppercase tracking-wide text-blanc/50">
                  {property.projects.name} · {property.projects.location}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
