import Link from "next/link";
import { Bell } from "lucide-react";
import { getDashboardStats, getNewInquiriesCount, getTotalVisits } from "@/lib/data/admin";

export default async function AdminDashboardPage() {
  const [stats, newInquiriesCount, totalVisits] = await Promise.all([
    getDashboardStats(),
    getNewInquiriesCount(),
    getTotalVisits(),
  ]);

  const cards = [
    { label: "Projets", value: stats.projects, href: "/admin/projects" },
    { label: "Biens", value: stats.properties, href: "/admin/properties" },
    { label: "Disponibles", value: stats.available, href: "/admin/properties" },
    { label: "Réservés", value: stats.reserved, href: "/admin/properties" },
    { label: "Vendus", value: stats.sold, href: "/admin/properties" },
    { label: "Demandes", value: stats.inquiries, href: "/admin/inquiries" },
    { label: "Rendez-vous", value: stats.appointments, href: "/admin/appointments" },
    { label: "Visites du site", value: totalVisits, href: "/admin/stats" },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Tableau de bord</h1>
        {newInquiriesCount > 0 && (
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-2 rounded-full border border-or/30 bg-or/10 px-4 py-2 text-sm text-or-clair"
          >
            <Bell size={16} />
            {newInquiriesCount} nouvelle{newInquiriesCount > 1 ? "s" : ""} demande
            {newInquiriesCount > 1 ? "s" : ""}
          </Link>
        )}
      </div>

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
        <Link href="/admin/stats" className="btn-outline-gold text-center">
          Voir les statistiques
        </Link>
      </div>
    </div>
  );
}
