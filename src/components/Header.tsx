"use client";

import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "#services", label: "Услуги" },
    { href: "#works", label: "Наши работы" },
    { href: "#price", label: "Прайс" },
    { href: "#features", label: "Фишки" },
    { href: "#certs", label: "Сертификаты" },
  ];

  return (
    <header className="sticky top-0 z-50 h-nav border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-container-lg items-center justify-between px-base">
        <Link href="/" className="text-title-md font-bold text-ink">
          КомпьютерщикЪ
        </Link>

        <nav className="hidden items-center gap-lg md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="text-nav-link text-body hover:text-primary transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-nav-link text-body hover:text-primary transition"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-sm md:flex">
          <a
            href="tel:+71234567890"
            className="inline-flex items-center gap-xs rounded-sm bg-primary px-lg py-sm text-button-sm font-medium text-on-primary transition hover:bg-primary-active"
          >
            <Phone size={16} />
            Позвонить
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-hairline bg-canvas px-base py-lg md:hidden">
          <nav className="flex flex-col gap-md">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-body-md text-ink hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-md text-ink hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="tel:+71234567890"
              className="mt-sm inline-flex items-center gap-xs rounded-sm bg-primary px-lg py-sm text-button-sm font-medium text-on-primary"
            >
              <Phone size={16} />
              Позвонить
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
