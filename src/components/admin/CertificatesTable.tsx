"use client";

import { useEffect, useState } from "react";
import CertificateForm from "./CertificateForm";
import { useToast } from "./Toast";

interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export default function CertificatesTable() {
  const { showToast } = useToast();
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/certificates")
      .then((r) => r.json())
      .then((data) => {
        setCerts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteCert = async (id: string) => {
    if (!window.confirm("Удалить сертификат?")) return;
    await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
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
          + Добавить сертификат
        </button>
      </div>

      {(creating || editing) && (
        <CertificateForm
          certificate={editing}
          onSuccess={() => { setCreating(false); setEditing(null); load(); }}
          onCancel={() => { setCreating(false); setEditing(null); }}
        />
      )}

      <table className="w-full text-sm">
        <thead className="border-b bg-zinc-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Заголовок</th>
            <th className="px-4 py-2 text-left font-medium">Изображение</th>
            <th className="px-4 py-2 text-right font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {certs.map((c) => (
            <tr key={c.id} className="border-b hover:bg-zinc-50">
              <td className="px-4 py-2">{c.title}</td>
              <td className="px-4 py-2 text-zinc-500">{c.imageUrl || "—"}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => { setEditing(c); setCreating(false); }}
                  className="text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deleteCert(c.id)}
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
