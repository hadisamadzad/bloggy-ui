import AuthGuard from "@/components/Auth/AuthGuard";
import Copyright from "@/components/Footer/Copyright";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard fallbackPath="/login">
      <main className="flex-1">{children}</main>

      <Copyright />
    </AuthGuard>
  );
}
