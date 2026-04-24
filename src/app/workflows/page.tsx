"use client";

import { useState } from "react";
import { Zap, Play, Pause, Plus, ArrowRight, Phone, Mail, Bot, Calendar, CreditCard, Mic } from "lucide-react";
import { clsx } from "clsx";

type Workflow = {
  id: string;
  name: string;
  trigger: string;
  triggerIcon: typeof Zap;
  actions: string[];
  active: boolean;
  runs: number;
  lastRun: string;
};

const demoWorkflows: Workflow[] = [
  {
    id: "w1",
    name: "New Lead → SMS + CRM",
    trigger: "New contact form submission",
    triggerIcon: Mail,
    actions: ["Add to CRM pipeline", "Send Twilio SMS welcome", "Trigger n8n lead score"],
    active: true,
    runs: 142,
    lastRun: "5m ago",
  },
  {
    id: "w2",
    name: "Booking Confirmed → Prep",
    trigger: "Cal.com booking created",
    triggerIcon: Calendar,
    actions: ["Create task in CRM", "Send SMS reminder", "Notify Slack"],
    active: true,
    runs: 89,
    lastRun: "2h ago",
  },
  {
    id: "w3",
    name: "Deal Won → Invoice",
    trigger: "Deal moved to Closed Won",
    triggerIcon: CreditCard,
    actions: ["Create Stripe invoice", "Send welcome email", "Update analytics"],
    active: true,
    runs: 34,
    lastRun: "1d ago",
  },
  {
    id: "w4",
    name: "VAPI Call → Follow Up",
    trigger: "VAPI call completed",
    triggerIcon: Mic,
    actions: ["Log call in CRM", "CrewAI sentiment analysis", "Schedule follow-up task"],
    active: false,
    runs: 12,
    lastRun: "3d ago",
  },
  {
    id: "w5",
    name: "Lead Score → Assign",
    trigger: "CrewAI lead score complete",
    triggerIcon: Bot,
    actions: ["Update contact score", "Auto-assign to rep", "Send personalized SMS"],
    active: true,
    runs: 67,
    lastRun: "30m ago",
  },
];

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState(demoWorkflows);

  const toggleActive = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Workflows</h1>
          <p className="text-sm text-text-secondary mt-1">
            {workflows.filter((w) => w.active).length} active automations
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
          <Plus size={16} /> New Workflow
        </button>
      </div>

      <div className="space-y-3">
        {workflows.map((wf) => {
          const TriggerIcon = wf.triggerIcon;
          return (
            <div
              key={wf.id}
              className={clsx(
                "stat-card flex items-center gap-4 transition-opacity",
                !wf.active && "opacity-50"
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-brand" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{wf.name}</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-text-secondary">
                  <TriggerIcon size={12} />
                  <span>{wf.trigger}</span>
                  <ArrowRight size={10} className="text-text-muted" />
                  <span>{wf.actions.length} actions</span>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{wf.runs} runs</p>
                <p className="text-xs text-text-muted">Last: {wf.lastRun}</p>
              </div>

              <button
                onClick={() => toggleActive(wf.id)}
                className={clsx(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                  wf.active
                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    : "bg-surface-overlay text-text-muted hover:text-text-primary"
                )}
              >
                {wf.active ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
