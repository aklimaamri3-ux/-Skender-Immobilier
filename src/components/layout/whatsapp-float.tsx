import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import type { AgencySettings } from "@/types/database";

export function WhatsappFloat({ settings }: { settings: AgencySettings }) {
  const href = whatsappLink(
    settings,
    `Bonjour ${settings.name}, je souhaite avoir plus d'informations sur vos projets immobiliers.`
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  );
}
