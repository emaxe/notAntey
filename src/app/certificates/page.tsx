import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, Shield } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

async function getCertificates() {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/certificates`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Сертификаты — КомпьютерщикЪ",
  description:
    "Официальная авторизация Apple, Microsoft, Samsung и ASUS. Сертифицированные инженеры с опытом от 5 лет и непрерывной практикой.",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium">Сертификаты</span>
      </nav>

      <h1
        className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Наши сертификаты
      </h1>
      <OrnamentalDivider className="mb-8 justify-start" />
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
        Мы работаем только официально. Все инженеры сертифицированы производителями
        и проходят ежегодное обучение. Это значит, что ваши гарантии остаются в силе.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert: any) => (
          <article
            key={cert.id}
            className="group flex flex-col overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface-card)] transition-all duration-300 hover:border-[var(--color-primary)]/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {cert.imageUrl ? (
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[var(--color-surface-soft)] text-sm text-[var(--color-muted-soft)]">
                  Нет фото
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 border bg-[var(--color-canvas)]/90 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                <Shield className="h-3.5 w-3.5" />
                Сертификат
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="mb-2 text-lg font-bold leading-snug text-[var(--color-ink)]">
                {cert.title}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {cert.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Добавлен: {new Date(cert.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted)]">
          <p className="text-lg">Сертификаты пока не добавлены</p>
          <p className="text-sm mt-2">Загляните позже — скоро обновим раздел</p>
        </div>
      )}
    </div>
  );
}
