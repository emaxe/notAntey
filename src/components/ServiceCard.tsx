import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
          {icon}
        </div>
        <ArrowUpRight className="h-5 w-5 text-[var(--color-muted)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[var(--color-primary)]" />
      </div>
      <h3 className="text-title-md font-semibold text-[var(--color-ink)]">{title}</h3>
      <p className="text-body-sm text-[var(--color-muted)] leading-relaxed">{description}</p>
    </>
  );

  if (!href) {
    return (
      <div className="group flex flex-col gap-sm ornate-border p-lg transition-all duration-300 hover:border-[var(--color-primary)]/40">
        {body}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-sm ornate-border p-lg transition-all duration-300 hover:border-[var(--color-primary)]/40"
    >
      {body}
    </Link>
  );
}
