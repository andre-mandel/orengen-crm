"use client";

import DashboardStats from "@/components/DashboardStats";
import RevenueChart from "@/components/RevenueChart";
import RecentActivity from "@/components/RecentActivity";

const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR || "#6366f1";

const stats = [
  { label: "Total Revenue", value: "$124,500", change: 12.5, icon: "revenue" as const },
  { label: "Active Deals", value: "23", change: 8.2, icon: "deals" as const },
  { label: "Contacts", value: "148", change: 5.1, icon: "contacts" as const },
  { label: "Tasks Completed", value: "89", change: -2.4, icon: "tasks" as const },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Overview of your business</p>
      </div>
      <DashboardStats stats={stats} brandColor={BRAND_COLOR} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RevenueChart brandColor={BRAND_COLOR} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
