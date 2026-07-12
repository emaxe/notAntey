import ServiceCard from "@/components/ServiceCard";
import { Monitor, Laptop, Smartphone, Tablet, ArrowRight } from "lucide-react";
import Link from "next/link";
import OrnamentalDivider from "./OrnamentalDivider";

export default function ServicesSection() {
  const services = [
    {
      icon: <Monitor size={24} />,
      title: "Ремонт компьютеров",
      description: "Диагностика, чистка, замена комплектующих, сборка и апгрейд.",
      href: "/price",
    },
    {
      icon: <Laptop size={24} />,
      title: "Ремонт ноутбуков",
      description: "Замена матрицы, клавиатуры, батареи, ремонт корпуса и портов.",
      href: "/price",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Apple ремонт",
      description: "iPhone, iPad, MacBook, iMac — оригинальные запчасти и прошивка ПО.",
      href: "/price",
    },
    {
      icon: <Tablet size={24} />,
      title: "Планшеты и гаджеты",
      description: "Замена сенсоров, дисплеев, батарей, ремонт разъёмов и портов.",
      href: "/price",
    },
  ];

  return (
    <section id="services" className="px-4 md:px-8 lg:px-12 xl:px-16 py-section bg-[var(--color-canvas)]">
      <div className="mx-auto max-w-container-lg">
        <div className="mb-xl flex flex-col items-center text-center">
          <h2
            className="text-display-lg font-bold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display), serif" }}
          >
            Наши услуги
          </h2>
          <OrnamentalDivider className="mt-sm mb-sm" />
          <p className="text-body-md text-[var(--color-muted)] max-w-container-sm">
            Ремонт любой сложности с гарантией — от замены экрана до сложного повреждения материнской платы.
          </p>
          <Link
            href="/price"
            className="mt-lg inline-flex items-center gap-xs text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-active)] group"
          >
            Смотреть все цены
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
