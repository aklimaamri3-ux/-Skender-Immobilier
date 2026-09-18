"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const statusOptions = [
  { value: "", label: "Tous les statuts" },
  { value: "en_cours", label: "En cours" },
  { value: "livre", label: "Livré" },
  { value: "a_venir", label: "À venir" },
];

const typeOptions = [
  { value: "", label: "Tous les types" },
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "duplex", label: "Duplex" },
  { value: "studio", label: "Studio" },
  { value: "local_commercial", label: "Local commercial" },
  { value: "terrain", label: "Terrain" },
];

export function ProjectFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [minSurface, setMinSurface] = useState(searchParams.get("minSurface") ?? "");
  const [showMore, setShowMore] = useState(
    Boolean(searchParams.get("minPrice") || searchParams.get("maxPrice") || searchParams.get("minSurface"))
  );

  function applyFilters() {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (status) params.set("status", status);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minSurface) params.set("minSurface", minSurface);
    router.push(`/projets?${params.toString()}`);
  }

  function reset() {
    setLocation("");
    setType("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setMinSurface("");
    router.push("/projets");
  }

  return (
    <div className="card-premium mb-10 space-y-4 p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          placeholder="Localisation"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="input">
          {typeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="flex items-center gap-2 text-sm text-or-clair hover:underline"
      >
        <SlidersHorizontal size={14} />
        {showMore ? "Moins de filtres" : "Plus de filtres (prix, surface)"}
      </button>

      {showMore && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            placeholder="Prix min"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input"
          />
          <input
            placeholder="Prix max"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input"
          />
          <input
            placeholder="Surface min (m²)"
            type="number"
            value={minSurface}
            onChange={(e) => setMinSurface(e.target.value)}
            className="input"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={applyFilters} className="btn-gold text-sm">
          Filtrer
        </button>
        <button onClick={reset} className="btn-outline-gold text-sm">
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
