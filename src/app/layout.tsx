import "./globals.css";
import AdminBar from "@/components/Auth/AdminBar";
import { SettingsProvider } from "@/context/SettingsContext";
import { buildBlogSeoMetadata } from "@/lib/seo";
import { getBlogSettings } from "@/services/setting-api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings();

  const metadata = buildBlogSeoMetadata(settings);
  
  return {
    ...metadata,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
    ],
  };
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
