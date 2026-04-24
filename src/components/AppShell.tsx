"use client";

import Sidebar from "./Sidebar";
import { useTenant } from "./TenantProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { tenant, loading } = useTenant();

  const brandName = tenant?.name || "OrenGen";
  const brandColor = tenant?.brandColor || "#6366f1";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ "--brand-color": brandColor } as React.CSSProperties}>
      <Sidebar brandName={brandName} brandColor={brandColor} />
      <main className="ml-56 min-h-screen p-6">{children}</main>
    </div>
  );
}
