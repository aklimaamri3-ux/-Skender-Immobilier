import { Gem, ShieldCheck, MapPinned, Trees, Building } from "lucide-react";

const features = [
  { icon: Building, label: "Architecture moderne" },
  { icon: Gem, label: "Finitions de qualité" },
  { icon: MapPinned, label: "Proximité de tous les services" },
  { icon: ShieldCheck, label: "Résidence sécurisée" },
  { icon: Trees, label: "Espaces extérieurs" },
];

export function HeroFeatures() {
  return (
    <div className="border-y border-or/10 bg-noir-soft">
      <div className="section-container grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="text-or" size={22} />
            <span className="text-xs uppercase tracking-wide text-blanc/70">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
