import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Administration | SKENDER IMMOBILIER",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className="h-full">
      <body className={`${inter.variable} min-h-full bg-noir text-blanc antialiased`}>
        {children}
      </body>
    </html>
  );
}
