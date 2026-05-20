# Подробный план реализации — notAntey

## Общие правила проекта

- **Best practices** на каждом этапе: TypeScript strict, lint (ESLint), format (Prettier), conventional commits.
- **Code review** обязателен после завершения каждого этапа перед слиянием в основную ветку.
- **Тестовое покрытие**: каждый этап должен завершаться пул-реквестом с юнит-тестами (Jest + RTL) и E2E-сценариями (Playwright).
- **Фокус на статику сначала**: все публичные страницы сначала статические с mock-данными, затем подключается БД.

---

## Архитектура и стек

| Слой | Технология |
|------|------------|
| **Фреймворк** | Next.js 15 (App Router), React 19, TypeScript (strict) |
| **Стили** | Tailwind CSS 4, CSS Custom Properties (`:root`), PostCSS |
| **UI-кит** | shadcn/ui (инициализировать только нужные компоненты) |
| **Тесты** | Jest + React Testing Library (юнит), Playwright (E2E), Vitest (опционально) |
| **Бэкенд** | Next.js API Routes, Prisma ORM, PostgreSQL (Supabase / local) |
| **Хранение медиа** | Cloudinary (images) / AWS S3 |
| **Авторизация** | NextAuth.js v5 (Credentials для админа) |
| **Деплой** | Vercel (frontend) + собственный сервер для БД |
| **Мониторинг** | Sentry (ошибки), Vercel Analytics (производительность) |

---

## Этап 1: Foundation — инфраструктура и конфигурация

**Цель**: рабочий скелет проекта с токенами, линтером, CI/CD и базовыми тестами.

### Задачи

1. **Инициализация Next.js**
   - `npx create-next-app@latest` с App Router, TypeScript, Tailwind, ESLint.
   - Структура папок:
     ```
     app/
       globals.css
       layout.tsx
       page.tsx
       (routes)/
         works/
         price/
         features/
         certificates/
         admin/
       api/
     components/
       ui/          # shadcn компоненты
       shared/      # общие компоненты
       sections/    # секции страниц
     lib/
       utils.ts
       prisma.ts    # singleton Prisma client
     styles/
       design-tokens.css
     public/
     tests/
       unit/
       e2e/
     prisma/
       schema.prisma
     ```

2. **Настройка Tailwind + CSS Custom Properties**
   - Скопировать `docs/design-tokens.css` в `styles/design-tokens.css`.
   - Подключить импорт в `globals.css`.
   - Настроить `tailwind.config.ts` для чтения CSS vars (`colors`, `borderRadius`, `spacing`, `fontFamily`).
   - Добавить utility-классы для токенов (e.g. `bg-primary`, `text-ink`, `rounded-card`).

3. **Настройка ESLint + Prettier**
   - Конфиг `.eslintrc.json` с TypeScript-aware rules.
   - Prettier config с `tailwindcss` plugin для сортировки Tailwind классов.
   - Husky pre-commit hook: lint + format.

4. **Тестовая инфраструктура**
   - Jest + React Testing Library (юнит-тесты компонентов).
   - Playwright (Е2Е: открытие страниц, responsive breakpoints).
   - Базовый smoke-test: главная страница рендерится без ошибок.

5. **Подготовка shadcn/ui**
   - Инициализация `npx shadcn@latest init`.
   - Установка базовых компонентов: Button, Card, Dialog, Input, Textarea, Sheet, Tabs, Accordion, Badge, Skeleton.
   - Переопределить стили shadcn через CSS vars (links к design tokens).

6. **Git + CI/CD**
   - Инициализация репозитория, `.gitignore`.
   - GitHub Actions workflow:
     - Lint + Type check + Unit tests на каждый PR.
     - E2E tests на PR (опционально для экономии времени).
     - Deploy preview на Vercel для каждой ветки.

### Критерий приёмки

- [ ] `npm run dev` запускает без ошибок.
- [ ] `npm run build` проходит без TypeScript ошибок.
- [ ] `npm run lint` проходит без предупреждений.
- [ ] `npm run test:unit` выполняет smoke-test главной страницы.
- [ ] CSS vars работают: изменение hex в `design-tokens.css` меняет цвет на странице.
- [ ] PR template и конфиг GitHub Actions на месте.

### Тесты этапа

- Юнит: рендер `layout.tsx` без ошибок, проверка подключения CSS vars.
- E2E: открытие `/` по всем breakpoints.

---

## Этап 2: Layout и навигация

**Цель**: общий шаблон страницы с навигацией, подвалом и адаптивной версткой.

### Задачи

1. **Глобальный Layout (`app/layout.tsx`)**
   - Подключение `design-tokens.css`, шрифтов (Inter из Google Fonts / next/font).
   - Базовые meta-теги: viewport, charset, lang="ru".
   - Обертка в `body`: flex-col, min-h-screen, bg-page.

2. **Header (`components/shared/Header.tsx`)**
   - Фиксированная панель навигации (sticky, z-50).
   - Логотип "КомпьютерщикЪ" слева.
   - Навигация по разделам (главная, услуги, прайс, фишки, сертификаты) — по центру или справа.
   - Кнопки действия: "Написать в Max" и "Позвонить" — проминент, акцент-цвет.
   - Мобильная версия: hamburger menu (Sheet из shadcn), коллапс навигации + кнопки.

3. **Footer (`components/shared/Footer.tsx`)**
   - 3–4 колонки: Услуги, Контакты, График, Соцсети.
   - Белый фон (matches canvas), разделители hairline.
   - Legal-band: копирайт + язык/валюта (mock), соц. иконки.

4. **Page shell wrapper**
   - Контейнер с `max-w-7xl mx-auto px-4 sm:px-6 lg:px-16` (match Airbnb container).
   - Секцийный отступ `{spacing.section}` (64px) по вертикали.

### Критерий приёмки

- [ ] Header закреплён при скролле, содержит все ссылки.
- [ ] Мобильное меню (ширина < 744px) раскрывается по кнопке, закрывается по ссылке/кнопке.
- [ ] Footer корректно рефлоуит на mobile (1 колонка).
- [ ] Кнопка "Позвонить" использует `tel:` протокол.
- [ ] Кнопка "Написать в Max" использует Max deeplink (placeholder до уточнения).

### Тесты этапа

- Юнит: рендер Header и Footer, проверка наличия навигационных ссылок.
- E2E: клик по всем разделам, мобильное меню открывается/закрывается, viewport 375—1920.

---

## Этап 3: Главная страница (Landing)

**Цель**: полноценная главная страница с всеми блоками, мок-данными, адаптивом.

### Задачи

1. **Hero Section (`components/sections/Hero.tsx`)**
   - Крупный заголовок: "Ремонт компьютеров и ноутбуков" (display-xl / weight 700).
   - Подзаголовок + USP (14 лет опыта, оригинальные запчасти, гарантия).
   - Фоновое изображение (плейсхолдер, позже заменить на фото мастера/офиса).
   - CTA-блок: две большие кнопки рядом или в одной плавающей панели.

2. **Quick Services Preview (`components/sections/ServicesPreview.tsx`)**
   - 3–4 карточки услуг: иконка + название + краткое описание.
   - Карточка использует токены: card-bg, card-radius, shadow-float на hover.
   - Ссылка "Посмотреть все услуги" → `/price`.

3. **Trust Signals (`components/sections/TrustSignals.tsx`)**
   - 3–4 цифры: "5000+ ремонтов", "4.9 ⭐", "14 лет", "Гарантия 90 дней".
   - Крупный шрифт (аналог rating-display из Airbnb — 48–64px).
   - Подпись мелким шрифтом.

4. **Section Links / Teasers**
   - Блок «Наши работы»: 2–3 миниатюры фото + ссылка.
   - Блок «Прайс»: краткая таблица 3 услуг + ссылка.
   - Блок «Наши фишки»: иконки + преимущества + ссылка.
   - Блок «Сертификаты»: мини-галерея 4 миниатюр + ссылка.

5. **CTA Banner (floating or inline)**
   - Повторение кнопок действия перед футером.

### Критерий приёмки

- [ ] Главная страница загружается < 2.5s LCP на 3G.
- [ ] Hero корректно отображается на mobile (высота 60vh, текст читается).
- [ ] Все CTA-кнопки работают: звонок открывает диалер, Max — ссылка/диалог.
- [ ] Мок-данные вынесены в `lib/data/` (не захардкожены в JSX).

### Тесты этапа

- Юнит: рендер каждой секции, проверка props.
- E2E: Lighthouse CI проверка LCP < 2.5s, CLS < 0.1 на главной.
- E2E: клик по всем CTA-кнопкам.

---

## Этап 4: Контентные страницы (статика + mock-данные)

**Цель**: все 4 раздела с версткой и мок-контентом, готовые к подключению БД.

### 4.1. Наши работы (`/works`)

- Сетка карточек постов (3 колонки на desktop, 1 на mobile).
- Карточка: изображение (aspect-ratio 4:3, rounded-md), заголовок, дата, краткий текст.
- Пагинация (shadcn Pagination или бесконечный скролл).
- Страница отдельного поста (`/works/[slug]`): галерея фото, полный текст, дата.
- Заглушки на 6–8 постов.

### 4.2. Прайс (`/price`)

- Структура: аккордеон (shadcn Accordion) по категориям.
- Категории: Диагностика, Ремонт ноутбуков, Ремонт ПК, Комплектующие, Услуги.
- Каждый раскрывающийся блок: таблица (услуга — цена — срок).
- Стили: hairline borders, surface-soft фон для раскрытой категории.
- Мобильная версия: аккордеон вертикально раскрывается, таблица превращается в стек карточек.

### 4.3. Наши фишки (`/features`)

- Секции с иконками + заголовки + описание.
- Галерея изображений/видео (placeholder): сетка 2–3 колонки, lightbox на клик.
- Видео-карточки с lazy-loading iframe / poster image.

### 4.4. Сертификаты (`/certificates`)

- Сетка миниатюр (3 колонки desktop, 2 tablet, 1 mobile).
- Изображение с rounded-md, shadow-float на hover.
- Клик открывает lightbox / Dialog с увеличенной версией сертификата.
- Опциональный фильтр по категориям (если много сертификатов).

### Критерий приёмки

- [ ] Все страницы открываются без 404 и ошибок рендера.
- [ ] Роутинг корректный: `/works`, `/price`, `/features`, `/certificates`.
- [ ] Адаптив на все breakpoints (mobile — 1 колонка, tablet — 2, desktop — 3–4).
- [ ] Мок-данные в `lib/data/` в виде TypeScript объектов со строгой типизацией.

### Тесты этапа

- Юнит: рендер каждой контентной страницы, проверка props компонентов.
- E2E: навигация между разделами, адаптивная верстка по всем breakpoints.
- E2E: аккордеон на `/price` раскрывается/закрывается, lightbox на `/certificates`.

---

## Этап 5: Бэкенд и БД

**Цель**: API + база данных для всего контента, авторизация админа.

### Задачи

1. **Схема Prisma (`prisma/schema.prisma`)**
   - `Post` (id, title, slug, content, excerpt, images[], createdAt, updatedAt, source: 'manual' | 'max').
   - `PriceCategory` (id, name, sortOrder).
   - `PriceItem` (id, categoryId, name, price, unit, sortOrder).
   - `Certificate` (id, title, imageUrl, category, createdAt).
   - `Feature` (id, title, description, icon, mediaUrl, sortOrder).
   - `User` (id, email, passwordHash, role: 'admin').

2. **Подключение БД**
   - Supabase PostgreSQL или локальный Docker PostgreSQL для разработки.
   - Singleton PrismaClient в `lib/prisma.ts`.
   - Миграции: `prisma migrate dev` и `prisma db seed` (мок-данные).

3. **API Routes (App Router)**
   - `GET /api/posts` — список постов (пагинация, фильтр).
   - `GET /api/posts/[slug]` — отдельный пост.
   - `GET /api/price` — категории + элементы прайса.
   - `GET /api/certificates` — галерея.
   - `GET /api/features` — фишки.
   - `POST /api/admin/*` — защищённые CRUD для админ-панели (NextAuth middleware).

4. **Авторизация (NextAuth.js v5)**
   - Credentials provider (пароль админа хеширована bcrypt).
   - JWT strategy, middleware для защиты `/admin/*`.
   - Секреты хранятся в `~/docs/99-Secrets/KEYS.md` (Obsidian vault), не в репозитории.

5. **Валидация и обработка ошибок**
   - Zod схемы для всех API запросов.
   - Унифицированный ответ ошибок (JSON + код).

### Критерий приёмки

- [ ] Prisma schema соответствует всем типам контента.
- [ ] API routes возвращают корректный JSON, обрабатывают 404 и 500.
- [ ] Admin routes защищены middleware — без сессии возвращают 401/403.
- [ ] Миграции и seed работают из коробки.

### Тесты этапа

- Юнит: тесты API routes (мок Prisma client), Zod валидация.
- E2E: Playwright тестирует API endpoints (GET/POST/PUT/DELETE).
- E2E: попытка доступа к admin API без авторизации — ожидается 401.

---

## Этап 6: Admin Panel

**Цель**: защищённая админ-панель для управления всем контентом.

### Задачи

1. **Структура админки**
   - Роут `/admin` — перенаправление на `/admin/login` если не авторизован.
   - Layout админки: sidebar слева + content area.
   - Sidebar: Посты, Прайс, Сертификаты, Фишки, Настройки.

2. **CRUD Постов (`/admin/posts`)**
   - Таблица с постами (shadcn Table + Pagination).
   - Форма создания/редактирования: title, slug, excerpt, content (textarea / rich-text placeholder), images (multi-upload placeholder), source.
   - Кнопки: Сохранить, Удалить (Dialog подтверждение).

3. **CRUD Прайса (`/admin/prices`)**
   - Управление категориями (перетаскивание для сортировки — опционально).
   - Управление услугами внутри категорий: name, price (number), unit (руб., от, час).

4. **CRUD Сертификатов (`/admin/certificates`)**
   - Загрузка изображений (drag-and-drop placeholder или поле ссылки).
   - Галерея с миниатюрами, удаление, редактирование подписи.

5. **CRUD Фишек (`/admin/features`)**
   - Форма: title, description, icon (Lucide название), mediaUrl, sortOrder.
   - Превью иконки в реальном времени.

6. **Статус-бар и уведомления**
   - Toast при сохранении/удалении (shadcn Sonner / Toast).

### Критерий приёмки

- [ ] Без авторизации — редирект на `/admin/login`.
   - [ ] Все CRUD операции отражаются в БД без перезагрузки страницы (optimistic UI + revalidation).
   - [ ] Формы валидируются до отправки (Zod + React Hook Form).
   - [ ] Мобильная версия админки читабельна (sidebar в Sheet).

### Тесты этапа

- Юнит: формы валидации, отображение компонентов админки.
- E2E: полный цикл CRUD для каждого раздела (login → создать → редактировать → удалить → выйти).
- E2E: попытка доступа без логина — редирект на login.

---

## Этап 7: Интеграция с Max (Messenger)

**Цель**: автоматическая синхронизация блога с канала Max.

### Задачи

1. **Изучение Max API**
   - Уточнить доступен ли Bot API / webhook / RSS для канала.
   - Если нет API — план Б: polling по расписанию (cronjob каждые 15 мин).
   - Сохранение API ключей в `~/docs/99-Secrets/KEYS.md`.

2. **API интеграции**
   - `POST /api/webhooks/max` — приём сообщений от Max.
   - Фильтрация по channelId, дедупликация по messageId.
   - Парсинг: текст → excerpt, изображения → скачивание в хранилище, слугебный slug.
   - Автоматическое обновление кеша блога (revalidatePath `/works`).

3. **Резервная копия**
   - Изображения из Max скачиваются на сервер (S3 / Cloudinary позже).
   - Текст сообщения транкируется в Post запись.

4. **Fallback: ручной импорт**
   - Если API Max недоступен: админ копирует ссылки/текст и вставляет в форму админки.
   - Этот фаллбэк работает со дня 1.

### Критерий приёмки

- [ ] Вебхук проходит верификацию подписи (секретный токен в заголовке).
- [ ] Новое сообщение из Max появляется в блоге в течение минуты.
- [ ] Дедупликация работает (повторная отправка не создаёт дубликат).
- [ ] Отсутствие API — не блокирует работу сайта (ручной импорт в админке).

### Тесты этапа

- Юнит: валидация webhook payload, дедупликация логика.
- E2E: отправка мок-webhook запроса → проверка появления в блоге.
- E2E: невалидный webhook запрос возвращает 401.

---

## Этап 8: SEO и производительность

**Цель**: высокая скорость загрузки, полноценная SEO-оптимизация.

### Задачи

1. **Next.js Metadata API**
   - Каждая страница имеет уникальный `metadata` объект: title, description, keywords, openGraph, twitter.
   - Dynamic metadata для `/works/[slug]` (title из поста).
   - `metadataBase` в `layout.tsx`.

2. **Sitemap + robots.txt**
   - `app/sitemap.ts` — динамический sitemap с постами из БД.
   - `app/robots.ts` — разрешение всего, кроме `/admin`.

3. **Open Graph / Twitter Cards**
   - OG image generation (плейсхолдер или динамический Image Response).
   - Для постов: первое изображение как og:image.

4. **Schema.org разметка**
   - `LocalBusiness` на главной (в JSON-LD script).
   - `Service` для каждой категории прайса.
   - `BreadcrumbList` на всех страницах.

5. **Core Web Vitals оптимизация**
   - `next/image` для всех изображений (WebP, lazy-loading, sizes).
   - Шрифты загружаются через `next/font` (subset, preload).
   - Статическая генерация главной и прайса (`export const dynamic = 'force-static'` где возможно).
   - Кеширование API ответов (настройка `revalidate` в route handlers).

6. **Аналитика**
   - Vercel Analytics / Speed Insights включены.
   - Yandex.Metrika или Google Analytics плейсхолдер (GTAG через next/script).

### Критерий приёмки

- [ ] Lighthouse оценка ≥ 90 на Performance, Accessibility, SEO, Best Practices.
- [ ] LCP < 2.5s, CLS < 0.1, FID < 100ms.
- [ ] Sitemap доступен по `/sitemap.xml` и содержит все публичные URL.
- [ ] `robots.txt` блокирует `/admin`.
- [ ] OG image генерируется корректно для всех страниц.

### Тесты этапа

- E2E: Lighthouse CI в GitHub Actions (порог 90).
- Юнит: проверка метаданных тегов на каждой странице.
- E2E: проверка доступности sitemap.xml и robots.txt.

---

## Этап 9: Тестирование и QA

**Цель**: полное тестовое покрытие всего функционала.

### Юнит-тесты (Jest + React Testing Library)

- **Компоненты**: каждый shared компонент имеет юнит-тест.
- **Утилиты**: функции в `lib/utils.ts`, валидаторы Zod, форматеры дат.
- **Hooks**: кастомные React hooks (если будут).
- **API Handlers**: мок PrismaClient для тестирования route handlers.

### E2E-тесты (Playwright)

- **Навигация**: переходы между всеми разделами.
- **Главная**: CTA-кнопки работают, секции видны, responsive breakpoints.
- **Контентные страницы**: аккордеоны, lightbox, пагинация.
- **Админка**: полный цикл CRUD для всех разделов, авторизация.
- **Адаптив**: viewport 375, 768, 1280, 1920 — всё корректно.
- **SEO**: мета-теги, sitemap, OG image.
- **Performance**: Lighthouse CI в каждом PR.

### Ручное QA

- Проверка в iOS Safari, Android Chrome.
- Проверка печати страниц прайса.
- Проверка доступности клавиатурной навигации (Tab, Enter, Escape).

### Критерий приёмки

- [ ] Покрытие юнит-тестами ≥ 80% (functions, branches, lines).
- [ ] E2E тесты проходят без ошибок на CI.
- [ ] Lighthouse оценка ≥ 90 по всем 4 категориям.
- [ ] Нет критических accessibility ошибок (контраст, alt-тексты, label-ы).

---

## Этап 10: Деплой и запуск

**Цель**: продакшен-реди сайт, настройка домена и мониторинга.

### Задачи

1. **Настройка Vercel**
   - Подключение репозитория, автодеплой из main branch.
   - Environment variables: DATABASE_URL, NEXTAUTH_SECRET, MAX_WEBHOOK_SECRET, CLOUDINARY_*.
   - Конфиг домена / поддомена.

2. **Настройка сервера БД**
   - Если собственный сервер: Docker Compose (PostgreSQL + app).
   - Nginx reverse proxy + Let's Encrypt (HTTPS).
   - Если Supabase: настройка connection string.

3. **CI/CD полный цикл**
   - PR: lint + type-check + unit tests + build + Lighthouse CI.
   - Merge в main: автодеплой на Vercel + E2E smoke tests после деплоя.

4. **Мониторинг и алерты**
   - Sentry для отлавливания runtime ошибок.
   - Uptime monitor (UptimeRobot / BetterUptime плейсхолдер).
   - Backup БД: автоматический daily dump.

5. **Пост-деплой задачи**
   - Заполнить реальный контент (посты из Max, прайс, фото сертификатов).
   - Настроить реальный номер телефона и Max deeplink в CTA.
   - Подключить аналитику (Yandex / Google).

### Критерий приёмки

- [ ] Сайт доступен по HTTPS на целевом домене.
- [ ] Автодеплой работает из main branch.
- [ ] БД подключена, миграции проходят автоматически.
- [ ] Sentry отлавливает ошибки.
- [ ] Бэкап БД настроен.

---

## Приоритеты и MVP

### MVP (этапы 1–4)

1. Foundation — рабочий скелет с токенами.
2. Layout + Navigation — шапка, подвал, адаптив.
3. Landing Page — главная с всеми блоками.
4. Контентные страницы с mock-данными.

### Phase 2 (этапы 5–7)

5. Backend + DB — API для всего контента.
6. Admin Panel — управление контентом.
7. Max Integration — синхронизация блога.

### Phase 3 (этапы 8–10)

8. SEO + Performance — оптимизация и мета-теги.
9. Полное тестирование.
10. Деплой и запуск.

---

## Технический долг и риски

| Риск | Митигация |
|---|---|
| Max API недоступен или не предоставляет webhook | Fallback: ручной импорт в админке с дня 1. Не блокирует MVP. |
| Контент не готов (нет фото, прайса) | Мок-данные для демонстрации; админка позволит быстро заполнить. |
| Медиа-контент много и тяжёлый | Оптимизация изображений через next/image и Cloudinary настроена с этапа 1. |
| Палитра меняется после запуска | CSS Custom Properties позволяют сменить всё в 1 файле без пересборки. |
| Ресурсоограниченность сервера (2 CPU / 3GB) | SSR где нужен, SSG/static где возможно; оптимизация изображений; lazy loading. |

---

## Контакты и доступы (заполнить по мере разработки)

- **Домен**: `____________________`
- **Хостинг**: Vercel / собственный сервер: `____________________`
- **Номер телефона**: `____________________`
- **Max deeplink / API**: `____________________`
- **Database URL**: `____________________`
- **Cloudinary / S3 keys**: `____________________`
