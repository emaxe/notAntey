"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/works", label: "Наши работы" },
  { href: "/price", label: "Прайс" },
  { href: "/features", label: "Наши фишки" },
  { href: "/certificates", label: "Сертификаты" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--color-surface)]/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--content-max-width)] items-center justify-between px-[var(--container-padding-x)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">
            КомпьютерщикЪ
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                "hover:text-[var(--color-primary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+74951234567"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-surface-hover)]"
          >
            <Phone className="h-4 w-4" />
            +7 (495) 123-45-67
          </a>
          <a
            href="https://t.me/max_username"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-inverse)] transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-md)]"
          >
            Написать в Max
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)]"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-[var(--color-surface)]">
          <nav className="flex flex-col gap-2 px-[var(--container-padding-x)] py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[var(--color-surface-hover)]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+74951234567"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium justify-center"
            >
              <Phone className="h-4 w-4" />
              +7 (495) 123-45-67
            </a>
            <a
              href="https://t.me/max_username"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-inverse)]"
            >
              Написать в Max
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
