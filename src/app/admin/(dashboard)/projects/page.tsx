import Link from "next/link";
import { getAllProjectsAdmin } from "@/lib/data/admin";
import { deleteProject, togglePublishProject } from "@/lib/actions/projects";

const statusLabels: Record<string, string> = {
  en_cours: "En cours",
  livre: "Livré",
  a_venir: "À venir",
  archive: "Archivé",
};

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Projets</h1>
        <Link href="/admin/projects/new" className="btn-gold">
          + Nouveau projet
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-or/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-noir-soft text-blanc/60">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Localisation</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Biens</th>
              <th className="p-3">Publié</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-or/10">
                <td className="p-3 font-medium">{project.name}</td>
                <td className="p-3 text-blanc/70">{project.location}</td>
                <td className="p-3 text-blanc/70">
                  {statusLabels[project.status] ?? project.status}
                </td>
                <td className="p-3 text-blanc/70">
                  {(project as { properties?: unknown[] }).properties?.length ?? 0}
                </td>
                <td className="p-3">
                  <form action={togglePublishProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <input
                      type="hidden"
                      name="current"
                      value={String(project.is_published)}
                    />
                    <button
                      type="submit"
                      className={`rounded-full px-3 py-1 text-xs ${
                        project.is_published
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-blanc/10 text-blanc/50"
                      }`}
                    >
                      {project.is_published ? "Publié" : "Masqué"}
                    </button>
                  </form>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-or-clair hover:underline"
                    >
                      Modifier
                    </Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <button
                        type="submit"
                        className="text-red-400 hover:underline"
                      >
                        Supprimer
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
