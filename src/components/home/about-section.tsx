import type { AgencySettings } from "@/types/database";

export function AboutSection({ settings }: { settings: AgencySettings }) {
  return (
    <section className="py-20">
      <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
            Notre agence
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            {settings.name}
          </h2>
        </div>
        <p className="text-blanc/70 lg:col-span-2 lg:text-lg lg:leading-relaxed">
          {settings.about}
        </p>
      </div>
    </section>
  );
}
