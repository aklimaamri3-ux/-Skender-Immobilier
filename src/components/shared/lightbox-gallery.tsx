"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export function LightboxGallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-sm text-blanc/50">Aucune image disponible pour le moment.</p>
    );
  }

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-or/15"
          >
            <Image
              src={item.url}
              alt={item.caption ?? "Photo SKENDER IMMOBILIER"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="25vw"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/95 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Fermer"
            className="absolute right-5 top-5 text-blanc/80 hover:text-or-clair"
          >
            <X size={30} />
          </button>
          <button
            onClick={prev}
            aria-label="Précédent"
            className="absolute left-3 text-blanc/80 hover:text-or-clair sm:left-8"
          >
            <ChevronLeft size={36} />
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image
              src={items[activeIndex].url}
              alt={items[activeIndex].caption ?? "Photo"}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={next}
            aria-label="Suivant"
            className="absolute right-3 text-blanc/80 hover:text-or-clair sm:right-8"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
