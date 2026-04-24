"use client";

import { useState } from "react";
import KanbanBoard from "@/components/KanbanBoard";

const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR || "#6366f1";

const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    color: "#6366f1",
    cards: [
      { id: "t1", title: "Set up Twilio SMS workflows", priority: "HIGH", assignee: "Andre" },
      { id: "t2", title: "Design client onboarding flow", priority: "MEDIUM", assignee: "VA" },
      { id: "t3", title: "Configure Stripe subscription plans", priority: "HIGH" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#f59e0b",
    cards: [
      { id: "t4", title: "Build landing page for AI SMS", priority: "URGENT", assignee: "Andre" },
      { id: "t5", title: "CrewAI agent for lead scoring", priority: "MEDIUM" },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "#a855f7",
    cards: [
      { id: "t6", title: "VAPI voice bot script", priority: "MEDIUM", assignee: "Andre" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#22c55e",
    cards: [
      { id: "t7", title: "Deploy CRM to Coolify", priority: "HIGH", assignee: "Andre" },
      { id: "t8", title: "Connect Cal.com webhook", priority: "LOW" },
    ],
  },
];

export default function TasksPage() {
  const [columns, setColumns] = useState(initialColumns);

  const handleCardMove = (cardId: string, fromCol: string, toCol: string) => {
    setColumns((prev) => {
      const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
      const srcCol = next.find((c) => c.id === fromCol);
      const dstCol = next.find((c) => c.id === toCol);
      if (!srcCol || !dstCol) return prev;
      const idx = srcCol.cards.findIndex((c) => c.id === cardId);
      if (idx === -1) return prev;
      const [card] = srcCol.cards.splice(idx, 1);
      dstCol.cards.push(card);
      return next;
    });
  };

  const totalTasks = columns.reduce((n, c) => n + c.cards.length, 0);
  const doneTasks = columns.find((c) => c.id === "done")?.cards.length || 0;

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-text-secondary mt-1">
            {doneTasks}/{totalTasks} completed
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard columns={columns} onCardMove={handleCardMove} brandColor={BRAND_COLOR} />
      </div>
    </div>
  );
}
