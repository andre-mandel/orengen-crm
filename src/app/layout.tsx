import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import TenantProvider from "@/components/TenantProvider";

export const metadata: Metadata = {
  title: "OrenGen CRM",
  description: "Custom CRM & Business Operations Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <TenantProvider>
          <AppShell>{children}</AppShell>
        </TenantProvider>
      </body>
    </html>
  );
}
