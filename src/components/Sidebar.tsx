"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Kanban,
  Users,
  CheckSquare,
  Workflow,
  Settings,
  Phone,
  CreditCard,
  Calendar,
  Bot,
  Mic,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { divider: true },
  { href: "/integrations/twilio", label: "Twilio SMS", icon: Phone },
  { href: "/integrations/stripe", label: "Stripe", icon: CreditCard },
  { href: "/integrations/calcom", label: "Cal.com", icon: Calendar },
  { href: "/integrations/crewai", label: "CrewAI", icon: Bot },
  { href: "/integrations/vapi", label: "VAPI", icon: Mic },
  { divider: true },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export default function Sidebar({ brandName, brandColor }: { brandName: string; brandColor: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 h-screen flex flex-col border-r border-border transition-all duration-200 z-50",
        collapsed ? "w-16" : "w-56"
      )}
      style={{ background: "var(--color-surface)" }}
    >
      <div className="flex items-center gap-2 px-4 h-14 border-b border-border">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: brandColor }}
        >
          {brandName[0]}
        </div>
        {!collapsed && <span className="font-semibold text-sm truncate">{brandName}</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-text-muted hover:text-text-primary"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {nav.map((item, i) => {
          if ("divider" in item) {
            return <div key={i} className="my-2 mx-3 border-t border-border" />;
          }
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm transition-colors",
                active
                  ? "text-white"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-overlay"
              )}
              style={active ? { background: `${brandColor}22`, color: brandColor } : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
