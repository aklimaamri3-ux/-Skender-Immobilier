import Link from "next/link";
import { getDashboardStats } from "@/lib/data/admin";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Projets", value: stats.projects, href: "/admin/projects" },
    { label: "Biens", value: stats.properties, href: "/admin/properties" },
    { label: "Disponibles", value: stats.available, href: "/admin/properties" },
    { label: "Réservés", value: stats.reserved, href: "/admin/properties" },
    { label: "Vendus", value: stats.sold, href: "/admin/properties" },
    { label: "Demandes", value: stats.inquiries, href: "/admin/inquiries" },
    { label: "Rendez-vous", value: stats.appointments, href: "/admin/appointments" },
  ];

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="card-premium p-6">
            <p className="font-display text-3xl font-bold text-or-clair">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-blanc/60">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/admin/projects/new" className="btn-gold text-center">
          + Nouveau projet
        </Link>
        <Link href="/admin/properties/new" className="btn-outline-gold text-center">
          + Nouveau bien
        </Link>
        <Link href="/admin/reviews" className="btn-outline-gold text-center">
          Gérer les avis
        </Link>
      </div>
    </div>
  );
}
