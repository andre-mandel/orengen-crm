"use client";

import { CreditCard, DollarSign, TrendingUp } from "lucide-react";

export default function StripePage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <CreditCard size={24} className="text-blue-400" /> Stripe
        </h1>
        <p className="text-sm text-text-secondary mt-1">Payments, invoices, and subscriptions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <DollarSign size={20} className="mx-auto text-blue-400 mb-2" />
          <p className="text-xl font-semibold">$12,480</p>
          <p className="text-xs text-text-secondary">This Month</p>
        </div>
        <div className="stat-card text-center">
          <CreditCard size={20} className="mx-auto text-blue-400 mb-2" />
          <p className="text-xl font-semibold">23</p>
          <p className="text-xs text-text-secondary">Active Subs</p>
        </div>
        <div className="stat-card text-center">
          <TrendingUp size={20} className="mx-auto text-emerald-400 mb-2" />
          <p className="text-xl font-semibold">+18%</p>
          <p className="text-xs text-text-secondary">MRR Growth</p>
        </div>
      </div>

      <div className="stat-card">
        <p className="text-sm text-text-muted">Connect Stripe credentials in Settings to see live data</p>
      </div>
    </div>
  );
}
