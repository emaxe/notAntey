import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ComponentType, CSSProperties } from "react";
import {
  Shield,
  Cpu,
  Zap,
  Search,
  Truck,
  HardDrive,
  Sparkles,
  FileCheck,
} from "lucide-react";
import features from "@/data/features.json";

const iconMap: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  Shield,
  Cpu,
  Zap,
  Search,
  Truck,
  HardDrive,
  Sparkles,
  FileCheck,
};

export const metadata = {
  title: "Наши фишки — КомпьютерщикЪ",
  description:
    "Честные цены, оригинальные запчасти, гарантия на всё, выезд мастера и бесплатная диагностика. Вот почему к нам возвращаются.",
};

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--container-padding-x)] py-12 md:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-opacity hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        Наши фишки
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-text-muted)]">
        То, за что нас выбирают и к чему возвращаются. Без пустых слов — только то,
        что реально работает на вашу пользу.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon] || Shield;
          return (
            <div
              key={feature.id}
              className="flex flex-col rounded-2xl border bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
            >
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    feature.accent === "accent"
                      ? "var(--color-accent)"
                      : "var(--color-primary-ghost)",
                }}
              >
                <Icon
                  className="h-6 w-6"
                  style={{
                    color:
                      feature.accent === "accent"
                        ? "var(--color-primary)"
                        : "var(--color-primary)",
                  }}
                />
              </div>
              <h2 className="mb-2 text-lg font-bold leading-snug">
                {feature.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
