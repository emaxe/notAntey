import ServiceCard from "@/components/ServiceCard";
import { Monitor, Laptop, Smartphone, Tablet } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Monitor size={24} />,
      title: "Ремонт компьютеров",
      description: "Диагностика, чистка, замена комплектующих, сборка и апгрейд.",
    },
    {
      icon: <Laptop size={24} />,
      title: "Ремонт ноутбуков",
      description: "Замена матрицы, клавиатуры, батареи, ремонт корпуса и портов.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Apple ремонт",
      description: "iPhone, iPad, MacBook, iMac — оригинальные запчасти и прошивка ПО.",
    },
    {
      icon: <Tablet size={24} />,
      title: "Планшеты и гаджеты",
      description: "Замена сенсоров, дисплеев, батарей, ремонт разъёмов и портов.",
    },
  ];

  return (
    <section id="services" className="px-base py-section">
      <div className="mx-auto max-w-container-lg">
        <div className="mb-xl text-center">
          <h2 className="text-display-lg font-bold text-ink">Наши услуги</h2>
          <p className="mt-sm text-body-md text-muted">Ремонт любой сложности с гарантией</p>
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
