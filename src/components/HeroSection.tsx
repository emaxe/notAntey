"use client";

import { Phone, MessageCircle, ShieldCheck, Wrench, Truck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-base py-section">
      <div className="mx-auto max-w-container-lg">
        <div className="flex flex-col items-start gap-lg md:w-2/3">
          <h1 className="text-display-xl md:text-display-xl text-ink">
            Профессиональный ремонт компьютеров и гаджетов
          </h1>
          <p className="text-body-md text-muted max-w-container-sm">
            Сервисный центр «КомпьютерщикЪ» — ремонт ноутбуков, планшетов,
            моноблоков и техники Apple с гарантией до 12 месяцев.
            Сертифицированные мастера и оригинальные запчасти.
          </p>

          <div className="flex flex-wrap gap-sm">
            <a
              href="tel:+71234567890"
              className="inline-flex items-center gap-xs rounded-sm bg-primary px-xl py-sm text-button-md font-medium text-on-primary transition hover:bg-primary-active hover:shadow-float"
              data-testid="hero-call-button"
            >
              <Phone size={18} />
              Позвонить
            </a>
            <a
              href="https://t.me/username"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-xs rounded-sm border border-ink bg-canvas px-xl py-sm text-button-md font-medium text-ink transition hover:bg-surface-soft"
            >
              <MessageCircle size={18} />
              Написать в Telegram
            </a>
          </div>

          <div className="mt-sm flex flex-wrap gap-xl">
            <div className="flex items-center gap-xs text-caption text-muted">
              <ShieldCheck size={18} className="text-primary" />
              Гарантия до 12 мес.
            </div>
            <div className="flex items-center gap-xs text-caption text-muted">
              <Wrench size={18} className="text-primary" />
              Сертифицированные мастера
            </div>
            <div className="flex items-center gap-xs text-caption text-muted">
              <Truck size={18} className="text-primary" />
              Выезд и диагностика
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
