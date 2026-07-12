import Link from "next/link";
import { Phone, MapPin, Mail, Clock, ArrowUpRight } from "lucide-react";
import OrnamentalDivider from "./OrnamentalDivider";

const footerLinks = {
  pages: [
    { href: "/works", label: "Наши работы" },
    { href: "/price", label: "Прайс" },
    { href: "/features", label: "Наши фишки" },
    { href: "/certificates", label: "Сертификаты" },
    { href: "/blog", label: "Блог" },
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
    <footer className="border-t bg-[var(--color-surface-soft)] transition-colors duration-300">
      <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                className="text-xl md:text-2xl tracking-tight text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display), serif" }}
              >
                КомпьютерщикЪ
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Профессиональный ремонт техники с 2015 года. Оригинальные
              запчасти, гарантия, честные цены.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              Разделы
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.pages.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-primary)] group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-primary)] group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-ink)]">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href="tel:+74951234567"
                  className="text-sm text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <a
                  href="mailto:info@kompyutershik.ru"
                  className="text-sm text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  info@kompyutershik.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-muted)]">
                  Москва, ул. Техническая, 42
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                <span className="text-sm text-[var(--color-muted)]">
                  Пн–Сб: 10:00 – 20:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        <OrnamentalDivider className="mt-12 mb-8" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-hairline)]">
        <div className="mx-auto flex max-w-container-lg flex-col items-center justify-between gap-4 px-4 md:px-8 lg:px-12 xl:px-16 py-6 sm:flex-row">
          <p className="text-xs text-[var(--color-muted-soft)]">
            © {new Date().getFullYear()} КомпьютерщикЪ. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
          <span
            className="text-xs text-[var(--color-muted-soft)] cursor-default"
          >
            Политика конфиденциальности
          </span>
          <span
            className="text-xs text-[var(--color-muted-soft)] cursor-default"
          >
            Условия использования
          </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
