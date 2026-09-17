import { PropertyForm } from "@/components/admin/property-form";
import { getAllProjectsForSelect } from "@/lib/data/admin";

export default async function NewPropertyPage() {
  const projects = await getAllProjectsForSelect();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Nouveau bien</h1>
      <PropertyForm projects={projects} />
    </div>
  );
}
