import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-[var(--color-text-muted)] mb-6">
          Страница не найдена
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg inline-block"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
