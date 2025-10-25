import Copyright from "@/components/Footer/Copyright";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Copyright />
      {/* <Footer /> */}
    </>
  );
}
