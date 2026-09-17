import Link from "next/link";
import { getAllPropertiesAdmin } from "@/lib/data/admin";
import { deleteProperty } from "@/lib/actions/properties";
import { PropertyStatusSelect } from "@/components/admin/property-status-select";
import { formatPrice } from "@/lib/utils";

export default async function AdminPropertiesPage() {
  const properties = await getAllPropertiesAdmin();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Biens</h1>
        <Link href="/admin/properties/new" className="btn-gold">
          + Nouveau bien
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-or/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-noir-soft text-blanc/60">
            <tr>
              <th className="p-3">Référence</th>
              <th className="p-3">Projet</th>
              <th className="p-3">Type</th>
              <th className="p-3">Surface</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t border-or/10">
                <td className="p-3 font-medium">{property.reference}</td>
                <td className="p-3 text-blanc/70">
                  {(property as { projects?: { name?: string } }).projects?.name}
                </td>
                <td className="p-3 text-blanc/70">{property.type}</td>
                <td className="p-3 text-blanc/70">{property.surface} m²</td>
                <td className="p-3 text-blanc/70">{formatPrice(property.price)}</td>
                <td className="p-3">
                  <PropertyStatusSelect id={property.id} status={property.status} />
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/properties/${property.id}/edit`}
                      className="text-or-clair hover:underline"
                    >
                      Modifier
                    </Link>
                    <form action={deleteProperty}>
                      <input type="hidden" name="id" value={property.id} />
                      <button type="submit" className="text-red-400 hover:underline">
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
