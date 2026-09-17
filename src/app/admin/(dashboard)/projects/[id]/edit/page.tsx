import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectByIdAdmin } from "@/lib/data/admin";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">
        Modifier : {project.name}
      </h1>
      <ProjectForm project={project} />
    </div>
  );
}
