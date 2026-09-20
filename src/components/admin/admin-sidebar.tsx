"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Building2,
  CalendarClock,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Settings,
  Star,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: Building2 },
  { href: "/admin/properties", label: "Biens", icon: Home },
  { href: "/admin/inquiries", label: "Demandes", icon: Inbox },
  { href: "/admin/appointments", label: "Rendez-vous", icon: CalendarClock },
  { href: "/admin/stats", label: "Statistiques", icon: BarChart3 },
  { href: "/admin/reviews", label: "Avis clients", icon: Star },
  { href: "/admin/settings", label: "Contenu du site", icon: Settings },
];

export function AdminSidebar({
  adminName,
  newInquiriesCount,
}: {
  adminName: string;
  newInquiriesCount: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-or/15 bg-noir-soft px-4 py-3 lg:hidden">
      <p className="font-display text-base font-bold gold-gradient-text">SKENDER IMMOBILIER</p>
      <div className="flex items-center gap-2">
        {newInquiriesCount > 0 && (
          <Link href="/admin/inquiries" className="rounded-full bg-or px-2 py-0.5 text-xs font-semibold text-noir">
            {newInquiriesCount}
          </Link>
        )}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-blanc hover:bg-charbon"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>

    {open && (
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
      />
    )}

    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col overflow-y-auto border-r border-or/15 bg-noir-soft transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:shrink-0 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-start justify-between border-b border-or/10 p-6">
        <div>
          <p className="font-display text-lg font-bold gold-gradient-text">SKENDER IMMOBILIER</p>
          <p className="mt-1 text-xs text-blanc/50">Connecté : {adminName}</p>
        </div>
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
          className="rounded-md p-1 text-blanc/70 hover:bg-charbon lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-or/15 text-or-clair"
                  : "text-blanc/70 hover:bg-charbon hover:text-blanc"
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {href === "/admin/inquiries" && newInquiriesCount > 0 && (
                <span className="rounded-full bg-or px-2 py-0.5 text-xs font-semibold text-noir">
                  {newInquiriesCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-or/10 p-4">
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-blanc/70 hover:bg-charbon hover:text-red-400">
            <LogOut size={18} /> Déconnexion
          </button>
        </form>
      </div>
    </aside>
    </>
  );
}
