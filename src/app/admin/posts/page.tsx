import PostsTable from "@/components/admin/PostsTable";

export const metadata = {
  title: "Наши работы | notAntey Admin",
};

export default async function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Наши работы</h1>
        <p className="text-sm text-zinc-500 mt-1">Управление портфолио выполненных ремонтов</p>
      </div>
      <div className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <PostsTable />
      </div>
    </div>
  );
}
