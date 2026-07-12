export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse text-[var(--color-text-muted)]">
        Загрузка...
      </div>
    </div>
  );
}
