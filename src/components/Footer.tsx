"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

const footerLinks = {
  pages: [
    { href: "/works", label: "Наши работы" },
    { href: "/price", label: "Прайс" },
    { href: "/features", label: "Наши фишки" },
    { href: "/certificates", label: "Сертификаты" },
  ],
  services: [
    { href: "/price", label: "Ремонт ноутбуков" },
    { href: "/price", label: "Ремонт MacBook" },
    { href: "/price", label: "Ремонт iPhone / iPad" },
    { href: "/price", label: "Сборка ПК под ключ" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-[var(--color-surface)] transition-colors duration-300">
      <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--container-padding-x)] py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)]">
              КомпьютерщикЪ
            </span>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Профессиональный ремонт техники с 2015 года. Оригинальные
              запчасти, гарантия, честные цены.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Разделы
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.pages.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href="tel:+74951234567"
                  className="text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href="mailto:info@kompyutershik.ru"
                  className="text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  info@kompyutershik.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  Москва, ул. Техническая, 42
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  Пн–Сб: 10:00 – 20:00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-center justify-between gap-4 px-[var(--container-padding-x)] py-6 sm:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} КомпьютерщикЪ. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-xs text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
