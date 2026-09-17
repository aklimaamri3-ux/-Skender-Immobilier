import { Award, ShieldCheck, Handshake, Sparkles } from "lucide-react";

const points = [
  { icon: Award, title: "Expertise reconnue", text: "Une équipe expérimentée dans la promotion immobilière." },
  { icon: ShieldCheck, title: "Transparence totale", text: "Des informations claires sur chaque bien et chaque projet." },
  { icon: Handshake, title: "Engagement client", text: "Un accompagnement personnalisé du premier contact à la remise des clés." },
  { icon: Sparkles, title: "Standing premium", text: "Des finitions et des emplacements soigneusement sélectionnés." },
];

export function WhyUsSection() {
  return (
    <section className="py-20">
      <div className="section-container">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Pourquoi nous choisir
        </p>
        <h2 className="mb-12 font-display text-3xl font-bold sm:text-4xl">
          L&apos;excellence à chaque étape
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-or/30 bg-charbon">
                <Icon className="text-or-clair" size={26} />
              </div>
              <h3 className="mb-2 font-display font-semibold text-blanc">
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
