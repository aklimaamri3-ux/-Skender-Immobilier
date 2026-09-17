import Image from "next/image";
import Link from "next/link";
import { formatPrice, statusDot } from "@/lib/utils";
import type { Property, PropertyImage } from "@/types/database";

const statusStyles: Record<string, string> = {
  disponible: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  reserve: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  vendu: "bg-red-500/15 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  disponible: "Disponible",
  reserve: "Réservé",
  vendu: "Vendu",
};

export function PropertyCard({
  property,
  projectSlug,
}: {
  property: Property & { property_images?: PropertyImage[] };
  projectSlug: string;
}) {
  const image = property.property_images?.[0]?.url;

  return (
    <Link
      href={`/projets/${projectSlug}/biens/${property.id}`}
      className="card-premium flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3]">
        {image ? (
          <Image
            src={image}
            alt={property.reference}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-charbon text-blanc/40">
            Photo à venir
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[property.status]}`}
        >
          {statusDot[property.status]} {statusLabels[property.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display font-semibold text-blanc">
          {property.reference}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-blanc/50">
          {property.type} · {property.surface} m² · {property.bedrooms} ch.
        </p>
        <p className="mt-3 font-medium text-or-clair">
          {formatPrice(property.price)}
        </p>
      </div>
    </Link>
  );
}
