import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LightboxGallery } from "@/components/shared/lightbox-gallery";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { formatPrice, statusDot, telLink, whatsappLink } from "@/lib/utils";
import { getPropertyById, getSettings } from "@/lib/data/public";
import { trackPageView } from "@/lib/actions/track";

const statusLabels: Record<string, string> = {
  disponible: "Disponible",
  reserve: "Réservé",
  vendu: "Vendu",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const property = await getPropertyById(slug, id);
  if (!property) return {};

  return {
    title: `${property.reference} — ${property.type}`,
    description: property.description ?? undefined,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const [property, settings] = await Promise.all([
    getPropertyById(slug, id),
    getSettings(),
  ]);

  if (!property) notFound();

  void trackPageView({
    path: `/projets/${slug}/biens/${property.id}`,
    projectId: property.project_id,
    propertyId: property.id,
  });

  const project = property.projects;
  const galleryItems = (property.property_images ?? []).map((img) => ({
    id: img.id,
    url: img.url,
    caption: property.reference,
  }));

  const waLink = whatsappLink(
    settings,
    `Bonjour, je suis intéressé(e) par le bien ${property.reference} (${project?.name ?? ""}).`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.reference,
    description: property.description ?? "",
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "DZD",
      availability:
        property.status === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
  };

  return (
    <div className="section-container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
        {project?.name}
      </p>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          {property.reference}
        </h1>
        <span className="rounded-full border border-or/30 px-4 py-1 text-sm text-or-clair">
          {statusDot[property.status]} {statusLabels[property.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {galleryItems.length > 0 ? (
            <LightboxGallery items={galleryItems} />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl border border-or/15 bg-charbon text-blanc/40">
              Photos à venir
            </div>
          )}

          <p className="mt-8 leading-relaxed text-blanc/75">
            {property.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label="Type" value={property.type} />
            <Field label="Surface" value={`${property.surface} m²`} />
            <Field label="Chambres" value={property.bedrooms} />
            <Field label="Salles de bain" value={property.bathrooms} />
            <Field label="Étage" value={property.floor ?? "—"} />
            <Field label="Orientation" value={property.orientation ?? "—"} />
            <Field label="Parking" value={property.has_parking ? "Oui" : "Non"} />
          </dl>

          {property.plan_url && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-xl font-semibold">Plan</h2>
              <a href={property.plan_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={property.plan_url}
                  alt="Plan du bien"
                  className="max-w-full rounded-xl border border-or/20"
                />
              </a>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="card-premium p-6">
            <p className="mb-1 text-sm text-blanc/60">Prix</p>
            <p className="mb-4 font-display text-2xl font-bold text-or-clair">
              {formatPrice(property.price)}
            </p>
            <div className="flex flex-col gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold w-full">
                Contacter sur WhatsApp
              </a>
              <a href={telLink(settings.phone)} className="btn-outline-gold w-full">
                Appeler
              </a>
            </div>
          </div>

          <div className="card-premium p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">
              Demander une visite
            </h3>
            {project && (
              <VisitRequestForm
                projects={[{ id: project.id, name: project.name }]}
                defaultProjectId={project.id}
                defaultPropertyId={property.id}
                properties={[{ id: property.id, reference: property.reference }]}
              />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-or/15 p-4">
      <dt className="text-xs uppercase tracking-wide text-blanc/50">{label}</dt>
      <dd className="mt-1 font-medium text-blanc">{value}</dd>
    </div>
  );
}
