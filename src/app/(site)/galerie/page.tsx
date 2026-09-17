import type { Metadata } from "next";
import { LightboxGallery } from "@/components/shared/lightbox-gallery";
import { getGalleryImages } from "@/lib/data/public";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Photos et plans de nos projets immobiliers SKENDER IMMOBILIER.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  const items = images.map((img) => ({
    id: img.id,
    url: img.url,
    caption: Array.isArray(img.projects) ? img.projects[0]?.name : img.projects?.name,
  }));

  return (
    <div className="section-container py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
        Galerie
      </p>
      <h1 className="mb-10 font-display text-4xl font-bold">
        Toutes nos réalisations
      </h1>
      <LightboxGallery items={items} />
    </div>
  );
}
