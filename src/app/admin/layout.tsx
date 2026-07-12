import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";
import { ToastProvider } from "@/components/admin/Toast";

export const metadata = {
  title: "Админ-панель | notAntey",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <ToastProvider>
      <AdminShell userEmail={session?.user?.email || ""}>
        {children}
      </AdminShell>
    </ToastProvider>
  );
}
