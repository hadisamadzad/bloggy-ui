"use client";

import "./globals.css";
import AdminBar from "@/components/Auth/AdminBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bloggy</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <AdminBar />
        {children}
      </body>
    </html>
  );
}
