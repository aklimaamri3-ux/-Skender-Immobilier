import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { AgencySettings } from "@/types/database";

export function Footer({
  settings,
  locale,
}: {
  settings: AgencySettings;
  locale: Locale;
}) {
  const year = new Date().getFullYear();
  const dict = getDictionary(locale);

  return (
    <footer className="border-t border-or/15 bg-noir-soft">
      <div className="section-container grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold gold-gradient-text">
            {settings.name}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-blanc/60">
            {settings.slogan}
          </p>
          <p className="mt-4 max-w-xs text-sm text-blanc/60">{settings.about}</p>
          <div className="mt-4 flex gap-3">
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-or/30 p-2 text-or-clair hover:bg-or/10"
                aria-label="Facebook"
              >
                <FacebookIcon size={16} />
              </a>
            )}
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-or/30 p-2 text-or-clair hover:bg-or/10"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-or-clair">
            {dict.footer.quickLinks}
          </p>
          <ul className="space-y-2 text-sm text-blanc/70">
            <li><Link href="/" className="hover:text-or-clair">{dict.nav.home}</Link></li>
            <li><Link href="/projets" className="hover:text-or-clair">{dict.nav.projects}</Link></li>
            <li><Link href="/location" className="hover:text-or-clair">{dict.nav.location}</Link></li>
            <li><Link href="/galerie" className="hover:text-or-clair">{dict.nav.gallery}</Link></li>
            <li><Link href="/faq" className="hover:text-or-clair">{dict.nav.faq}</Link></li>
            <li><Link href="/a-propos" className="hover:text-or-clair">{dict.nav.about}</Link></li>
            <li><Link href="/contact" className="hover:text-or-clair">{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-or-clair">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-blanc/70">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-or" /> {settings.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-or" /> {settings.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-or" /> {settings.address}
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-or-clair">
            Nos projets
          </p>
          <p className="text-sm text-blanc/70">
            Bousmail · Alger (bientôt) · Blida (bientôt)
          </p>
        </div>
      </div>

      <div className="border-t border-or/10 py-5 text-center text-xs text-blanc/50">
        © {year} {settings.name} — {dict.footer.rights}
      </div>
    </footer>
  );
}
