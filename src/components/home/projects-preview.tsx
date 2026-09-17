import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectWithRelations } from "@/types/database";

export function ProjectsPreview({
  projects,
}: {
  projects: ProjectWithRelations[];
}) {
  if (projects.length === 0) return null;

  return (
    <section className="py-20">
      <div className="section-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
              Nos projets
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Des programmes d&apos;exception
            </h2>
          </div>
          <Link href="/projets" className="btn-outline-gold text-sm">
            Voir tous les projets
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
