import Link from "next/link";
import { LightboxGallery } from "@/components/shared/lightbox-gallery";

interface GalleryRow {
  id: string;
  url: string;
  projects?: { name: string } | { name: string }[] | null;
}

export function GallerySection({ images }: { images: GalleryRow[] }) {
  const items = images.slice(0, 8).map((img) => ({
    id: img.id,
    url: img.url,
    caption: Array.isArray(img.projects)
      ? img.projects[0]?.name
      : img.projects?.name,
  }));

  return (
    <section className="bg-noir-soft py-20">
      <div className="section-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
              Galerie
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Nos réalisations en images
            </h2>
          </div>
          <Link href="/galerie" className="btn-outline-gold text-sm">
            Voir toute la galerie
          </Link>
        </div>

        <LightboxGallery items={items} />
      </div>
    </section>
  );
}
