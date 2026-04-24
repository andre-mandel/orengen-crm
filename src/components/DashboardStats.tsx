"use client";

import { TrendingUp, TrendingDown, Users, DollarSign, CheckSquare, Kanban } from "lucide-react";
import { clsx } from "clsx";

type Stat = {
  label: string;
  value: string;
  change: number;
  icon: "revenue" | "deals" | "contacts" | "tasks";
};

const icons = {
  revenue: DollarSign,
  deals: Kanban,
  contacts: Users,
  tasks: CheckSquare,
};

export default function DashboardStats({ stats, brandColor }: { stats: Stat[]; brandColor: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = icons[stat.icon];
        const up = stat.change >= 0;
        return (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${brandColor}18` }}
              >
                <Icon size={18} style={{ color: brandColor }} />
              </div>
              <span
                className={clsx(
                  "flex items-center gap-0.5 text-xs font-medium",
                  up ? "text-emerald-400" : "text-red-400"
                )}
              >
                {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(stat.change)}%
              </span>
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
            <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
