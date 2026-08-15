"use client";

import { TrendingUp, Users, Award, Calendar } from "lucide-react";

const items = [
  { value: "12+", label: "лет на рынке", icon: Calendar },
  { value: "5000+", label: "успешных ремонтов", icon: TrendingUp },
  { value: "98%", label: "положительных отзывов", icon: Users },
  { value: "1 год", label: "максимальная гарантия", icon: Award },
];

export default function StatsSection() {
  return (
    <section className="bg-[var(--color-surface-soft)] py-section border-y border-[var(--color-hairline)]">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-4 md:divide-x md:divide-[var(--color-hairline)]">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isLastRowMobile = idx >= 2;
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-sm text-center px-2 py-4 md:px-6 md:py-0 ${
                  !isLastRowMobile ? "border-b border-[var(--color-hairline)] md:border-b-0" : ""
                }`}
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-surface-card)] rounded-[var(--radius-sm)] text-[var(--color-primary)]">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="text-3xl md:text-rating-display font-bold text-[var(--color-primary)] leading-none">
                  {item.value}
                </span>
                <span className="text-caption md:text-body-sm text-[var(--color-muted)] leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
