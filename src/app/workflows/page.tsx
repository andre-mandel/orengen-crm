"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap, Play, Pause, Plus, ArrowRight, Mail, Bot, Calendar, CreditCard, Mic } from "lucide-react";
import { clsx } from "clsx";

type Workflow = {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  active: boolean;
  _count: { runs: number };
  createdAt: string;
};

const triggerIcons: Record<string, typeof Zap> = {
  "contact.created": Mail,
  "calcom.booking.created": Calendar,
  "deal.closed_won": CreditCard,
  "vapi.call.completed": Mic,
  "crewai.score.complete": Bot,
};

const triggerLabels: Record<string, string> = {
  "contact.created": "New contact form submission",
  "calcom.booking.created": "Cal.com booking created",
  "deal.closed_won": "Deal moved to Closed Won",
  "vapi.call.completed": "VAPI call completed",
  "crewai.score.complete": "CrewAI lead score complete",
  manual: "Manual trigger",
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setWorkflows(data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (id: string, current: boolean) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, active: !current } : w)));
    await fetch("/api/workflows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !current }),
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Workflows</h1>
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="stat-card h-20 animate-pulse" />)}</div>
      </div>
    );
  }

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
          const TriggerIcon = triggerIcons[wf.trigger] || Zap;
          const triggerLabel = triggerLabels[wf.trigger] || wf.trigger;
          const actions = Array.isArray(wf.actions) ? wf.actions : [];
          return (
            <div
              key={wf.id}
              className={clsx("stat-card flex items-center gap-4 transition-opacity", !wf.active && "opacity-50")}
            >
              <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{wf.name}</p>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-text-secondary">
                  <TriggerIcon size={12} />
                  <span>{triggerLabel}</span>
                  <ArrowRight size={10} className="text-text-muted" />
                  <span>{actions.length} actions</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{wf._count.runs} runs</p>
              </div>
              <button
                onClick={() => toggleActive(wf.id, wf.active)}
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
        {workflows.length === 0 && (
          <div className="stat-card text-center py-8 text-text-muted">No workflows yet</div>
        )}
      </div>
    </div>
  );
}
