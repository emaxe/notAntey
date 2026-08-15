"use client";

import { useEffect, useState } from "react";
import PriceForm from "./PriceForm";
import { useToast } from "./Toast";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 20;

interface PriceItem {
  id: string;
  name: string;
  price: string;
  sortOrder: number;
}

interface PriceCategory {
  id: string;
  name: string;
  sortOrder: number;
  items: PriceItem[];
}

export default function PriceTable() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PriceCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/price")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Удалить категорию?")) return;
    await fetch(`/api/admin/price/${id}`, { method: "DELETE" });
    setPage(1);
    load();
    showToast("Удалено", "success");
  };

  if (loading) return <div className="py-8 text-center">Загрузка...</div>;

  const q = search.toLowerCase();
  const filtered = categories.filter((cat) =>
    !q || cat.name.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-sm rounded border px-3 py-2 text-sm"
        />
        <div className="ml-auto">
          <button
            onClick={() => { setCreating(true); setEditing(null); }}
            className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
          >
            + Добавить категорию
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <PriceForm
          category={editing}
          onSuccess={() => { setCreating(false); setEditing(null); load(); }}
          onCancel={() => { setCreating(false); setEditing(null); }}
        />
      )}

      <div className="space-y-6">
        {filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((cat) => (
          <div key={cat.id} className="rounded border bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">{cat.name}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => { setEditing(cat); setCreating(false); }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </div>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {cat.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-2 pr-4">{item.name}</td>
                    <td className="py-2 text-right font-medium">{item.price} руб.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
        onPageChange={setPage}
      />
    </div>
  );
}
