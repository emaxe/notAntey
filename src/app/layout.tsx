import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "КомпьютерщикЪ — сервисный центр | Ремонт ноутбуков, ПК и Apple",
  description:
    "Профессиональный ремонт компьютеров, ноутбуков, планшетов и техники Apple. Гарантия до 12 месяцев. Оригинальные запчасти.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen antialiased text-ink bg-canvas`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
