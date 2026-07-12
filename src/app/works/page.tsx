import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, Tag } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

async function getWorks() {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/posts`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.posts || [];
}

export const metadata = {
  title: "Наши работы — КомпьютерщикЪ",
  description:
    "Реальные кейсы по ремонту ноутбуков, MacBook, iPhone и сборке ПК. Фото до и после.",
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium">Наши работы</span>
      </nav>

      <h1
        className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Наши работы
      </h1>
      <OrnamentalDivider className="mb-8 justify-start" />
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
        Реальные кейсы — от замены матрицы MacBook до спасения ноутбука после залития.
        Каждый проект с фото, описанием и сроками.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work: any) => (
          <article
            key={work.id}
            className="group flex flex-col overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface-card)] transition-all duration-300 hover:border-[var(--color-primary)]/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {work.images?.[0] ? (
                <Image
                  src={work.images[0]}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[var(--color-surface-soft)] text-sm text-[var(--color-muted-soft)]">
                  Нет фото
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 border bg-[var(--color-canvas)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
                  <Tag className="h-3 w-3" />
                  {work.source || "работа"}
                </span>
              </div>
              <h2 className="mb-2 text-lg font-bold leading-snug text-[var(--color-ink)]">{work.title}</h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
                {work.excerpt || work.content}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(work.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </article>
        ))}
      </div>

      {works.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted)]">
          <p className="text-lg">Пока нет опубликованных работ</p>
          <p className="text-sm mt-2">Загляните позже — скоро добавим новые кейсы</p>
        </div>
      )}
    </div>
  );
}
