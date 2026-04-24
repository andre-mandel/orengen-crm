"use client";

import { Calendar, Clock, Users } from "lucide-react";

export default function CalcomPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Calendar size={24} className="text-orange-400" /> Cal.com
        </h1>
        <p className="text-sm text-text-secondary mt-1">Bookings and scheduling</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <Calendar size={20} className="mx-auto text-orange-400 mb-2" />
          <p className="text-xl font-semibold">8</p>
          <p className="text-xs text-text-secondary">This Week</p>
        </div>
        <div className="stat-card text-center">
          <Clock size={20} className="mx-auto text-orange-400 mb-2" />
          <p className="text-xl font-semibold">3</p>
          <p className="text-xs text-text-secondary">Today</p>
        </div>
        <div className="stat-card text-center">
          <Users size={20} className="mx-auto text-orange-400 mb-2" />
          <p className="text-xl font-semibold">92%</p>
          <p className="text-xs text-text-secondary">Show Rate</p>
        </div>
      </div>

      <div className="stat-card">
        <p className="text-sm text-text-muted">Connect Cal.com API key in Settings to see live bookings</p>
      </div>
    </div>
  );
}
