"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 4900 },
  { month: "Apr", revenue: 7200 },
  { month: "May", revenue: 6800 },
  { month: "Jun", revenue: 8400 },
  { month: "Jul", revenue: 9100 },
  { month: "Aug", revenue: 8700 },
  { month: "Sep", revenue: 10200 },
  { month: "Oct", revenue: 11400 },
  { month: "Nov", revenue: 9800 },
  { month: "Dec", revenue: 12600 },
];

export default function RevenueChart({ brandColor }: { brandColor: string }) {
  return (
    <div className="stat-card">
      <h3 className="text-sm font-medium mb-4">Revenue Overview</h3>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={brandColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={brandColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262937" />
            <XAxis dataKey="month" stroke="#565a6e" fontSize={11} tickLine={false} />
            <YAxis stroke="#565a6e" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#1c1f2e",
                border: "1px solid #262937",
                borderRadius: "8px",
                color: "#f0f1f5",
                fontSize: "12px",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={brandColor}
              strokeWidth={2}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
