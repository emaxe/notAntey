"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import FanLogo from "./FanLogo";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/works", label: "Наши работы" },
  { href: "/price", label: "Прайс" },
  { href: "/features", label: "Наши фишки" },
  { href: "/certificates", label: "Сертификаты" },
  { href: "/blog", label: "Блог" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-200",
          scrolled
            ? "bg-[var(--nav-bg)] border-[var(--color-hairline)] shadow-sm"
            : "bg-[var(--nav-bg)] border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 lg:h-20 items-center justify-between px-4 md:px-6 lg:px-8 xl:px-12 max-w-container-lg">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={closeMenu}>
            <FanLogo size={34} />
            <div className="flex flex-col leading-none">
              <span
                className="text-lg lg:text-xl xl:text-2xl tracking-tight text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                КомпьютерщикЪ
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted-soft)] mt-0.5 hidden sm:block">
                Сервисный центр
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-[1.5px] bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:+74951234567"
              className="inline-flex items-center gap-2 border border-[var(--color-hairline)] px-3 py-2 text-xs xl:text-sm font-medium text-[var(--color-body)] hover:bg-[var(--color-surface-soft)] transition-colors whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-[var(--color-primary)]" />
              <span className="hidden xl:inline">+7 (495) 123-45-67</span>
            </a>
            <a
              href="https://t.me/max_username"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2.5 text-xs xl:text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-active)] transition-colors whitespace-nowrap"
            >
              Написать в Max
            </a>
          </div>

          {/* Mobile Burger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden relative z-50 inline-flex h-10 w-10 items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-surface-card)] rounded-[var(--radius-sm)] active:bg-[var(--color-surface-soft)] cursor-pointer select-none touch-manipulation"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-[var(--color-ink)]" />
            ) : (
              <Menu className="h-5 w-5 text-[var(--color-ink)]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 top-full bg-[var(--nav-bg)] border-b border-[var(--color-hairline)] z-50 overflow-hidden transition-all duration-300 ease-out",
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-1 px-4 py-4 max-w-container-lg mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="px-4 py-3 text-base font-medium text-[var(--color-body)] hover:bg-[var(--color-surface-soft)] active:bg-[var(--color-surface-strong)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-hairline-soft)] pt-3">
              <a
                href="tel:+74951234567"
                className="inline-flex items-center gap-2 border border-[var(--color-hairline)] rounded-[var(--radius-sm)] px-4 py-3 text-sm font-medium text-[var(--color-body)] justify-center hover:bg-[var(--color-surface-soft)]"
              >
                <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                +7 (495) 123-45-67
              </a>
              <a
                href="https://t.me/max_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-active)]"
              >
                Написать в Max
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-[var(--color-scrim)]/[var(--scrim-opacity)]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
