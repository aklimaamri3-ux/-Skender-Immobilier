import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { getSettings } from "@/lib/data/public";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SKENDER IMMOBILIER — Votre projet, notre engagement",
    template: "%s | SKENDER IMMOBILIER",
  },
  description:
    "SKENDER IMMOBILIER — programmes immobiliers premium en Algérie (Bousmail, Alger, Blida). Appartements, villas et biens de standing.",
  openGraph: {
    title: "SKENDER IMMOBILIER",
    description: "Votre projet, notre engagement.",
    siteName: "SKENDER IMMOBILIER",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Skender Immo",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="fr" dir="ltr" className="h-full">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-full flex flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsappFloat settings={settings} />
      </body>
    </html>
  );
}
