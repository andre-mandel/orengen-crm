"use client";

import { useState, useEffect, useCallback } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import AddDealModal from "@/components/AddDealModal";
import { useTenant } from "@/components/TenantProvider";

type Stage = { id: string; name: string; color: string; order: number; deals: Deal[] };
type Deal = { id: string; title: string; value: number; notes: string | null; contact: { name: string } | null; owner: { name: string } | null };
type Pipeline = { id: string; name: string; stages: Stage[] };

export default function PipelinePage() {
  const { tenant } = useTenant();
  const brandColor = tenant?.brandColor || "#6366f1";
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [addModal, setAddModal] = useState<{ stageId: string; stageName: string } | null>(null);

  const loadPipeline = useCallback(() => {
    fetch("/api/pipeline").then((r) => r.json()).then(setPipeline);
  }, []);

  useEffect(() => { loadPipeline(); }, [loadPipeline]);

  const columns = pipeline
    ? pipeline.stages.map((stage) => ({
        id: stage.id,
        title: stage.name,
        color: stage.color,
        cards: stage.deals.map((deal) => ({
          id: deal.id,
          title: deal.contact?.name || deal.title,
          subtitle: deal.title,
          value: deal.value,
          assignee: deal.owner?.name,
          tags: [] as string[],
        })),
      }))
    : [];

  const handleCardMove = async (cardId: string, _fromCol: string, toCol: string) => {
    setPipeline((prev) => {
      if (!prev) return prev;
      const stages = prev.stages.map((s) => ({ ...s, deals: [...s.deals] }));
      let movedDeal: Deal | undefined;
      for (const stage of stages) {
        const idx = stage.deals.findIndex((d) => d.id === cardId);
        if (idx !== -1) { [movedDeal] = stage.deals.splice(idx, 1); break; }
      }
      if (movedDeal) {
        const dst = stages.find((s) => s.id === toCol);
        if (dst) dst.deals.push(movedDeal);
      }
      return { ...prev, stages };
    });

    await fetch("/api/deals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cardId, stageId: toCol }),
    });
  };

  const handleAddCard = (columnId: string) => {
    const stage = pipeline?.stages.find((s) => s.id === columnId);
    if (stage) setAddModal({ stageId: stage.id, stageName: stage.name });
  };

  const handleAddDeal = async (deal: { title: string; value: number; notes: string; stageId: string }) => {
    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deal),
    });
    if (res.ok) loadPipeline();
  };

  const totalDeals = pipeline ? pipeline.stages.reduce((n, s) => n + s.deals.length, 0) : 0;
  const totalValue = pipeline ? pipeline.stages.reduce((sum, s) => sum + s.deals.reduce((v, d) => v + d.value, 0), 0) : 0;

  if (!pipeline) {
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
          <h1 className="text-2xl font-semibold">Deal Pipeline</h1>
          <p className="text-sm text-text-secondary mt-1">
            {totalDeals} deals &middot; ${totalValue.toLocaleString()} total value
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard columns={columns} onCardMove={handleCardMove} onAddCard={handleAddCard} brandColor={brandColor} />
      </div>
      {addModal && (
        <AddDealModal
          stageId={addModal.stageId}
          stageName={addModal.stageName}
          brandColor={brandColor}
          onClose={() => setAddModal(null)}
          onAdd={handleAddDeal}
        />
      )}
    </div>
  );
}
