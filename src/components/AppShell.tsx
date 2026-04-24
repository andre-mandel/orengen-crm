"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

const DEFAULT_BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "OrenGen",
  color: process.env.NEXT_PUBLIC_BRAND_COLOR || "#6366f1",
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [brand] = useState(DEFAULT_BRAND);

  return (
    <div style={{ "--brand-color": brand.color } as React.CSSProperties}>
      <Sidebar brandName={brand.name} brandColor={brand.color} />
      <main className="ml-56 min-h-screen p-6">{children}</main>
    </div>
  );
}
