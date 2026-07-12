import BlogTable from "@/components/admin/BlogTable";

export const metadata = {
  title: "Блог | notAntey Admin",
};

export default async function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Блог</h1>
        <p className="text-sm text-zinc-500 mt-1">Управление статьями и публикациями</p>
      </div>
      <div className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <BlogTable />
      </div>
    </div>
  );
}
