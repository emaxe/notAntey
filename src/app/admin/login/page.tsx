import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Вход в админ-панель | notAntey",
  robots: "noindex",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-xl font-bold">
          Администратор notAntey
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
