import AuthGuard from "@/components/Auth/AuthGuard";
import Copyright from "@/components/Footer/Copyright";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard fallbackPath="/login">
      <div className="flex flex-col">
        {/* Admin indicator bar */}
        <div className="bg-blue-100 border-b border-blue-200 px-4 py-2">
          <div className="flex items-center gap-2 text-blue-800 text-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="font-medium">Admin Panel</span>
          </div>
        </div>

        <main className="flex-1">{children}</main>

        <div>
          <Copyright />
        </div>
      </div>
    </AuthGuard>
  );
}
