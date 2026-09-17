import { saveProperty, deletePropertyImage } from "@/lib/actions/properties";
import type { Project, Property, PropertyImage } from "@/types/database";

export function PropertyForm({
  property,
  projects,
}: {
  property?: Property & { property_images?: PropertyImage[] };
  projects: Pick<Project, "id" | "name">[];
}) {
  return (
    <form action={saveProperty} className="space-y-6" encType="multipart/form-data">
      {property && <input type="hidden" name="id" value={property.id} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Projet *">
          <select
            required
            name="project_id"
            defaultValue={property?.project_id}
            className="input"
          >
            <option value="">Sélectionner un projet</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Référence *">
          <input required name="reference" defaultValue={property?.reference} className="input" />
        </Field>
        <Field label="Type *">
          <select required name="type" defaultValue={property?.type ?? "appartement"} className="input">
            <option value="appartement">Appartement</option>
            <option value="villa">Villa</option>
            <option value="duplex">Duplex</option>
            <option value="studio">Studio</option>
            <option value="local_commercial">Local commercial</option>
            <option value="terrain">Terrain</option>
          </select>
        </Field>
        <Field label="Statut">
          <select name="status" defaultValue={property?.status ?? "disponible"} className="input">
            <option value="disponible">Disponible</option>
            <option value="reserve">Réservé</option>
            <option value="vendu">Vendu</option>
          </select>
        </Field>
        <Field label="Surface (m²) *">
          <input
            required
            type="number"
            step="0.01"
            name="surface"
            defaultValue={property?.surface}
            className="input"
          />
        </Field>
        <Field label="Prix (DZD) *">
          <input
            required
            type="number"
            name="price"
            defaultValue={property?.price}
            className="input"
          />
        </Field>
        <Field label="Chambres">
          <input
            type="number"
            name="bedrooms"
            defaultValue={property?.bedrooms ?? 0}
            className="input"
          />
        </Field>
        <Field label="Salles de bain">
          <input
            type="number"
            name="bathrooms"
            defaultValue={property?.bathrooms ?? 0}
            className="input"
          />
        </Field>
        <Field label="Étage">
          <input name="floor" defaultValue={property?.floor ?? ""} className="input" />
        </Field>
        <Field label="Orientation">
          <input name="orientation" defaultValue={property?.orientation ?? ""} className="input" />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="has_parking" defaultChecked={property?.has_parking ?? false} />
        Place de parking
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={property?.is_published ?? true}
        />
        Publié
      </label>

      <Field label="Description">
        <textarea
          name="description"
          rows={4}
          defaultValue={property?.description ?? ""}
          className="input"
        />
      </Field>

      <Field label="Plan (image)">
        <input type="file" name="plan" accept="image/*" className="input" />
      </Field>

      <Field label="Photos">
        <input type="file" name="photos" accept="image/*" multiple className="input" />
      </Field>

      {property?.property_images && property.property_images.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-blanc/60">Photos existantes</p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {property.property_images.map((img) => (
              <div key={img.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover"
                />
                <form action={deletePropertyImage} className="absolute right-1 top-1">
                  <input type="hidden" name="id" value={img.id} />
                  <input type="hidden" name="propertyId" value={property.id} />
                  <button
                    type="submit"
                    className="rounded-full bg-noir/80 px-2 text-xs text-red-400"
                  >
                    ✕
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="btn-gold">
        Enregistrer le bien
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-blanc/70">{label}</span>
      {children}
    </label>
  );
}
