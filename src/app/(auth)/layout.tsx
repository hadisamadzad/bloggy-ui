export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Auth-specific layout - no header/footer */}
      {children}
    </div>
  );
}
