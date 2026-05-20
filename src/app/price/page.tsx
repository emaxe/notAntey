import Link from "next/link";
import { ArrowLeft, Clock, Tag, Info } from "lucide-react";
import priceData from "@/data/price.json";

export const metadata = {
  title: "Прайс — КомпьютерщикЪ",
  description: "Актуальные цены на ремонт ноутбуков, компьютеров, Apple, планшетов и выезд мастера. Прозрачное ценообразование, без скрытых доплат.",
};

export default function PricePage() {
  return (
    <div className="mx-auto max-w-[var(--content-max-width)] px-[var(--container-padding-x)] py-12 md:py-20">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-opacity hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" />
        На главную
      </Link>

      <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
        Прайс
      </h1>
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-text-muted)]">
        Прозрачные цены без скрытых доплат. Диагностика бесплатна, если делаете ремонт у нас.
        Сроки указаны ориентировочно и зависят от наличия запчастей.
      </p>

      <div className="space-y-12">
        {priceData.map((category) => (
          <section key={category.category}>
            <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">
              {category.category}
            </h2>
            <div className="overflow-hidden rounded-2xl border bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-[var(--color-surface-hover)]">
                    <tr>
                      <th className="px-5 py-3.5 font-semibold">Услуга</th>
                      <th className="px-5 py-3.5 font-semibold">Цена</th>
                      <th className="px-5 py-3.5 font-semibold">Срок</th>
                      <th className="px-5 py-3.5 font-semibold">Примечание</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {category.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="transition-colors duration-200 hover:bg-[var(--color-surface-hover)]"
                      >
                        <td className="px-5 py-4 font-medium">{item.name}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-sm font-semibold text-[var(--color-primary)]">
                            <Tag className="h-3.5 w-3.5" />
                            {item.price.toLocaleString("ru-RU")} ₽
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-[var(--color-text-muted)]">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {item.duration}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[var(--color-text-muted)]">
                          <span className="inline-flex items-start gap-1">
                            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {item.note}
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

      <div className="mt-12 rounded-2xl border bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)] md:p-8">
        <h3 className="mb-2 text-lg font-bold">Не нашли нужную услугу?</h3>
        <p className="mb-4 text-[var(--color-text-muted)]">
          Свяжитесь с нами — мы рассчитаем стоимость ремонта вашего устройства индивидуально.
        </p>
        <a
          href="https://t.me/max_username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-inverse)] transition-all duration-200 hover:opacity-90 hover:shadow-[var(--shadow-md)]"
        >
          Написать в Max
        </a>
      </div>
    </div>
  );
}
