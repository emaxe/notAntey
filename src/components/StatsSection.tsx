"use client";

export default function StatsSection() {
  const items = [
    { value: "12+", label: "лет на рынке" },
    { value: "5000+", label: "успешных ремонтов" },
    { value: "98%", label: "положительных отзывов" },
    { value: "1 год", label: "максимальная гарантия" },
  ];

  return (
    <section className="bg-surface-soft px-base py-section">
      <div className="mx-auto max-w-container-lg">
        <div className="grid grid-cols-2 gap-lg md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-xs text-center">
              <span className="text-rating-display font-bold text-primary">{item.value}</span>
              <span className="text-body-sm text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
