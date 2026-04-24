"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  stageId: string;
  stageName: string;
  brandColor: string;
  onClose: () => void;
  onAdd: (deal: { title: string; value: number; notes: string; stageId: string }) => void;
};

export default function AddDealModal({ stageId, stageName, brandColor, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), value: parseFloat(value) || 0, notes, stageId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Deal — {stageName}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">Deal Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
              placeholder="e.g. Website Redesign"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Value ($)</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand resize-none"
              placeholder="Optional notes..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: brandColor }}
          >
            Add Deal
          </button>
        </form>
      </div>
    </div>
  );
}
