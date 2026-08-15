"use client";

import { Phone, MessageCircle, ShieldCheck, Wrench, Truck, ArrowRight } from "lucide-react";
import OrnamentalDivider from "./OrnamentalDivider";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-canvas)] hero-dot-pattern px-4 md:px-8 lg:px-12 xl:px-16 py-section md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-container-lg">
        <div className="flex flex-col items-center gap-lg md:w-2/3 lg:w-3/5 mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[var(--color-hairline)] bg-[var(--color-surface-card)] rounded-[var(--radius-sm)] px-4 py-1.5 text-sm font-semibold text-[var(--color-primary)]">
            <ShieldCheck className="h-4 w-4" />
            Гарантия до 12 месяцев
          </div>

          <h1
            className="text-display-xl md:text-display-xl lg:text-[46px] font-bold text-[var(--color-ink)] leading-[1.15]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Профессиональный ремонт компьютеров и гаджетов
          </h1>

          <OrnamentalDivider />

          <p className="text-body-md md:text-lg text-[var(--color-muted)] max-w-container-sm leading-relaxed">
            Сервисный центр «КомпьютерщикЪ» — ремонт ноутбуков, планшетов,
            моноблоков и техники Apple с гарантией до 12 месяцев.
            Сертифицированные мастера и оригинальные запчасти.
          </p>

          <div className="flex flex-wrap gap-sm justify-center">
            <a
              href="tel:+71234567890"
              className="inline-flex items-center gap-xs bg-[var(--color-primary)] rounded-[var(--radius-lg)] px-xl py-sm text-button-md font-medium text-white transition hover:bg-[var(--color-primary-active)] hover:shadow-md"
              data-testid="hero-call-button"
            >
              <Phone size={18} />
              Позвонить
            </a>
            <a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-xs border border-[var(--color-ink)] bg-[var(--color-canvas)] rounded-[var(--radius-lg)] px-xl py-sm text-button-md font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-surface-soft)] group"
            >
              <MessageCircle size={18} />
              Написать в Telegram
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-sm flex flex-wrap gap-xl justify-center">
            <div className="flex items-center gap-xs text-caption text-[var(--color-muted)]">
              <ShieldCheck size={18} className="text-[var(--color-primary)] shrink-0" />
              Гарантия до 12 мес.
            </div>
            <div className="flex items-center gap-xs text-caption text-[var(--color-muted)]">
              <Wrench size={18} className="text-[var(--color-primary)] shrink-0" />
              Сертифицированные мастера
            </div>
            <div className="flex items-center gap-xs text-caption text-[var(--color-muted)]">
              <Truck size={18} className="text-[var(--color-primary)] shrink-0" />
              Выезд и диагностика
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
