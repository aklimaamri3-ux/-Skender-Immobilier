import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Car, Compass, Layers, Maximize, MapPin, MessageCircle, Phone } from "lucide-react";
import { PropertyGallery } from "@/components/property/property-gallery";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import {
  formatPrice,
  safeJsonLd,
  statusDot,
  telLink,
  toEmbed3DUrl,
  whatsappLink,
} from "@/lib/utils";
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
  const embed3dUrl = property.plan_3d_url ? toEmbed3DUrl(property.plan_3d_url) : null;
  const galleryItems = (property.property_images ?? []).map((img) => ({
    id: img.id,
    url: img.url,
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

  const stats = [
    { icon: Maximize, label: "Surface", value: `${property.surface} m²` },
    { icon: BedDouble, label: "Chambres", value: property.bedrooms },
    { icon: Bath, label: "Salles de bain", value: property.bathrooms },
    ...(property.has_parking ? [{ icon: Car, label: "Parking", value: "Oui" }] : []),
  ];

  return (
    <div className="section-container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Projets", href: "/projets" },
          ...(project ? [{ label: project.name, href: `/projets/${slug}` }] : []),
          { label: property.reference },
        ]}
      />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyGallery items={galleryItems} alt={property.reference} />

          <div className="mb-2 mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
                {project?.name}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                {property.reference}
              </h1>
            </div>
            <span className="rounded-full border border-or/30 px-4 py-1 text-sm text-or-clair">
              {statusDot[property.status]} {statusLabels[property.status]}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-or/15 px-4 py-3"
              >
                <Icon size={20} className="text-or" />
                <div>
                  <p className="font-display text-lg font-bold leading-none">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-blanc/50">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 leading-relaxed text-blanc/75">{property.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field icon={Layers} label="Type" value={property.type} />
            <Field icon={Layers} label="Étage" value={property.floor ?? "—"} />
            <Field icon={Compass} label="Orientation" value={property.orientation ?? "—"} />
          </dl>

          {property.plan_url && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-xl font-semibold">Plan 3D du bien</h2>
              <a
                href={property.plan_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[10/7] w-full max-w-3xl overflow-hidden rounded-xl border border-or/20 bg-charbon"
              >
                <Image
                  src={property.plan_url}
                  alt="Plan du bien"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 720px, 100vw"
                />
              </a>
            </div>
          )}

          {project && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-xl font-semibold">Localisation</h2>
              <p className="mb-4 flex items-center gap-2 text-blanc/75">
                <MapPin size={18} className="shrink-0 text-or" />
                {project.location}
                {project.city && !project.location.toLowerCase().includes(project.city.toLowerCase()) ? `, ${project.city}` : ""}
              </p>
              <div className="aspect-video overflow-hidden rounded-xl border border-or/20">
                <iframe
                  title="Localisation du bien"
                  className="h-full w-full"
                  loading="lazy"
                  src={
                    project.latitude && project.longitude
                      ? `https://www.google.com/maps?q=${project.latitude},${project.longitude}&z=15&output=embed`
                      : `https://www.google.com/maps?q=${encodeURIComponent(project.location)}&output=embed`
                  }
                />
              </div>
              {project.nearby_points && (
                <p className="mt-3 text-sm text-blanc/60">
                  <span className="font-medium text-blanc/80">À proximité : </span>
                  {project.nearby_points}
                </p>
              )}
            </div>
          )}

          {property.plan_3d_url && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-xl font-semibold">
                Visite virtuelle 3D
              </h2>
              {embed3dUrl ? (
                <div className="aspect-video overflow-hidden rounded-xl border border-or/20">
                  <iframe
                    title="Visite virtuelle 3D"
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
                    allowFullScreen
                    src={embed3dUrl}
                  />
                </div>
              ) : (
                <a
                  href={property.plan_3d_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold"
                >
                  Voir la visite virtuelle 3D
                </a>
              )}
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
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-105"
              >
                <MessageCircle size={18} /> Contacter sur WhatsApp
              </a>
              <a href={telLink(settings.phone)} className="btn-outline-gold w-full">
                <Phone size={18} /> Appeler
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

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-or/15 p-4">
      <Icon size={18} className="shrink-0 text-or" />
      <div>
        <dt className="text-xs uppercase tracking-wide text-blanc/50">{label}</dt>
        <dd className="mt-0.5 font-medium text-blanc">{value}</dd>
      </div>
    </div>
  );
}
