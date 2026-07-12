import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Briefcase, Tag, Star, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "Dashboard | notAntey Admin",
};

export default async function AdminDashboardPage() {
  const [posts, categories, features, certificates, blogPosts] = await Promise.all([
    prisma.post.count(),
    prisma.priceCategory.count(),
    prisma.feature.count(),
    prisma.certificate.count(),
    prisma.blogPost.count(),
  ]);

  const cards = [
    { href: "/admin/posts", label: "Наши работы", count: posts, icon: Briefcase },
    { href: "/admin/price", label: "Прайс-лист", count: categories, icon: Tag },
    { href: "/admin/features", label: "Фишки", count: features, icon: Star },
    { href: "/admin/certificates", label: "Сертификаты", count: certificates, icon: Award },
    { href: "/admin/blog", label: "Блог", count: blogPosts, icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Обзор</h1>
        <p className="text-sm text-zinc-500 mt-1">Быстрый доступ к разделам админ-панели</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group block rounded-xl bg-white p-6 border border-zinc-200 shadow-sm transition hover:shadow-md hover:border-zinc-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold text-zinc-900">{card.count}</span>
              </div>
              <div className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition">
                {card.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl bg-white border border-zinc-200 p-6">
        <h3 className="text-sm font-semibold text-zinc-900 mb-2">Быстрые действия</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition"
          >
            <Briefcase className="h-4 w-4" />
            Добавить работу
          </Link>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900 transition"
          >
            <BookOpen className="h-4 w-4" />
            Новая статья
          </Link>
          <Link
            href="/admin/price"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            <Tag className="h-4 w-4" />
            Изменить прайс
          </Link>
        </div>
      </div>
    </div>
  );
}
