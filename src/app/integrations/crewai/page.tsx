"use client";

import { Bot, Zap, Brain } from "lucide-react";

export default function CrewAIPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Bot size={24} className="text-violet-400" /> CrewAI
        </h1>
        <p className="text-sm text-text-secondary mt-1">AI agent crews for lead scoring, research, and automation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <Bot size={20} className="mx-auto text-violet-400 mb-2" />
          <p className="text-xl font-semibold">3</p>
          <p className="text-xs text-text-secondary">Active Crews</p>
        </div>
        <div className="stat-card text-center">
          <Zap size={20} className="mx-auto text-violet-400 mb-2" />
          <p className="text-xl font-semibold">142</p>
          <p className="text-xs text-text-secondary">Runs Today</p>
        </div>
        <div className="stat-card text-center">
          <Brain size={20} className="mx-auto text-violet-400 mb-2" />
          <p className="text-xl font-semibold">87%</p>
          <p className="text-xs text-text-secondary">Accuracy</p>
        </div>
      </div>

      <div className="stat-card space-y-3">
        <h2 className="text-sm font-medium">Available Crews</h2>
        {[
          { name: "Lead Scorer", desc: "Scores inbound leads based on fit and intent signals", status: "Active" },
          { name: "Research Agent", desc: "Enriches contacts with company and social data", status: "Active" },
          { name: "Outreach Writer", desc: "Generates personalized follow-up sequences", status: "Paused" },
        ].map((crew) => (
          <div key={crew.name} className="flex items-center gap-3 p-3 rounded-lg bg-surface-overlay">
            <Bot size={16} className="text-violet-400" />
            <div className="flex-1">
              <p className="text-sm font-medium">{crew.name}</p>
              <p className="text-xs text-text-muted">{crew.desc}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${crew.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-surface-overlay text-text-muted border border-border"}`}>
              {crew.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
