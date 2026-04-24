"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  brandColor: string;
  columnId?: string;
  onClose: () => void;
  onAdd: (task: { title: string; priority: string; status: string; description: string }) => void;
};

export default function AddTaskModal({ brandColor, columnId, onClose, onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [description, setDescription] = useState("");

  const statusMap: Record<string, string> = { todo: "TODO", "in-progress": "IN_PROGRESS", review: "REVIEW", done: "DONE" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority, status: statusMap[columnId || ""] || "TODO", description });
    onClose();
  };

  const inputClass = "w-full bg-surface-overlay border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New Task</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Task title" autoFocus />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className={inputClass}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Optional description..." />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: brandColor }}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
