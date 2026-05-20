import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas px-base py-section">
      <div className="mx-auto max-w-container-lg">
        <div className="grid gap-xl md:grid-cols-3">
          <div>
            <h4 className="text-title-sm font-semibold text-ink mb-sm">КомпьютерщикЪ</h4>
            <p className="text-body-sm text-muted">
              Профессиональный сервисный центр ремонта цифровой техники.
              Гарантия, оригинальные запчасти, выезд мастера.
            </p>
          </div>

          <div>
            <h4 className="text-title-sm font-semibold text-ink mb-sm">Услуги</h4>
            <ul className="flex flex-col gap-xs text-body-sm text-muted">
              <li><Link href="/" className="hover:text-primary transition">Ремонт компьютеров</Link></li>
              <li><Link href="/" className="hover:text-primary transition">Ремонт ноутбуков</Link></li>
              <li><Link href="/" className="hover:text-primary transition">Apple ремонт</Link></li>
              <li><Link href="/" className="hover:text-primary transition">Планшеты и гаджеты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-title-sm font-semibold text-ink mb-sm">Контакты</h4>
            <ul className="flex flex-col gap-xs text-body-sm text-muted">
              <li>Тел: <a href="tel:+71234567890" className="text-ink hover:text-primary transition">+7 (123) 456-78-90</a></li>
              <li>Telegram: <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-primary transition">@username</a></li>
              <li>Адрес: г. Москва, ул. Примерная, 1</li>
              <li>Часы работы: ежедневно 10:00–20:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-xl border-t border-hairline-soft pt-lg text-center text-caption-sm text-muted-soft">
          © {new Date().getFullYear()} КомпьютерщикЪ. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
