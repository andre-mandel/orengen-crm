"use client";

import { Phone, Mail, DollarSign, CheckSquare, UserPlus } from "lucide-react";

type Activity = {
  id: string;
  type: "call" | "email" | "deal" | "task" | "contact";
  message: string;
  time: string;
};

const typeIcons = {
  call: Phone,
  email: Mail,
  deal: DollarSign,
  task: CheckSquare,
  contact: UserPlus,
};

const typeColors: Record<string, string> = {
  call: "#22c55e",
  email: "#3b82f6",
  deal: "#f59e0b",
  task: "#6366f1",
  contact: "#ec4899",
};

const demoActivities: Activity[] = [
  { id: "1", type: "deal", message: "New deal 'Enterprise Package' created — $12,500", time: "2m ago" },
  { id: "2", type: "contact", message: "New contact added — Sarah Johnson", time: "15m ago" },
  { id: "3", type: "call", message: "Call completed with Marcus Lee — 8 min", time: "1h ago" },
  { id: "4", type: "task", message: "Task 'Update proposals' marked complete", time: "2h ago" },
  { id: "5", type: "email", message: "Follow-up email sent to 3 leads", time: "3h ago" },
  { id: "6", type: "deal", message: "'Website Redesign' moved to Proposal — $8,200", time: "5h ago" },
];

export default function RecentActivity() {
  return (
    <div className="stat-card">
      <h3 className="text-sm font-medium mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {demoActivities.map((activity) => {
          const Icon = typeIcons[activity.type];
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${typeColors[activity.type]}18` }}
              >
                <Icon size={14} style={{ color: typeColors[activity.type] }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{activity.message}</p>
                <p className="text-xs text-text-muted">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
