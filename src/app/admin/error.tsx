'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ошибка</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          {error.message || 'Что-то пошло не так'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
