"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import ImagePreview from "./ImagePreview";

interface Certificate {
  id?: string;
  title: string;
  imageUrl: string;
}

interface Props {
  certificate?: Certificate | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CertificateForm({ certificate, onSuccess, onCancel }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<Certificate>({
    title: certificate?.title || "",
    imageUrl: certificate?.imageUrl || "",
  });
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSaving(true);
    const payload = {
      title: form.title,
      imageUrl: form.imageUrl,
    };
    const url = certificate?.id
      ? `/api/admin/certificates/${certificate.id}`
      : "/api/admin/certificates";
    const method = certificate?.id ? "PUT" : "POST";
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
        <label className="block text-sm font-medium">URL изображения</label>
        <input
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.imageUrl ? "border-red-500" : ""}`}
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />
        {fieldErrors.imageUrl && <p className="mt-1 text-sm text-red-600">{fieldErrors.imageUrl}</p>}
        <ImagePreview src={form.imageUrl} className="mt-2" />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Сохранение..." : certificate?.id ? "Сохранить" : "Создать"}
        </button>
        <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
          Отмена
        </button>
      </div>
    </form>
  );
}
