import FeaturesTable from "@/components/admin/FeaturesTable";

export const metadata = {
  title: "Фишки | notAntey Admin",
};

export default async function AdminFeaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Фишки</h1>
        <p className="text-sm text-zinc-500 mt-1">Управление преимуществами и особенностями сервиса</p>
      </div>
      <div className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <FeaturesTable />
      </div>
    </div>
  );
}
