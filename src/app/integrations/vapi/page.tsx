"use client";

import { Mic, PhoneCall, Clock, BarChart3 } from "lucide-react";

export default function VAPIPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Mic size={24} className="text-pink-400" /> VAPI Voice AI
        </h1>
        <p className="text-sm text-text-secondary mt-1">AI voice agents for calls and follow-ups</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <PhoneCall size={20} className="mx-auto text-pink-400 mb-2" />
          <p className="text-xl font-semibold">34</p>
          <p className="text-xs text-text-secondary">Calls Today</p>
        </div>
        <div className="stat-card text-center">
          <Clock size={20} className="mx-auto text-pink-400 mb-2" />
          <p className="text-xl font-semibold">4:32</p>
          <p className="text-xs text-text-secondary">Avg Duration</p>
        </div>
        <div className="stat-card text-center">
          <BarChart3 size={20} className="mx-auto text-pink-400 mb-2" />
          <p className="text-xl font-semibold">72%</p>
          <p className="text-xs text-text-secondary">Conversion</p>
        </div>
      </div>

      <div className="stat-card">
        <p className="text-sm text-text-muted">Connect VAPI credentials in Settings to see live call data and transcripts</p>
      </div>
    </div>
  );
}
