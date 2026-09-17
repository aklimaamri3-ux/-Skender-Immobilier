import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/admin/property-form";
import { getAllProjectsForSelect, getPropertyByIdAdmin } from "@/lib/data/admin";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [property, projects] = await Promise.all([
    getPropertyByIdAdmin(id),
    getAllProjectsForSelect(),
  ]);

  if (!property) notFound();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">
        Modifier : {property.reference}
      </h1>
      <PropertyForm property={property} projects={projects} />
    </div>
  );
}
