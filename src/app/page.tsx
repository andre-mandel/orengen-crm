"use client";

import { useEffect, useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import RevenueChart from "@/components/RevenueChart";
import RecentActivity from "@/components/RecentActivity";
import { useTenant } from "@/components/TenantProvider";

type Stats = { totalRevenue: number; activeDeals: number; contacts: number; tasksCompleted: number; totalTasks: number };

export default function Dashboard() {
  const { tenant } = useTenant();
  const brandColor = tenant?.brandColor || "#6366f1";
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats);
  }, []);

  const statCards = stats
    ? [
        { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, change: 0, icon: "revenue" as const },
        { label: "Active Deals", value: String(stats.activeDeals), change: 0, icon: "deals" as const },
        { label: "Contacts", value: String(stats.contacts), change: 0, icon: "contacts" as const },
        { label: "Tasks Done", value: `${stats.tasksCompleted}/${stats.totalTasks}`, change: 0, icon: "tasks" as const },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Overview of your business</p>
      </div>
      {stats ? (
        <DashboardStats stats={statCards} brandColor={brandColor} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="stat-card h-24 animate-pulse" />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RevenueChart brandColor={brandColor} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
