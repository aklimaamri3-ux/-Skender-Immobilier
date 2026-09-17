import type { Metadata } from "next";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectCard } from "@/components/projects/project-card";
import { getPublishedProjects } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "Nos projets",
  description:
    "Découvrez tous les programmes immobiliers SKENDER IMMOBILIER en Algérie : appartements, villas et biens de standing.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const projects = await getPublishedProjects({
    location: params.location,
    type: params.type,
    status: params.status,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    minSurface: params.minSurface ? Number(params.minSurface) : undefined,
  });

  return (
    <div className="section-container py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
        Nos projets
      </p>
      <h1 className="mb-10 font-display text-4xl font-bold">
        Tous nos programmes immobiliers
      </h1>

      <ProjectFilters />

      {projects.length === 0 ? (
        <p className="text-blanc/60">Aucun résultat pour ces critères.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
