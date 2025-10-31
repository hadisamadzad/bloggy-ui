import "./globals.css";
import AdminBar from "@/components/Auth/AdminBar";
import { SettingsProvider } from "@/context/SettingsContext";
import { buildBlogSeoMetadata } from "@/lib/seo";
import { getBlogSettings } from "@/services/setting-api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings();

  return buildBlogSeoMetadata(settings);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex flex-col min-h-screen">
        <AdminBar />
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
