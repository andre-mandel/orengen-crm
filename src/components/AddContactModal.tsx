"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  brandColor: string;
  onClose: () => void;
  onAdd: (contact: { name: string; email: string; phone: string; company: string; source: string }) => void;
};

const sources = ["Inbound", "Referral", "Website", "Cold Outreach", "LinkedIn", "Conference", "Other"];

export default function AddContactModal({ brandColor, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("Inbound");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), email, phone, company, source });
    onClose();
  };

  const inputClass = "w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Contact</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Full name" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputClass} placeholder="email@company.com" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="+1 555-0100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Company</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} placeholder="Company name" />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Source</label>
              <select value={source} onChange={(e) => setSource(e.target.value)} className={inputClass}>
                {sources.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: brandColor }}
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
}
