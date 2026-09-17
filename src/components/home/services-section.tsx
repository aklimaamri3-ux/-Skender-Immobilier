import { Building2, HandCoins, KeyRound, Wrench } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Promotion immobilière",
    text: "Conception et réalisation de programmes résidentiels haut de gamme.",
  },
  {
    icon: KeyRound,
    title: "Vente de biens",
    text: "Accompagnement complet, de la visite à la remise des clés.",
  },
  {
    icon: HandCoins,
    title: "Conseil & financement",
    text: "Orientation sur les meilleures options pour concrétiser votre projet.",
  },
  {
    icon: Wrench,
    title: "Service après-vente",
    text: "Un suivi rigoureux après la livraison de votre bien.",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-noir-soft py-20">
      <div className="section-container">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Nos services
        </p>
        <h2 className="mb-12 font-display text-3xl font-bold sm:text-4xl">
          Un accompagnement complet
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-premium p-6">
              <Icon className="mb-4 text-or" size={28} />
              <h3 className="mb-2 font-display text-lg font-semibold text-blanc">
                {title}
              </h3>
              <p className="text-sm text-blanc/65">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
