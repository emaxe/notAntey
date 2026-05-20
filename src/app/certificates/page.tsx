import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Shield } from "lucide-react";
import certificates from "@/data/certificates.json";

export const metadata = {
  title: "Сертификаты — КомпьютерщикЪ",
  description:
    "Официальная авторизация Apple, Microsoft, Samsung и ASUS. Сертифицированные инженеры с опытом от 5 лет и непрерывной практикой.",
};

export default function CertificatesPage() {
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
        Наши сертификаты
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-text-muted)]">
        Мы работаем только официально. Все инженеры сертифицированы производителями
        и проходят ежегодное обучение. Это значит, что ваши гарантии остаются в силе.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <article
            key={cert.id}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[var(--color-primary)] backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5" />
                {cert.issuer}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="mb-2 text-lg font-bold leading-snug">
                {cert.title}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {cert.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Получен: {cert.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Действует до: {cert.validUntil}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
