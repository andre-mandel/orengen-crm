"use client";

import { useState } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import AddDealModal from "@/components/AddDealModal";

const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR || "#6366f1";

const initialColumns = [
  {
    id: "new-lead",
    title: "New Lead",
    color: "#6366f1",
    cards: [
      { id: "d1", title: "Marcus Lee", subtitle: "AI Chatbot Build", value: 8500, tags: ["Inbound"], priority: "HIGH" },
      { id: "d2", title: "Sarah Chen", subtitle: "Website Redesign", value: 12000, tags: ["Referral"] },
    ],
  },
  {
    id: "contacted",
    title: "Contacted",
    color: "#3b82f6",
    cards: [
      { id: "d3", title: "Apex Corp", subtitle: "CRM Integration", value: 25000, tags: ["Enterprise"], priority: "URGENT" },
    ],
  },
  {
    id: "discovery",
    title: "Discovery",
    color: "#f59e0b",
    cards: [
      { id: "d4", title: "Luna Wellness", subtitle: "Booking System", value: 6200, tags: ["SMB"], priority: "MEDIUM" },
    ],
  },
  {
    id: "proposal",
    title: "Proposal",
    color: "#a855f7",
    cards: [
      { id: "d5", title: "DevHouse Inc", subtitle: "Full Stack App", value: 45000, tags: ["Enterprise"], priority: "HIGH" },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    color: "#ec4899",
    cards: [],
  },
  {
    id: "closed-won",
    title: "Closed Won",
    color: "#22c55e",
    cards: [
      { id: "d6", title: "Bright Dental", subtitle: "SMS Automation", value: 3800, tags: ["Closed"] },
    ],
  },
];

export default function PipelinePage() {
  const [columns, setColumns] = useState(initialColumns);
  const [addModal, setAddModal] = useState<{ stageId: string; stageName: string } | null>(null);

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

  const handleAddCard = (columnId: string) => {
    const col = columns.find((c) => c.id === columnId);
    if (col) setAddModal({ stageId: col.id, stageName: col.title });
  };

  const handleAddDeal = (deal: { title: string; value: number; notes: string; stageId: string }) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === deal.stageId
          ? {
              ...col,
              cards: [
                ...col.cards,
                {
                  id: `d-${Date.now()}`,
                  title: deal.title,
                  subtitle: deal.notes || "",
                  value: deal.value,
                  tags: ["New"],
                },
              ],
            }
          : col
      )
    );
  };

  const totalValue = columns.reduce(
    (sum, col) => sum + col.cards.reduce((s, c) => s + (c.value || 0), 0),
    0
  );

  return (
    <div className="h-[calc(100vh-48px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Deal Pipeline</h1>
          <p className="text-sm text-text-secondary mt-1">
            {columns.reduce((n, c) => n + c.cards.length, 0)} deals &middot; ${totalValue.toLocaleString()} total value
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          columns={columns}
          onCardMove={handleCardMove}
          onAddCard={handleAddCard}
          brandColor={BRAND_COLOR}
        />
      </div>
      {addModal && (
        <AddDealModal
          stageId={addModal.stageId}
          stageName={addModal.stageName}
          brandColor={BRAND_COLOR}
          onClose={() => setAddModal(null)}
          onAdd={handleAddDeal}
        />
      )}
    </div>
  );
}
