import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import { Phone, MessageCircle, MapPin, Clock, ArrowRight, ShieldCheck, Truck, Wrench } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "КомпьютерщикЪ",
            description: "Ремонт компьютеров и техники в Москве",
            telephone: "+7-495-123-45-67",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
            areaServed: "Москва",
            priceRange: "$$",
          }),
        }}
      />
      <HeroSection />
      <StatsSection />
      <ServicesSection />

      {/* Why Us / Trust section */}
      <section className="bg-[var(--color-surface-soft)] px-4 md:px-8 lg:px-12 xl:px-16 py-section">
        <div className="mx-auto max-w-container-lg">
          <div className="mb-xl text-center">
            <h2
              className="text-display-lg font-bold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Почему выбирают нас
            </h2>
            <OrnamentalDivider className="mt-sm mb-sm" />
            <p className="mt-sm text-body-md text-[var(--color-muted)] max-w-container-sm mx-auto">
              12 лет опыта, тысячи довольных клиентов и честный подход к каждому ремонту
            </p>
          </div>
          <div className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <ShieldCheck size={28} />, title: "Гарантия до 1 года", desc: "На все виды работ и запчасти. Честная гарантия без скрытых условий." },
              { icon: <Wrench size={28} />, title: "Сертифицированные мастера", desc: "Инженеры с опытом от 5 лет и официальной сертификацией Apple, Microsoft, Samsung." },
              { icon: <Truck size={28} />, title: "Выезд и диагностика", desc: "Приедем к вам домой или в офис. Диагностика бесплатна при последующем ремонте." },
              { icon: <Clock size={28} />, title: "Ремонт от 30 минут", desc: "Большинство работ выполняем в день обращения. Запчасти в наличии." },
              { icon: <MessageCircle size={28} />, title: "Прозрачная коммуникация", desc: "Фото и видео процесса ремонта. Предварительное согласование стоимости." },
              { icon: <MapPin size={28} />, title: "Удобное расположение", desc: "Москва, ул. Техническая, 42. Работаем Пн–Сб: 10:00 – 20:00." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-sm ornate-border p-lg transition-all duration-300 hover:border-[var(--color-primary)]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  {item.icon}
                </div>
                <h3 className="text-title-md font-semibold text-[var(--color-ink)]">{item.title}</h3>
                <p className="text-body-sm text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 lg:px-12 xl:px-16 py-section bg-[var(--color-canvas)]">
        <div className="mx-auto max-w-container-lg">
          <div className="flex flex-col items-center text-center gap-lg ornate-border p-8 md:p-12">
            <h2
              className="text-display-lg font-bold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display), serif" }}
            >
              Готовы отдать технику в надёжные руки?
            </h2>
            <OrnamentalDivider />
            <p className="text-body-md text-[var(--color-muted)] max-w-container-sm">
              Оставьте заявку прямо сейчас — мастер свяжется с вами в течение 15 минут для уточнения деталей и предварительной оценки стоимости ремонта.
            </p>
            <div className="flex flex-wrap gap-sm justify-center">
              <a
                href="tel:+74951234567"
                className="inline-flex items-center gap-xs bg-[var(--color-primary)] rounded-[var(--radius-lg)] px-xl py-sm text-button-md font-medium text-white transition hover:bg-[var(--color-primary-active)] hover:shadow-md"
              >
                <Phone size={18} />
                Позвонить
              </a>
              <a
                href="https://t.me/max_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-xs border border-[var(--color-ink)] bg-[var(--color-canvas)] rounded-[var(--radius-lg)] px-xl py-sm text-button-md font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-surface-soft)] group"
              >
                <MessageCircle size={18} />
                Написать в Telegram
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="flex flex-wrap gap-lg justify-center text-caption text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-xs">
                <ShieldCheck size={16} className="text-[var(--color-primary)]" />
                Гарантия до 12 мес.
              </span>
              <span className="inline-flex items-center gap-xs">
                <Clock size={16} className="text-[var(--color-primary)]" />
                Ремонт от 30 минут
              </span>
              <span className="inline-flex items-center gap-xs">
                <Wrench size={16} className="text-[var(--color-primary)]" />
                Оригинальные запчасти
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
