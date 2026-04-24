"use client";

import { useState, useCallback } from "react";
import { clsx } from "clsx";
import { Plus, GripVertical, MoreHorizontal, DollarSign, User } from "lucide-react";

type Card = {
  id: string;
  title: string;
  subtitle?: string;
  value?: number;
  tags?: string[];
  assignee?: string;
  priority?: string;
};

type Column = {
  id: string;
  title: string;
  color: string;
  cards: Card[];
};

type Props = {
  columns: Column[];
  onCardMove: (cardId: string, fromCol: string, toCol: string) => void;
  onAddCard?: (columnId: string) => void;
  renderCard?: (card: Card) => React.ReactNode;
  brandColor: string;
};

const priorityColors: Record<string, string> = {
  URGENT: "#ef4444",
  HIGH: "#f59e0b",
  MEDIUM: "#6366f1",
  LOW: "#64748b",
};

export default function KanbanBoard({ columns, onCardMove, onAddCard, brandColor }: Props) {
  const [dragCard, setDragCard] = useState<{ id: string; fromCol: string } | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const handleDragStart = useCallback((cardId: string, fromCol: string) => {
    setDragCard({ id: cardId, fromCol });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOverCol(colId);
  }, []);

  const handleDrop = useCallback(
    (toCol: string) => {
      if (dragCard && dragCard.fromCol !== toCol) {
        onCardMove(dragCard.id, dragCard.fromCol, toCol);
      }
      setDragCard(null);
      setDragOverCol(null);
    },
    [dragCard, onCardMove]
  );

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {columns.map((col) => (
        <div
          key={col.id}
          className={clsx(
            "flex flex-col min-w-[280px] w-[300px] rounded-xl border transition-colors shrink-0",
            dragOverCol === col.id ? "border-brand" : "border-border"
          )}
          style={{ background: "var(--color-surface-raised)" }}
          onDragOver={(e) => handleDragOver(e, col.id)}
          onDragLeave={() => setDragOverCol(null)}
          onDrop={() => handleDrop(col.id)}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
            <span className="text-sm font-medium">{col.title}</span>
            <span className="text-xs text-text-muted ml-1">{col.cards.length}</span>
            {onAddCard && (
              <button
                onClick={() => onAddCard(col.id)}
                className="ml-auto text-text-muted hover:text-text-primary"
              >
                <Plus size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {col.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(card.id, col.id)}
                className={clsx(
                  "glass glass-hover rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all",
                  dragCard?.id === card.id && "opacity-50"
                )}
              >
                <div className="flex items-start gap-2">
                  <GripVertical size={14} className="text-text-muted mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{card.title}</p>
                    {card.subtitle && (
                      <p className="text-xs text-text-secondary mt-0.5 truncate">{card.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {card.value !== undefined && (
                        <span className="flex items-center gap-0.5 text-xs text-text-secondary">
                          <DollarSign size={12} />
                          {card.value.toLocaleString()}
                        </span>
                      )}
                      {card.assignee && (
                        <span className="flex items-center gap-0.5 text-xs text-text-secondary">
                          <User size={12} />
                          {card.assignee}
                        </span>
                      )}
                      {card.priority && (
                        <span
                          className="w-1.5 h-1.5 rounded-full ml-auto"
                          style={{ background: priorityColors[card.priority] || "#64748b" }}
                        />
                      )}
                    </div>
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{ background: `${brandColor}22`, color: brandColor }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="text-text-muted hover:text-text-primary shrink-0">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
