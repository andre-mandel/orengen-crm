"use client";

import { useState, useEffect, useCallback } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import AddTaskModal from "@/components/AddTaskModal";
import { useTenant } from "@/components/TenantProvider";
import { Plus } from "lucide-react";

type Task = { id: string; title: string; status: string; priority: string; assignee: { name: string } | null };

const STATUS_COLUMNS = [
  { id: "todo", status: "TODO", title: "To Do", color: "#6366f1" },
  { id: "in-progress", status: "IN_PROGRESS", title: "In Progress", color: "#f59e0b" },
  { id: "review", status: "REVIEW", title: "Review", color: "#a855f7" },
  { id: "done", status: "DONE", title: "Done", color: "#22c55e" },
];

export default function TasksPage() {
  const { tenant } = useTenant();
  const brandColor = tenant?.brandColor || "#6366f1";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState<string | null>(null);

  const loadTasks = useCallback(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setTasks(data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const columns = STATUS_COLUMNS.map((col) => ({
    ...col,
    cards: tasks
      .filter((t) => t.status === col.status)
      .map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
        assignee: t.assignee?.name,
      })),
  }));

  const statusFromColId = (colId: string) =>
    STATUS_COLUMNS.find((c) => c.id === colId)?.status || "TODO";

  const handleCardMove = async (cardId: string, _from: string, toCol: string) => {
    const newStatus = statusFromColId(toCol);
    setTasks((prev) => prev.map((t) => (t.id === cardId ? { ...t, status: newStatus } : t)));

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cardId, status: newStatus }),
    });
  };

  const handleAddTask = async (task: { title: string; priority: string; status: string; description: string }) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (res.ok) loadTasks();
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "DONE").length;

  if (loading) {
    return (
      <div className="h-[calc(100vh-48px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-text-secondary mt-1">{doneTasks}/{totalTasks} completed</p>
        </div>
        <button onClick={() => setAddModal("todo")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-brand hover:opacity-90 transition-opacity">
          <Plus size={16} /> Add Task
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          columns={columns}
          onCardMove={handleCardMove}
          onAddCard={(colId) => setAddModal(colId)}
          brandColor={brandColor}
        />
      </div>
      {addModal && (
        <AddTaskModal brandColor={brandColor} columnId={addModal} onClose={() => setAddModal(null)} onAdd={handleAddTask} />
      )}
    </div>
  );
}
