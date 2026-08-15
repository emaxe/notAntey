"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import ImagePreview from "./ImagePreview";
import type { BlogPost } from "./BlogTable";

interface BlogFormProps {
  post?: BlogPost | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BlogForm({ post, onSuccess, onCancel }: BlogFormProps) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt ?? "",
    content: post?.content || "",
    coverImage: post?.coverImage ?? "",
    images: post?.images || [],
    published: post?.published ?? false,
  });
  const [imagesInput, setImagesInput] = useState(
    (post?.images || []).join("\n")
  );
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSaving(true);
    const payload = {
      ...form,
      images: imagesInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const url = post?.id ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
    const method = post?.id ? "PUT" : "POST";
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
        <label className="block text-sm font-medium">Slug</label>
        <input
          required
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.slug ? "border-red-500" : ""}`}
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        {fieldErrors.slug && <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Краткое описание</label>
        <textarea
          required
          rows={3}
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.excerpt ? "border-red-500" : ""}`}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        {fieldErrors.excerpt && <p className="mt-1 text-sm text-red-600">{fieldErrors.excerpt}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Контент (HTML)</label>
        <textarea
          required
          rows={8}
          className={`mt-1 w-full rounded border px-3 py-2 font-mono text-sm ${fieldErrors.content ? "border-red-500" : ""}`}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        {fieldErrors.content && <p className="mt-1 text-sm text-red-600">{fieldErrors.content}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Обложка (URL)</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
        />
        <ImagePreview src={form.coverImage} className="mt-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Доп. изображения (по одному на строку)</label>
        <textarea
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2"
          value={imagesInput}
          onChange={(e) => setImagesInput(e.target.value)}
        />
        {imagesInput && (
          <div className="mt-2 flex flex-wrap gap-2">
            {imagesInput
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
              .slice(0, 4)
              .map((url, i) => (
                <ImagePreview key={i} src={url} className="h-20 w-28" />
              ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="h-4 w-4"
        />
        <label htmlFor="published" className="text-sm font-medium">
          Опубликовано
        </label>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Сохранение..." : post?.id ? "Сохранить" : "Создать"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
