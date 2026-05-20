import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import works from "@/data/works.json";

export const metadata = {
  title: "Наши работы — КомпьютерщикЪ",
  description: "Реальные кейсы по ремонту ноутбуков, MacBook, iPhone и сборке ПК. Фото до и после.",
};

export default function WorksPage() {
  return (
    <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--container-padding-x)] py-12 md:py-20">
      {/* Breadcrumb */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-opacity hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        Наши работы
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-text-muted)]">
        Реальные кейсы — от замены матрицы MacBook до спасения ноутбука после залития.
        Каждый проект с фото, описанием и сроками.
      </p>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <article
            key={work.id}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mb-2 text-lg font-bold leading-snug">{work.title}</h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {work.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(work.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
