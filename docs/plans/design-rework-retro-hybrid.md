# План переработки дизайна сайта «КомпьютерщикЪ» в ретро-гибридный стиль

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Перевести публичную часть сайта (не /admin) на дизайн в стиле визиток «КомпьютерщикЪ»: ретро-гибрид — основа из пергаментных тонов, орнаментальные рамки, псевдостарославянская типографика для заголовков, RGB-вентилятор как акцент, маскот-мастер. Админ-панель остаётся без изменений.

**Architecture:** CSS Custom Properties каскадируют. Сохраняем текущие имена токенов, но переопределяем значения внутри `.retro-theme`. `SiteShell` оборачивает публичные страницы в `<div className="retro-theme">`, таким образом админка не получает переопределения. Добавляем Google-шрифт Ruslan Display через `next/font/google` для заголовков. Орнаменты — лёгкие inline SVG-компоненты.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript, CSS Custom Properties, `next/font/google`.

---

## Task 1: Создать `retro-theme.css` с переопределением токенов

**Objective:** Создать CSS-файл, который в рамках `.retro-theme` переопределяет цвета, шрифты и тени на ретро-палитру, не трогая `:root` (админка).

**Files:**
- Create: `src/styles/retro-theme.css`
- Modify: `src/app/globals.css` (добавить импорт)

**Step 1: Создать файл стилей**

```css
/* src/styles/retro-theme.css */

.retro-theme {
  /* === Brand & Accent === */
  --color-primary: #5e2d79;
  --color-primary-active: #4a1d61;
  --color-primary-disabled: #d8c4e0;
  --color-primary-error-text: #9a2b2b;
  --color-primary-error-text-hover: #7a1f1f;

  /* === Surface === */
  --color-canvas: #f5f0e6;
  --color-surface-soft: #ece5d8;
  --color-surface-card: #fdfbf7;
  --color-surface-strong: #e3dbd0;

  /* === Hairlines & Borders === */
  --color-hairline: #c9bfb0;
  --color-hairline-soft: #ddd5c8;
  --color-border-strong: #a89a88;

  /* === Text === */
  --color-ink: #1c120b;
  --color-body: #3d3028;
  --color-muted: #6b5e52;
  --color-muted-soft: #8a7d70;
  --color-star-rating: #1c120b;
  --color-on-primary: #ffffff;
  --color-on-dark: #ffffff;
  --color-legal-link: #5e2d79;

  /* === Shadows (убираем размытие, делаем тёплые плоские тени) === */
  --shadow-float:
    0 1px 0 0 rgba(28, 18, 11, 0.08),
    0 4px 12px 0 rgba(28, 18, 11, 0.10);

  /* === Typography === */
  --font-display: 'Ruslan Display', 'Georgia', serif;

  /* === Radius (меньше округлости, ближе к визитке) === */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;

  /* === Component specifics === */
  --button-primary-bg: var(--color-primary);
  --button-primary-text: var(--color-on-primary);
  --nav-bg: var(--color-canvas);
  --nav-border-bottom: 1px solid var(--color-hairline);
  --card-bg: var(--color-surface-card);
  --footer-bg: var(--color-canvas);
}

/* Дополнительные утилиты для ретро-стиля */
.retro-theme .font-display {
  font-family: var(--font-display);
  letter-spacing: 0.02em;
  line-height: 1.15;
}

.retro-theme h1,
.retro-theme h2,
.retro-theme h3 {
  font-family: var(--font-display);
  letter-spacing: 0.02em;
}

/* Орнаментальная рамка для карточек */
.retro-theme .ornate-border {
  border: 1.5px solid var(--color-hairline);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.6),
    0 2px 0 0 rgba(28,18,11,0.04);
  background-image: linear-gradient(180deg, var(--color-surface-card) 0%, var(--color-surface-soft) 100%);
}
```

**Step 2: Импортировать в globals.css**

Добавить строку после `@import "../../docs/design-tokens.css";`:

```css
@import "../../src/styles/retro-theme.css";
```

**Verification:**
- Открыть `http://localhost:3000` — фон стал пергаментным, текст тёмно-коричневым.
- Открыть `/admin` — фон остался белым (Airbnb-стиль).

---

## Task 2: Подключить шрифт Ruslan Display через `next/font/google`

**Objective:** Загрузить декоративный шрифт для заголовков в ретро-стиле.

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Импортировать шрифт**

```tsx
import { Inter, Ruslan_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });
const ruslanDisplay = Ruslan_Display({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-ruslan",
});
```

**Step 2: Применить CSS-переменную шрифта к body**

```tsx
<body className={`${inter.className} ${ruslanDisplay.variable} min-h-screen antialiased text-ink bg-canvas`}>
```

**Step 3: Обновить retro-theme.css использовать переменную**

Заменить `'Ruslan Display'` на `var(--font-ruslan)` в `src/styles/retro-theme.css`:

```css
--font-display: var(--font-ruslan), 'Georgia', serif;
```

**Verification:**
- В DevTools → Elements → body видны CSS-переменные `--font-ruslan`
- На главной H1 отображается шрифтом Ruslan Display (может потребоваться жёсткий refresh без кэша).

---

## Task 3: Обновить `SiteShell` — добавить `.retro-theme` обёртку

**Objective:** Изолировать ретро-стили только для публичных страниц.

**Files:**
- Modify: `src/components/SiteShell.tsx`

**Step 1: Обернуть children публичных страниц**

```tsx
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="retro-theme">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

**Verification:**
- На главной `<body>` → дочерние элементы имеют класс `retro-theme`.
- В `/admin` класс `retro-theme` отсутствует.

---

## Task 4: Создать компонент `OrnamentalDivider`

**Objective:** Добавить SVG-орнамент для визуального разделения секций в стиле визитки.

**Files:**
- Create: `src/components/OrnamentalDivider.tsx`

**Step 1: Создать компонент**

```tsx
"use client";

import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
  variant?: "default" | "thick";
}

export default function OrnamentalDivider({ className, variant = "default" }: OrnamentalDividerProps) {
  const strokeWidth = variant === "thick" ? 2.5 : 1.5;
  return (
    <div className={cn("w-full flex items-center justify-center py-4", className)}>
      <svg
        viewBox="0 0 200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px] text-hairline"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M0 6h40"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M160 6h40"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M65 6c5 0 10-3 15-3s10 3 15 3s10-3 15-3"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle cx="100" cy="6" r="2.5" fill="currentColor" />
      </svg>
    </div>
  );
}
```

**Verification:**
- Импортировать в любую страницу: `<OrnamentalDivider />` — рендерится SVG-разделитель по центру.

---

## Task 5: Редизайн `Header` — ретро-акценты

**Objective:** Обновить шапку: логотип шрифтом Ruslan Display, убрать розовый (`rose-600`), заменить на токены, добавить орнаментальную нижнюю границу.

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Обновить логотип и стили**

Логотипный блок заменить на использование `font-display` (через Tailwind-утилиту, если добавим в конфиг, или inline style):

```tsx
<Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={closeMenu}>
  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-on-primary">
    <Wrench className="h-5 w-5" />
  </div>
  <div className="flex flex-col leading-none">
    <span className="text-xl md:text-2xl font-normal tracking-wide text-ink" style={{ fontFamily: 'var(--font-display)' }}>
      КомпьютерщикЪ
    </span>
    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted mt-0.5 hidden sm:block">
      Сервисный центр
    </span>
  </div>
</Link>
```

**Step 2: Убрать все Tailwind-хардкоды `rose-600`, `gray-200`, заменить на токены**

- `bg-rose-600` → `bg-primary`
- `text-rose-600` → `text-primary`
- `hover:bg-rose-700` → `hover:bg-primary-active`
- `border-gray-200` → `border-hairline`
- `bg-gray-50` → `bg-surface-soft`
- `text-gray-900` → `text-ink`
- `text-gray-600` → `text-body`
- `text-gray-500` → `text-muted`
- `text-gray-700` → `text-body`

**Step 3: Добавить орнаментальную нижнюю границу хедера**

```tsx
<header className={cn("sticky top-0 z-50 border-b transition-colors duration-200", ...)}>
  <div className="...">
    {/* существующий контент */}
  </div>
  {/* Орнамент под шапкой */}
  <div className="hidden md:block h-[2px] w-full bg-gradient-to-r from-transparent via-hairline to-transparent" />
</header>
```

**Verification:**
- Шапка на главной имеет пергаментный фон, логотип Ruslan Display, орнаментальная линия под шапкой.
- Шапка на /admin осталась без изменений (белая).

---

## Task 6: Редизайн `Footer` — ретро-акценты

**Objective:** Обновить подвал: фон `canvas`, орнаментальная верхняя граница, логотип Ruslan Display.

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Верхняя орнаментальная граница**

```tsx
<footer className="border-t border-hairline bg-canvas transition-colors duration-300">
  <div className="w-full flex justify-center">
    <OrnamentalDivider variant="thick" className="py-3" />
  </div>
  ...
```

**Step 2: Обновить логотип и ссылки**

- Логотип: `font-display` для «КомпьютерщикЪ`
- `bg-primary` для иконки логотипа
- Убрать `hover:text-primary` хардкоды, заменить на `hover:text-primary` (токен)

**Step 3: Bottom bar**

```tsx
<div className="border-t border-hairline">
  ...
</div>
```

**Verification:**
- Футер отображается с пергаментным фоном и орнаментом.

---

## Task 7: Редизайн `HeroSection` — главный экран

**Objective:** Пергаментный фон, заголовок Ruslan Display, кнопки с RGB-градиентом (как вентилятор), убрать розовые градиентные пятна.

**Files:**
- Modify: `src/components/HeroSection.tsx`

**Step 1: Обновить фон и декор**

```tsx
<section className="relative overflow-hidden bg-canvas px-4 md:px-8 lg:px-12 xl:px-16 py-section md:py-24 lg:py-32">
  {/* Убрать blur-градиенты, добавить текстуру-паттерн или оставить чистый пергамент */}
  <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1c120b 1px, transparent 0)', backgroundSize: '24px 24px' }} />
```

**Step 2: Заголовок**

```tsx
<h1 className="text-display-xl md:text-[36px] lg:text-[44px] font-normal text-ink leading-[1.15]" style={{ fontFamily: 'var(--font-display)' }}>
  Профессиональный ремонт компьютеров и гаджетов
</h1>
```

**Step 3: Кнопки с RGB-градиентным hover**

Основная кнопка (Позвонить) — оставить `bg-primary`.
Вторичная кнопка (Telegram) — добавить класс для RGB-hover:

```tsx
className="... hover:bg-gradient-to-r hover:from-purple-600 hover:via-green-500 hover:to-red-500 hover:text-white hover:border-transparent ..."
```

**Step 4: Badge**

```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-soft px-4 py-1.5 text-sm font-semibold text-primary">
```

**Verification:**
- Hero секция читается, заголовок Ruslan Display, кнопки реагируют на hover.

---

## Task 8: Редизайн `ServiceCard` — винтажные карточки

**Objective:** Заменить современные скруглённые карточки с тенями на стилизованные рамки.

**Files:**
- Modify: `src/components/ServiceCard.tsx`

**Step 1: Обновить разметку карточки**

```tsx
<a
  href={href}
  className="group flex flex-col gap-sm ornate-border p-lg transition-all duration-300 hover:border-primary/60"
>
  <div className="flex items-start justify-between">
    <div className="flex h-12 w-12 items-center justify-center border border-hairline bg-surface-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
      {icon}
    </div>
    <ArrowUpRight className="h-5 w-5 text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-primary" />
  </div>
  <h3 className="text-title-md font-semibold text-ink">{title}</h3>
  <p className="text-body-sm text-muted leading-relaxed">{description}</p>
</a>
```

**Verification:**
- Карточки имеют рамку и небольшой объём (inset shadow), при hover рамка становится фиолетовой.

---

## Task 9: Редизайн `ServicesSection` — секция услуг

**Objective:** Добавить орнамент, обновить заголовок.

**Files:**
- Modify: `src/components/ServicesSection.tsx`

**Step 1: Импортировать OrnamentalDivider**

```tsx
import OrnamentalDivider from "@/components/OrnamentalDivider";
```

**Step 2: Обновить заголовочную часть**

```tsx
<div className="mb-xl flex flex-col items-center text-center">
  <OrnamentalDivider className="mb-2" />
  <h2 className="text-display-lg font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>Наши услуги</h2>
  ...
</div>
```

**Verification:**
- Секция «Наши услуги» имеет орнамент над заголовком.

---

## Task 10: Редизайн `StatsSection` — цифры

**Objective:** Убрать круглые иконки, заменить на квадратные с рамкой; обновить цвета.

**Files:**
- Modify: `src/components/StatsSection.tsx`

**Step 1: Обновить стили иконок**

```tsx
<div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center border border-hairline bg-surface-soft text-primary">
  <Icon className="h-4 w-4 md:h-5 md:w-5" />
</div>
```

**Step 2: Обновить цвета текста**
- `text-primary` для цифр оставить.
- Разделители `md:divide-hairline` оставить (токен).

**Verification:**
- Секция статистики выглядит в едином ретро-стиле.

---

## Task 11: Редизайн «Почему выбирают нас» и CTA (page.tsx)

**Objective:** Применить ретро-стили к оставшимся секциям главной страницы.

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Секция «Почему выбирают нас»**

- Заголовок H2: `style={{ fontFamily: 'var(--font-display)' }}`
- Карточки преимуществ: заменить классы `rounded-xl border border-hairline bg-surface-card p-lg shadow-soft` на `ornate-border p-lg`
- Иконки: `border border-hairline bg-surface-soft` вместо `rounded-md bg-primary/10`

**Step 2: CTA Section**

```tsx
<section className="px-4 md:px-8 lg:px-12 xl:px-16 py-section bg-surface-soft">
  <div className="mx-auto max-w-container-lg">
    <div className="flex flex-col items-center text-center gap-lg ornate-border p-8 md:p-12">
      <OrnamentalDivider />
      <h2 className="text-display-lg font-normal text-ink" style={{ fontFamily: 'var(--font-display)' }}>
        Готовы отдать технику в надёжные руки?
      </h2>
      ...
```

**Verification:**
- Секции главной страницы визуально единообразны.

---

## Task 12: Экспорт логотипа-вентилятора и маскота из PDF

**Objective:** Подготовить веб-ассеты из исходного PDF.

**Files:**
- Create: `public/images/logo-fan.png`, `public/images/mascot.png` (или SVG)

**Step 1: Обрезать вентилятор и маскота из `/tmp/computerman/page-1.png`**

Использовать ImageMagick `convert` с `crop`.

Примерные команды (уточнить координаты по визуальному анализу):
```bash
mkdir -p /root/projects/notAntey/public/images
convert /tmp/computerman/page-1.png -crop 200x200+100+200 /root/projects/notAntey/public/images/logo-fan-raw.png
convert /tmp/computerman/page-1.png -crop 200x280+350+150 /root/projects/notAntey/public/images/mascot-raw.png
```

**Step 2: Оптимизировать**
```bash
# Оптимизация PNG
oxipng -o 4 /root/projects/notAntey/public/images/*.png || true
```

**Step 3: Создать SVG-иконку фавикона (опционально)**
- Использовать упрощённый вентилятор как SVG для favicon.

**Verification:**
- Файлы появились в `public/images/`.

---

## Task 13: Интегрировать логотип-вентилятор в Header

**Objective:** Заменить иконку гаечного ключа на логотип-вентилятор.

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Заменить иконку**

```tsx
<Image src="/images/logo-fan.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
```

Или если SVG:
```tsx
<div className="flex h-10 w-10 items-center justify-center">
  <svg ...>/* упрощённый вентилятор */</svg>
</div>
```

**Verification:**
- В шапке отображается логотип-вентилятор.

---

## Task 14: Обновить `Tailwind config` — добавить `font-display`

**Objective:** Зарегистрировать utility-класс Tailwind для ретро-шрифта.

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Добавить в `theme.extend.fontFamily`**

```ts
fontFamily: {
  sans: ["Inter", "-apple-system", "system-ui", "Roboto", "Helvetica Neue", "sans-serif"],
  mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "monospace"],
  display: ["var(--font-ruslan)", "Georgia", "serif"],
},
```

**Verification:**
- Класс `font-display` применяет Ruslan Display.

---

## Task 15: Глобальная проверка — убрать Tailwind-хардкоды цветов

**Objective:** Убедиться, что на публичных страницах не осталось `rose-`, `gray-` и других Tailwind-цветов вне токенов.

**Files:**
- Scan: `src/components/*.tsx`, `src/app/page.tsx`

**Step 1: Поиск хардкодов**

```bash
grep -rn "rose-" src/ || true
grep -rn "gray-" src/app/page.tsx src/components/*.tsx || true
```

**Step 2: Заменить всё на токенные классы**

Примеры замен:
- `bg-white` → `bg-canvas`
- `border-gray-200` → `border-hairline`
- `text-gray-900` → `text-ink`
- `text-gray-600` → `text-body`
- `text-gray-500` → `text-muted`
- `bg-gray-50` → `bg-surface-soft`

**Verification:**
- `grep` не находит `rose-` и `gray-` в исходниках публичных компонентов.

---

## Task 16: Сборка и финальная проверка

**Objective:** Проверить, что проект собирается и админка не сломана.

**Files:**
- N/A

**Step 1: Build**

```bash
cd /root/projects/notAntey && npm run build
```

**Step 2: Локальный запуск и скриншоты**

```bash
npm start &
# или
npx next dev -p 3000
```

**Step 3: Чек-лист проверки**
- [ ] Главная страница загружается без ошибок в консоли
- [ ] Админка `/admin` выглядит как раньше (белый фон, Airbnb-стиль)
- [ ] Шапка: логотип Ruslan Display, пергаментный фон, орнамент
- [ ] Hero: пергамент, заголовок Ruslan Display
- [ ] Карточки услуг: рамки вместо скругления и теней
- [ ] Футер: орнамент, пергамент, логотип Ruslan Display
- [ ] Мобильная версия читаема (400–768px)
- [ ] Кнопки реагируют на hover, ссылки работают

**Commit:**
```bash
git add -A
git commit -m "design: rework public site to retro-hybrid style based on business card"
```

---

## Summary

После выполнения всех задач публичная часть сайта получит:

- **Палитра:** пергаментный фон, тёплые коричневые текстовые тона, фиолетовый primary (отсылка к RGB-вентилятору).
- **Типографика:** Ruslan Display для заголовков и логотипа, Inter для чтения.
- **Орнаменты:** SVG-разделители между секциями, тонкие градиентные линии под шапкой.
- **Карточки:** «ornate-border» — рамки с лёгким градиентом и внутренним светом, без современных скруглений и размытых теней.
- **Логотип:** RGB-вентилятор из визитки в шапке.
- **Админка:** полностью изолирована через `.retro-theme` обёртку, остаётся в исходном стиле.
