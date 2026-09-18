"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryPhoto {
  id: string;
  url: string;
}

export function PropertyGallery({
  items,
  alt,
}: {
  items: GalleryPhoto[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-or/15 bg-charbon text-blanc/40">
        Photos à venir
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative block aspect-video w-full overflow-hidden rounded-xl border border-or/15"
      >
        <Image
          src={items[active].url}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
        />
      </button>

      {items.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                i === active ? "border-or" : "border-or/15 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={item.url} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-noir/95 p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(false)}
            aria-label="Fermer"
            className="absolute right-5 top-5 text-blanc/80 hover:text-or-clair"
          >
            <X size={30} />
          </button>
          {items.length > 1 && (
            <button
              onClick={() => setActive((i) => (i - 1 + items.length) % items.length)}
              aria-label="Précédent"
              className="absolute left-3 text-blanc/80 hover:text-or-clair sm:left-8"
            >
              <ChevronLeft size={36} />
            </button>
          )}
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Image src={items[active].url} alt={alt} fill className="object-contain" sizes="90vw" />
          </div>
          {items.length > 1 && (
            <button
              onClick={() => setActive((i) => (i + 1) % items.length)}
              aria-label="Suivant"
              className="absolute right-3 text-blanc/80 hover:text-or-clair sm:right-8"
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
