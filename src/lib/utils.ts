import type { AgencySettings } from "@/types/database";

export function formatPrice(value: number | null | undefined) {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function whatsappLink(settings: AgencySettings, message: string) {
  const phone = settings.whatsapp.replace(/[^0-9]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toEmbedVideoUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function toEmbed3DUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("matterport.com")) return url;
    if (u.hostname.includes("kuula.co")) return url;
    const ytEmbed = toEmbedVideoUrl(url);
    if (ytEmbed) return ytEmbed;
    return null;
  } catch {
    return null;
  }
}

export const statusDot: Record<string, string> = {
  disponible: "🟢",
  reserve: "🟠",
  vendu: "🔴",
};
