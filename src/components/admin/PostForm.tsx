"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import ImagePreview from "./ImagePreview";

interface Post {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  images: string[];
  source: string;
}

interface Props {
  post?: Post | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PostForm({ post, onSuccess, onCancel }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<Post>({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    images: post?.images || [],
    source: post?.source || "manual",
  });
  const [imagesInput, setImagesInput] = useState(
    (post?.images || []).join("\n")
  );
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFieldErrors({});
    const payload = {
      ...form,
      images: imagesInput
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const url = post?.id ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
    const method = post?.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      onSuccess();
      showToast("Сохранено", "success");
    } else {
      const data = await res.json();
      if (data.error && typeof data.error === "object" && data.error.fieldErrors) {
        setFieldErrors(data.error.fieldErrors);
      } else {
        showToast(typeof data.error === "string" ? data.error : "Ошибка сохранения", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium">Заголовок</label>
        <input
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        {fieldErrors.title && <p className="text-sm text-red-600 mt-1">{fieldErrors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Slug</label>
        <input
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        {fieldErrors.slug && <p className="text-sm text-red-600 mt-1">{fieldErrors.slug}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Краткое описание</label>
        <textarea
          required
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        {fieldErrors.excerpt && <p className="text-sm text-red-600 mt-1">{fieldErrors.excerpt}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Контент (HTML)</label>
        <textarea
          required
          rows={6}
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        {fieldErrors.content && <p className="text-sm text-red-600 mt-1">{fieldErrors.content}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Изображения (по одному на строку)</label>
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
        {fieldErrors.images && <p className="text-sm text-red-600 mt-1">{fieldErrors.images}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Источник</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />
        {fieldErrors.source && <p className="text-sm text-red-600 mt-1">{fieldErrors.source}</p>}
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
