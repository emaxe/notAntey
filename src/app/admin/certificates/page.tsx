import CertificatesTable from "@/components/admin/CertificatesTable";

export const metadata = {
  title: "Сертификаты | notAntey Admin",
};

export default async function AdminCertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Сертификаты</h1>
        <p className="text-sm text-zinc-500 mt-1">Управление сертификатами и лицензиями</p>
      </div>
      <div className="rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        <CertificatesTable />
      </div>
    </div>
  );
}
