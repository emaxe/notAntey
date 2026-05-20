export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-lg px-base">
      <h1 className="text-display-xl font-bold text-ink">
        КомпьютерщикЪ
      </h1>
      <p className="text-body-md text-muted max-w-container-sm text-center">
        Сервисный центр профессионального ремонта компьютеров, ноутбуков и техники Apple.
        MVP страница в разработке.
      </p>
      <a
        href="tel:+71234567890"
        className="inline-flex items-center justify-center rounded-sm bg-primary px-xl py-sm text-button-md font-medium text-on-primary transition hover:bg-primary-active"
      >
        Позвонить
      </a>
    </main>
  );
}
