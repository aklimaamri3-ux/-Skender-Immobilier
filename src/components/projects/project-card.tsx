import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProjectWithRelations } from "@/types/database";

const statusLabels: Record<string, string> = {
  en_cours: "En cours",
  livre: "Livré",
  a_venir: "À venir",
  archive: "Archivé",
};

export function ProjectCard({ project }: { project: ProjectWithRelations }) {
  const count = project.properties?.length ?? 0;

  return (
    <div className="card-premium flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3]">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-charbon text-blanc/40">
            Image à venir
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-noir/80 px-3 py-1 text-xs font-medium text-or-clair backdrop-blur">
          {statusLabels[project.status] ?? project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-blanc">
          {project.name}
        </h3>
        <p className="mt-1 text-sm text-blanc/55">{project.location}</p>
        <p className="mt-3 line-clamp-2 text-sm text-blanc/70">
          {project.short_description}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-blanc/60">{count} bien(s)</span>
          <span className="font-medium text-or-clair">
            À partir de {formatPrice(project.price_from)}
          </span>
        </div>

        <Link
          href={`/projets/${project.slug}`}
          className="btn-outline-gold mt-5 w-full text-sm"
        >
          Voir le projet
        </Link>
      </div>
    </div>
  );
}
