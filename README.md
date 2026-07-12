# notAntey — КомпьютерщикЪ

Сайт сервис-центра по ремонту компьютеров и техники в Москве. Ретро-советская стилистика.

## Стек

- **Next.js 15** (App Router) + React 19 + TypeScript (strict)
- **Prisma 7** + PostgreSQL (driver adapter)
- **NextAuth v5** (credentials, JWT)
- **Tailwind CSS 3** + CSS custom properties
- **Lucide React** иконки

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Миграции и сидинг
npx prisma migrate dev
npx prisma db seed

# Dev-сервер
npm run dev          # http://localhost:3000

# Билд + продакшн
npm run build
npm start
```

## Переменные окружения

Скопируйте `.env.example` → `.env`:

| Переменная | Описание | Значение по умолчанию |
|---|---|---|
| `DATABASE_URL` | Строка подключения PostgreSQL | — |
| `NEXTAUTH_SECRET` | Секрет для JWT | — |
| `NEXTAUTH_URL` | Базовый URL | `http://localhost:3000` |
| `APP_URL` | Публичный URL (для SSR fetch) | пусто (относительные URL) |

## Структура

```
src/
├── app/                    # Страницы (App Router)
│   ├── page.tsx            # Главная
│   ├── works/              # Портфолио ремонтов
│   ├── price/              # Прайс-лист
│   ├── features/           # Фишки
│   ├── certificates/       # Сертификаты
│   ├── blog/               # Блог
│   ├── admin/              # Админ-панель
│   └── api/                # API маршруты
├── components/             # React компоненты
│   └── admin/              # Компоненты админки
├── lib/
│   ├── prisma.ts           # Prisma singleton
│   ├── constants.ts        # Константы (телефон, контакты)
│   └── validations.ts      # Zod-схемы валидации
├── middleware.ts            # Auth-guard для /admin
└── auth.ts                 # NextAuth конфигурация
```

## Админ-панель

Доступ: `/admin/login`

Функции:
- CRUD для портфолио, блога, прайса, фишек, сертификатов
- Дашборд со статистикой
- JWT-аутентификация

## Команды

| Команда | Описание |
|---|---|
| `npm run dev` | Dev-сервер |
| `npm run build` | Продакшн-билд |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript проверка |
| `npm test` | Jest тесты |
| `npm run test:e2e` | Playwright E2E |
| `npx prisma migrate dev` | Миграции |
| `npx prisma db seed` | Сидинг данных |
