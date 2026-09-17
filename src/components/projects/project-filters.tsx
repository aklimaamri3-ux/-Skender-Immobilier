"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    <div className="card-premium mb-10 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-6">
      <input
        placeholder="Localisation"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or lg:col-span-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
      >
        {typeOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input
        placeholder="Prix min"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
      />
      <input
        placeholder="Prix max"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
      />
      <input
        placeholder="Surface min (m²)"
        type="number"
        value={minSurface}
        onChange={(e) => setMinSurface(e.target.value)}
        className="rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
      />
      <div className="flex gap-2 lg:col-span-6">
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
