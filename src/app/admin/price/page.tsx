import PriceTable from "@/components/admin/PriceTable";

export const metadata = {
  title: "Прайс-лист | notAntey Admin",
};

export default async function AdminPricePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Прайс-лист</h1>
        <p className="text-sm text-zinc-500 mt-1">Управление категориями и ценами на услуги</p>
      </div>
      <div className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <PriceTable />
      </div>
    </div>
  );
}
