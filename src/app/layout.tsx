import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "КомпьютерщикЪ — Сервисный центр",
    template: "%s | КомпьютерщикЪ",
  },
  description:
    "Профессиональный ремонт компьютеров, ноутбуков, планшетов и техники Apple. Гарантия. Сертифицированные мастера.",
  keywords: [
    "ремонт компьютеров",
    "сервисный центр",
    "ремонт ноутбуков",
    "Apple ремонт",
    "планшет ремонт",
  ],
  openGraph: {
    title: "КомпьютерщикЪ — Сервисный центр",
    description: "Профессиональный ремонт с гарантией.",
    type: "website",
    locale: "ru_RU",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
