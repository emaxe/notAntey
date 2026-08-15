import Link from "next/link";
import {
  Home,
  Shield,
  Cpu,
  Zap,
  Search,
  Truck,
  HardDrive,
  Sparkles,
  FileCheck,
} from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

const iconMap: Record<string, any> = {
  Shield,
  Cpu,
  Zap,
  Search,
  Truck,
  HardDrive,
  Sparkles,
  FileCheck,
};

async function getFeatures() {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/features`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Наши фишки — КомпьютерщикЪ",
  description:
    "Честные цены, оригинальные запчасти, гарантия на всё, выезд мастера и бесплатная диагностика. Вот почему к нам возвращаются.",
};

export default async function FeaturesPage() {
  const features = await getFeatures();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium">Наши фишки</span>
      </nav>

      <h1
        className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Наши фишки
      </h1>
      <OrnamentalDivider className="mb-8 justify-start" />
      <p className="vintage-text-block mb-12 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
        То, за что нас выбирают и к чему возвращаются. Без пустых слов — только то,
        что реально работает на вашу пользу.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature: any) => (
          <div
            key={feature.id}
            className="flex flex-col border border-[var(--color-hairline)] bg-[var(--color-surface-card)] rounded-[var(--radius-md)] p-6 transition-all duration-300 hover:border-[var(--color-primary)]/40"
          >
            {feature.mediaUrl ? (
              <div className="mb-4 h-12 w-12 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={feature.mediaUrl} alt="" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border bg-[var(--color-surface-soft)]">
                {(() => {
                  const Icon = iconMap[feature.icon] || Shield;
                  return <Icon className="h-6 w-6 text-[var(--color-primary)]" />;
                })()}
              </div>
            )}
            <h2 className="mb-2 text-lg font-bold leading-snug text-[var(--color-ink)]">{feature.title}</h2>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {features.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted)]">
          <p className="text-lg">Фишки пока не заполнены</p>
          <p className="text-sm mt-2">Загляните позже — мы расскажем, почему мы лучшие</p>
        </div>
      )}
    </div>
  );
}
