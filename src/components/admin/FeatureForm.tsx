"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import ImagePreview from "./ImagePreview";

interface Feature {
  id?: string;
  title: string;
  description: string;
  mediaUrl: string;
  sortOrder: number;
}

interface Props {
  feature?: Feature | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function FeatureForm({ feature, onSuccess, onCancel }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<Feature>({
    title: feature?.title || "",
    description: feature?.description || "",
    mediaUrl: feature?.mediaUrl || "",
    sortOrder: feature?.sortOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      mediaUrl: form.mediaUrl,
      sortOrder: form.sortOrder,
    };
    const url = feature?.id
      ? `/api/admin/features/${feature.id}`
      : "/api/admin/features";
    const method = feature?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) { onSuccess(); showToast("Сохранено", "success"); }
    else {
      const data = await res.json().catch(() => ({}));
      if (data?.error?.fieldErrors) {
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(data.error.fieldErrors)) {
          flat[k] = Array.isArray(v) ? v[0] : String(v);
        }
        setFieldErrors(flat);
      } else {
        showToast(data?.error || "Ошибка сохранения", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Заголовок</label>
        <input
          required
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.title ? "border-red-500" : ""}`}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Описание</label>
        <textarea
          required
          rows={3}
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.description ? "border-red-500" : ""}`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {fieldErrors.description && <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Изображение / видео URL</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.mediaUrl}
          onChange={(e) => setForm({ ...form, mediaUrl: e.target.value })}
        />
        <ImagePreview src={form.mediaUrl} className="mt-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Sort order</label>
        <input
          type="number"
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.sortOrder}
          onChange={(e) =>
            setForm({ ...form, sortOrder: Number(e.target.value) })
          }
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Сохранение..." : feature?.id ? "Сохранить" : "Создать"}
        </button>
        <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
          Отмена
        </button>
      </div>
    </form>
  );
}
