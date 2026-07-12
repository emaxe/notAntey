"use client";

import { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { useToast } from "./Toast";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  images: string[];
  published: boolean;
  createdAt: string;
}

export default function BlogTable() {
  const { showToast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const deletePost = async (id: string) => {
    if (!window.confirm("Удалить статью?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    load();
    showToast("Удалено", "success");
  };

  const togglePublish = async (post: BlogPost) => {
    const res = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    if (res.ok) load();
  };

  if (loading) return <div className="py-8 text-center">Загрузка...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="rounded bg-[var(--color-primary)] px-4 py-2 text-white"
        >
          + Добавить статью
        </button>
      </div>

      {(creating || editing) && (
        <BlogForm
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
            <th className="px-4 py-2 text-left font-medium">Статус</th>
            <th className="px-4 py-2 text-right font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-zinc-50">
              <td className="px-4 py-2">
                <div className="font-medium">{post.title}</div>
                <div className="text-xs text-zinc-400">
                  {new Date(post.createdAt).toLocaleDateString("ru-RU")}
                </div>
              </td>
              <td className="px-4 py-2 text-zinc-500">{post.slug}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => togglePublish(post)}
                  className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                    post.published
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {post.published ? "Опубликовано" : "Черновик"}
                </button>
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:underline text-xs"
                >
                  Открыть
                </a>
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

      {posts.length === 0 && (
        <div className="py-8 text-center text-zinc-500">
          Нет статей. Добавьте первую статью выше.
        </div>
      )}
    </div>
  );
}
