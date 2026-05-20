import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ icon, title, description, href = "#" }: ServiceCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-sm rounded-md border border-hairline bg-surface-card p-lg transition hover:border-primary hover:shadow-float"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-surface-soft text-primary transition group-hover:bg-primary group-hover:text-on-primary">
        {icon}
      </div>
      <h3 className="text-title-md font-semibold text-ink">{title}</h3>
      <p className="text-body-sm text-muted">{description}</p>
    </a>
  );
}
