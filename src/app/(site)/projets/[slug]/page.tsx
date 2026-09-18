import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarCheck2, Home, MapPin, Phone } from "lucide-react";
import { LightboxGallery } from "@/components/shared/lightbox-gallery";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PropertyCard } from "@/components/property/property-card";
import { VisitRequestForm } from "@/components/forms/visit-request-form";
import { formatDate, formatPrice, telLink, toEmbedVideoUrl, whatsappLink } from "@/lib/utils";
import { getProjectBySlug, getSettings } from "@/lib/data/public";
import { trackPageView } from "@/lib/actions/track";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.seo_title || project.name,
    description:
      project.seo_description || project.short_description || project.description || undefined,
    openGraph: {
      title: project.seo_title || project.name,
      description: project.short_description ?? undefined,
      images: project.cover_image_url ? [project.cover_image_url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSettings(),
  ]);

  if (!project) notFound();

  void trackPageView({ path: `/projets/${project.slug}`, projectId: project.id });

  const properties = project.properties ?? [];
  const disponibles = properties.filter((p) => p.status === "disponible").length;
  const reserves = properties.filter((p) => p.status === "reserve").length;
  const vendus = properties.filter((p) => p.status === "vendu").length;

  const galleryItems = (project.project_images ?? []).map((img) => ({
    id: img.id,
    url: img.url,
    caption: project.name,
  }));

  const waLink = whatsappLink(
    settings,
    `Bonjour, je suis intéressé(e) par le projet ${project.name}.`
  );
  const embedVideoUrl = project.video_url ? toEmbedVideoUrl(project.video_url) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description ?? project.short_description ?? "",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/projets/${project.slug}`,
    image: project.cover_image_url ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.city ?? project.location,
      addressCountry: "DZ",
    },
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative h-[50vh] min-h-[360px] w-full">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-charbon" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-noir/20" />
        <div className="section-container absolute inset-x-0 bottom-8">
          <h1 className="font-display text-3xl font-bold text-blanc sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-blanc/80">
            <MapPin size={18} className="text-or" /> {project.location}
          </p>
        </div>
      </div>

      <div className="section-container mt-6">
        <Breadcrumbs items={[{ label: "Projets", href: "/projets" }, { label: project.name }]} />
      </div>

      <div className="section-container mt-6 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-blanc/75 leading-relaxed">{project.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Disponibles" value={disponibles} />
            <Stat label="Réservés" value={reserves} />
            <Stat label="Vendus" value={vendus} />
            <Stat
              label="Livraison"
              value={project.delivery_date ? formatDate(project.delivery_date) : "À confirmer"}
            />
          </dl>

          {galleryItems.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-semibold">Galerie</h2>
              <LightboxGallery items={galleryItems} />
            </div>
          )}

          {embedVideoUrl && (
            <div className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-semibold">Vidéo</h2>
              <div className="aspect-video overflow-hidden rounded-xl border border-or/20">
                <iframe
                  title={`Vidéo — ${project.name}`}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  src={embedVideoUrl}
                />
              </div>
            </div>
          )}

          {properties.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-semibold">
                Biens disponibles ({properties.length})
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    projectSlug={project.slug}
                  />
                ))}
              </div>
            </div>
          )}

          {(project.latitude && project.longitude) && (
            <div className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-semibold">Localisation</h2>
              <div className="aspect-video overflow-hidden rounded-xl border border-or/20">
                <iframe
                  title="Localisation du projet"
                  className="h-full w-full"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${project.latitude},${project.longitude}&z=15&output=embed`}
                />
              </div>
              {project.nearby_points && (
                <div className="mt-4 rounded-lg border border-or/15 p-4">
                  <p className="mb-2 text-sm font-semibold text-or-clair">
                    À proximité
                  </p>
                  <p className="whitespace-pre-line text-sm text-blanc/70">
                    {project.nearby_points}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="card-premium p-6">
            <p className="mb-1 text-sm text-blanc/60">À partir de</p>
            <p className="mb-4 font-display text-2xl font-bold text-or-clair">
              {formatPrice(project.price_from)}
            </p>
            <div className="flex flex-col gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <Home size={18} /> Contacter sur WhatsApp
              </a>
              <a href={telLink(settings.phone)} className="btn-outline-gold">
                <Phone size={18} /> Appeler
              </a>
              <Link href="#demander-visite" className="btn-outline-gold">
                <CalendarCheck2 size={18} /> Demander une visite
              </Link>
            </div>
          </div>

          <div id="demander-visite" className="card-premium p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">
              Demander une visite
            </h3>
            <VisitRequestForm
              projects={[{ id: project.id, name: project.name }]}
              defaultProjectId={project.id}
              properties={properties.map((p) => ({ id: p.id, reference: p.reference }))}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-or/15 p-4 text-center">
      <dd className="font-display text-xl font-bold text-or-clair">{value}</dd>
      <dt className="mt-1 text-xs uppercase tracking-wide text-blanc/50">{label}</dt>
    </div>
  );
}
