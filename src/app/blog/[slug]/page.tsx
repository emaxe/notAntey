import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, Calendar, ArrowLeft, User } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import OrnamentalDivider from "@/components/OrnamentalDivider";

async function getBlogPost(slug: string) {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/blog/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Статья не найдена — КомпьютерщикЪ" };
  return {
    title: `${post.title} — КомпьютерщикЪ`,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <Link href="/blog" className="transition-colors hover:text-[var(--color-primary)]">
          Блог
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium truncate max-w-[200px] md:max-w-xs">
          {post.title}
        </span>
      </nav>

      {/* Cover */}
      {post.coverImage && (
        <div className="relative aspect-[21/9] overflow-hidden mb-8 border border-[var(--color-hairline)]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto">
        <h1
          className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          {post.title}
        </h1>
        <OrnamentalDivider className="mb-6 justify-start" />

        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[var(--color-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            КомпьютерщикЪ
          </span>
        </div>

        {post.excerpt && (
          <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-8 italic border-l-2 border-[var(--color-primary)] pl-4">
            {post.excerpt}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none text-[var(--color-body)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />

        {post.images && post.images.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {post.images.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-[4/3] overflow-hidden border border-[var(--color-hairline)]">
                <Image
                  src={img}
                  alt={`Изображение ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}
      </article>

      {/* Back */}
      <div className="mt-12 pt-8 border-t border-[var(--color-hairline)] max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться к блогу
        </Link>
      </div>
    </div>
  );
}
