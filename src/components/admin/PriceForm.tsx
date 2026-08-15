"use client";

import { useState } from "react";
import { useToast } from "./Toast";

interface PriceItem {
  id?: string;
  name: string;
  price: string;
  sortOrder: number;
}

interface PriceCategory {
  id?: string;
  name: string;
  sortOrder: number;
  items: PriceItem[];
}

interface Props {
  category?: PriceCategory | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PriceForm({ category, onSuccess, onCancel }: Props) {
  const { showToast } = useToast();
  const [form, setForm] = useState<PriceCategory>({
    name: category?.name || "",
    sortOrder: category?.sortOrder ?? 0,
    items: category?.items?.length
      ? category.items.map((i) => ({ ...i, price: String(i.price) }))
      : [{ name: "", price: "", sortOrder: 0 }],
  });
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const setItem = (idx: number, field: keyof PriceItem, value: string | number) => {
    const next = [...form.items];
    next[idx] = { ...next[idx], [field]: value };
    setForm({ ...form, items: next });
  };

  const addItem = () =>
    setForm({
      ...form,
      items: [...form.items, { name: "", price: "", sortOrder: form.items.length }],
    });

  const removeItem = (idx: number) => {
    const next = form.items.filter((_, i) => i !== idx);
    setForm({ ...form, items: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setSaving(true);
    const payload = {
      name: form.name,
      sortOrder: form.sortOrder,
      items: form.items.map((i) => ({
        name: i.name,
        price: Number(i.price) || 0,
        sortOrder: i.sortOrder,
      })),
    };
    const url = category?.id
      ? `/api/admin/price/${category.id}`
      : "/api/admin/price";
    const method = category?.id ? "PUT" : "POST";
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
        <label className="block text-sm font-medium">Название категории</label>
        <input
          required
          className={`mt-1 w-full rounded border px-3 py-2 ${fieldErrors.name ? "border-red-500" : ""}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
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
      <div className="space-y-2">
        <label className="block text-sm font-medium">Услуги</label>
        {form.items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              required
              placeholder="Название"
              className="flex-1 rounded border px-3 py-2"
              value={item.name}
              onChange={(e) => setItem(idx, "name", e.target.value)}
            />
            <input
              required
              placeholder="Цена"
              className="w-32 rounded border px-3 py-2"
              value={item.price}
              onChange={(e) => setItem(idx, "price", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="rounded border px-2 text-red-600"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="text-sm text-blue-600 hover:underline"
        >
          + Добавить услугу
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Сохранение..." : category?.id ? "Сохранить" : "Создать"}
        </button>
        <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
          Отмена
        </button>
      </div>
    </form>
  );
}
