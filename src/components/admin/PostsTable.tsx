"use client";

import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import { useToast } from "./Toast";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 20;

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  images: string[];
  source: string;
  createdAt: string;
}

export default function PostsTable() {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/admin/posts")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const deletePost = async (id: string) => {
    if (!window.confirm("Удалить запись?")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPage(1);
    load();
    showToast("Удалено", "success");
  };

  if (loading) return <div className="py-8 text-center">Загрузка...</div>;

  const q = search.toLowerCase();
  const filtered = posts.filter((p) =>
    !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Поиск по заголовку..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-sm rounded border px-3 py-2 text-sm"
        />
        <div className="ml-auto">
          <button
            onClick={() => { setCreating(true); setEditing(null); }}
            className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
          >
            + Добавить работу
          </button>
        </div>
      </div>

      {(creating || editing) && (
        <PostForm
          post={editing}
          onSuccess={() => { setCreating(false); setEditing(null); load(); }}
          onCancel={() => { setCreating(false); setEditing(null); }}
        />
      )}

      <table className="w-full text-sm">
        <thead className="border-b bg-zinc-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Заголовок</th>
            <th className="px-4 py-2 text-left font-medium">Slug</th>
            <th className="px-4 py-2 text-left font-medium">Источник</th>
            <th className="px-4 py-2 text-right font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE).map((post) => (
            <tr key={post.id} className="border-b hover:bg-zinc-50">
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2 text-zinc-500">{post.slug}</td>
              <td className="px-4 py-2">{post.source}</td>
              <td className="px-4 py-2 text-right space-x-2">
                <button
                  onClick={() => { setEditing(post); setCreating(false); }}
                  className="text-blue-600 hover:underline"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
        onPageChange={setPage}
      />
    </div>
  );
}
