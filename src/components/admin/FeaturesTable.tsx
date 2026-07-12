"use client";

import { useEffect, useState } from "react";
import FeatureForm from "./FeatureForm";
import { useToast } from "./Toast";

interface Feature {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  sortOrder: number;
}

export default function FeaturesTable() {
  const { showToast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Feature | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/features")
      .then((r) => r.json())
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteFeature = async (id: string) => {
    if (!window.confirm("Удалить фишку?")) return;
    await fetch(`/api/admin/features/${id}`, { method: "DELETE" });
    load();
    showToast("Удалено", "success");
  };

  if (loading) return <div className="py-8 text-center">Загрузка...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          + Добавить фишку
        </button>
      </div>

      {(creating || editing) && (
        <FeatureForm
          feature={editing}
          onSuccess={() => { setCreating(false); setEditing(null); load(); }}
          onCancel={() => { setCreating(false); setEditing(null); }}
        />
      )}

      <table className="w-full text-sm">
        <thead className="border-b bg-zinc-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Заголовок</th>
            <th className="px-4 py-2 text-left font-medium">Описание</th>
            <th className="px-4 py-2 text-right font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.id} className="border-b hover:bg-zinc-50">
              <td className="px-4 py-2 font-medium">{f.title}</td>
              <td className="px-4 py-2 text-zinc-500">{f.description}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => { setEditing(f); setCreating(false); }}
                  className="text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteFeature(f.id)}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
