"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Tag,
  Star,
  Award,
  BookOpen,
  LogOut,
  Home,
  Wrench,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Главная", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Наши работы", icon: Briefcase },
  { href: "/admin/price", label: "Прайс-лист", icon: Tag },
  { href: "/admin/features", label: "Фишки", icon: Star },
  { href: "/admin/certificates", label: "Сертификаты", icon: Award },
  { href: "/admin/blog", label: "Блог", icon: BookOpen },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle =
    navItems.find((item) => item.href === pathname)?.label || "Админ-панель";

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-64 bg-zinc-900 text-zinc-300 flex flex-col fixed inset-y-0 left-0 z-40",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between gap-3 px-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-rose-600 text-white">
              <Wrench className="h-4 w-4" />
            </div>
            <span className="font-semibold text-white">Админка</span>
          </div>
          {/* Close button — only visible on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-zinc-400 hover:text-white transition"
            aria-label="Закрыть меню"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-zinc-800 text-white"
                    : "hover:bg-zinc-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-zinc-800 p-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-zinc-800 hover:text-white"
          >
            <Home className="h-5 w-5 shrink-0" />
            На сайт
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-zinc-800 hover:text-white text-zinc-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-zinc-600 hover:text-zinc-900 transition"
              aria-label="Открыть меню"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold text-zinc-800">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 hidden sm:inline">
              {userEmail}
            </span>
            <div className="h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-semibold">
              {userEmail.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
