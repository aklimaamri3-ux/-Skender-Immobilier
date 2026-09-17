import { saveProject, deleteProjectImage } from "@/lib/actions/projects";
import type { Project, ProjectImage } from "@/types/database";

export function ProjectForm({
  project,
}: {
  project?: Project & { project_images?: ProjectImage[] };
}) {
  return (
    <form action={saveProject} className="space-y-6" encType="multipart/form-data">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nom du projet *">
          <input required name="name" defaultValue={project?.name} className="input" />
        </Field>
        <Field label="Slug (URL)">
          <input
            name="slug"
            defaultValue={project?.slug}
            placeholder="généré automatiquement si vide"
            className="input"
          />
        </Field>
        <Field label="Localisation *">
          <input required name="location" defaultValue={project?.location} className="input" />
        </Field>
        <Field label="Ville">
          <input name="city" defaultValue={project?.city ?? ""} className="input" />
        </Field>
        <Field label="Statut">
          <select name="status" defaultValue={project?.status ?? "en_cours"} className="input">
            <option value="en_cours">En cours</option>
            <option value="livre">Livré</option>
            <option value="a_venir">À venir</option>
            <option value="archive">Archivé</option>
          </select>
        </Field>
        <Field label="Prix à partir de (DZD)">
          <input
            type="number"
            name="price_from"
            defaultValue={project?.price_from ?? ""}
            className="input"
          />
        </Field>
        <Field label="Date de livraison">
          <input
            type="date"
            name="delivery_date"
            defaultValue={project?.delivery_date ?? ""}
            className="input"
          />
        </Field>
        <Field label="Nombre d'appartements">
          <input
            type="number"
            name="apartments_count"
            defaultValue={project?.apartments_count ?? 0}
            className="input"
          />
        </Field>
        <Field label="Nombre de villas">
          <input
            type="number"
            name="villas_count"
            defaultValue={project?.villas_count ?? 0}
            className="input"
          />
        </Field>
        <Field label="Latitude">
          <input
            type="number"
            step="any"
            name="latitude"
            defaultValue={project?.latitude ?? ""}
            className="input"
          />
        </Field>
        <Field label="Longitude">
          <input
            type="number"
            step="any"
            name="longitude"
            defaultValue={project?.longitude ?? ""}
            className="input"
          />
        </Field>
        <Field label="URL vidéo (YouTube/Vimeo)">
          <input name="video_url" defaultValue={project?.video_url ?? ""} className="input" />
        </Field>
      </div>

      <Field label="Description courte">
        <textarea
          name="short_description"
          rows={2}
          defaultValue={project?.short_description ?? ""}
          className="input"
        />
      </Field>
      <Field label="Description complète">
        <textarea
          name="description"
          rows={5}
          defaultValue={project?.description ?? ""}
          className="input"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Titre SEO">
          <input name="seo_title" defaultValue={project?.seo_title ?? ""} className="input" />
        </Field>
        <Field label="Description SEO">
          <input
            name="seo_description"
            defaultValue={project?.seo_description ?? ""}
            className="input"
          />
        </Field>
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={project?.is_published ?? true}
          />
          Publié
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_featured" defaultChecked={project?.is_featured ?? false} />
          Projet à la une
        </label>
      </div>

      <Field label="Image de couverture">
        <input type="file" name="cover_image" accept="image/*" className="input" />
      </Field>

      <Field label="Ajouter des images à la galerie">
        <input type="file" name="gallery_images" accept="image/*" multiple className="input" />
      </Field>

      {project?.project_images && project.project_images.length > 0 && (
        <div>
          <p className="mb-2 text-sm text-blanc/60">Images existantes</p>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
            {project.project_images.map((img) => (
              <div key={img.id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="aspect-square w-full rounded-md object-cover"
                />
                <form action={deleteProjectImage} className="absolute right-1 top-1">
                  <input type="hidden" name="id" value={img.id} />
                  <input type="hidden" name="projectId" value={project.id} />
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
        Enregistrer le projet
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
