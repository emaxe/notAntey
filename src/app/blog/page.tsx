import Image from "next/image";
import Link from "next/link";
import { Home, Calendar, ArrowRight } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

async function getBlogPosts() {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/blog`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.posts || [];
}

export const metadata = {
  title: "Блог — КомпьютерщикЪ",
  description:
    "Полезные статьи, советы по ремонту техники, обзоры и новости из мира IT.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium">Блог</span>
      </nav>

      <h1
        className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Блог
      </h1>
      <OrnamentalDivider className="mb-8 justify-start" />
      <p className="vintage-text-block mb-12 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
        Полезные статьи, советы по ремонту техники, обзоры и новости из мира IT.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface-card)] transition-all duration-300 hover:border-[var(--color-primary)]/40"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[var(--color-surface-soft)] text-sm text-[var(--color-muted-soft)]">
                  Без обложки
                </div>
              )}
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="mb-2 text-lg font-bold leading-snug text-[var(--color-ink)]">
                <Link href={`/blog/${post.slug}`} className="hover:text-[var(--color-primary)] transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)] line-clamp-3">
                {post.excerpt || post.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  Читать
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted)]">
          <p className="text-lg">Пока нет опубликованных статей</p>
          <p className="text-sm mt-2">Загляните позже — скоро добавим новые материалы</p>
        </div>
      )}
    </div>
  );
}
