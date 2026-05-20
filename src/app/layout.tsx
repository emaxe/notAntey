import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "КомпьютерщикЪ — сервисный центр | Ремонт ноутбуков, ПК и Apple",
  description:
    "Профессиональный ремонт ноутбуков, компьютеров, iPhone, iPad и MacBook. Оригинальные запчасти, гарантия, выезд мастера. Москва.",
  keywords: [
    "ремонт ноутбуков",
    "ремонт компьютеров",
    "ремонт MacBook",
    "ремонт iPhone",
    "сервисный центр",
    "Москва",
  ],
  openGraph: {
    title: "КомпьютерщикЪ — сервисный центр",
    description: "Профессиональный ремонт техники с гарантией. Оригинальные запчасти.",
    url: "https://example.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
