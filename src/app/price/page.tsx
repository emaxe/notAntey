import Link from "next/link";
import { Home, Tag, ArrowRight } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

async function getPrice() {
  const API_BASE = process.env.APP_URL || '';
  const res = await fetch(`${API_BASE}/api/price`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = {
  title: "Прайс — КомпьютерщикЪ",
  description:
    "Актуальные цены на ремонт ноутбуков, компьютеров, Apple, планшетов и выезд мастера. Прозрачное ценообразование, без скрытых доплат.",
};

export default async function PricePage() {
  const priceData = await getPrice();

  return (
    <div className="mx-auto max-w-container-lg px-4 md:px-8 lg:px-12 xl:px-16 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[var(--color-muted)]">
        <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--color-primary)]">
          <Home className="h-4 w-4" />
          Главная
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink)] font-medium">Прайс</span>
      </nav>

      <h1
        className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Прайс
      </h1>
      <OrnamentalDivider className="mb-8 justify-start" />
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-muted)] leading-relaxed">
        Прозрачные цены без скрытых доплат. Диагностика бесплатна, если делаете ремонт у нас.
        Сроки указаны ориентировочно и зависят от наличия запчастей.
      </p>

      <div className="space-y-12">
        {priceData.map((category: any) => (
          <section key={category.id}>
            <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl text-[var(--color-ink)]">
              {category.name}
            </h2>
            <div className="overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface-card)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)]">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold text-[var(--color-ink)]">Услуга</th>
                      <th className="px-5 py-3.5 font-semibold text-[var(--color-ink)] text-right">Цена</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-hairline)]">
                    {category.items.map((item: any) => (
                      <tr
                        key={item.id}
                        className="transition-colors duration-200 hover:bg-[var(--color-surface-soft)]"
                      >
                        <td className="px-5 py-4 font-medium text-[var(--color-ink)]">{item.name}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          <span className="inline-flex items-center gap-1 border bg-[var(--color-canvas)] px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
                            <Tag className="h-3.5 w-3.5" />
                            {item.price.toLocaleString("ru-RU")} {item.unit || "₽"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ))}
      </div>

      {priceData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--color-muted)]">
          <p className="text-lg">Прайс пока не заполнен</p>
          <p className="text-sm mt-2">Свяжитесь с нами для уточнения стоимости</p>
        </div>
      )}

      <div className="mt-12 border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-6 md:p-8">
        <h3 className="mb-2 text-lg font-bold text-[var(--color-ink)]">Не нашли нужную услугу?</h3>
        <p className="mb-4 text-[var(--color-muted)]">
          Свяжитесь с нами — мы рассчитаем стоимость ремонта вашего устройства индивидуально.
        </p>
        <a
          href="https://t.me/max_username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition-all duration-200 hover:opacity-90 group"
        >
          Написать в Max
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
