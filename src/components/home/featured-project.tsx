import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProjectWithRelations } from "@/types/database";

export function FeaturedProject({
  project,
}: {
  project: ProjectWithRelations | null;
}) {
  if (!project) return null;

  const available =
    project.properties?.filter((p) => p.status === "disponible").length ?? 0;

  return (
    <section className="bg-noir-soft py-20">
      <div className="section-container">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Projet à la une
        </p>
        <h2 className="mb-10 font-display text-3xl font-bold text-blanc sm:text-4xl">
          {project.name}
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-or/20">
            {project.cover_image_url ? (
              <Image
                src={project.cover_image_url}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-charbon text-blanc/40">
                Image à venir
              </div>
            )}
          </div>

          <div>
            <p className="text-blanc/70">{project.short_description}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-or/15 p-4">
                <dt className="text-blanc/50">Localisation</dt>
                <dd className="mt-1 font-medium text-or-clair">
                  {project.location}
                </dd>
              </div>
              <div className="rounded-lg border border-or/15 p-4">
                <dt className="text-blanc/50">À partir de</dt>
                <dd className="mt-1 font-medium text-or-clair">
                  {formatPrice(project.price_from)}
                </dd>
              </div>
              <div className="rounded-lg border border-or/15 p-4">
                <dt className="text-blanc/50">Biens disponibles</dt>
                <dd className="mt-1 font-medium text-or-clair">{available}</dd>
              </div>
              <div className="rounded-lg border border-or/15 p-4">
                <dt className="text-blanc/50">Livraison</dt>
                <dd className="mt-1 font-medium text-or-clair">
                  {project.delivery_date
                    ? new Date(project.delivery_date).getFullYear()
                    : "À confirmer"}
                </dd>
              </div>
            </dl>

            <Link
              href={`/projets/${project.slug}`}
              className="btn-gold mt-8 inline-flex"
            >
              Voir le projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
