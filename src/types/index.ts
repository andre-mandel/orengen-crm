export type DealWithRelations = {
  id: string;
  title: string;
  value: number;
  currency: string;
  stageId: string;
  pipelineId: string;
  contactId: string | null;
  ownerId: string | null;
  tenantId: string;
  notes: string | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  contact?: { id: string; name: string; email: string | null } | null;
  owner?: { id: string; name: string | null } | null;
};

export type StageWithDeals = {
  id: string;
  name: string;
  order: number;
  color: string;
  pipelineId: string;
  deals: DealWithRelations[];
};

export type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: Date | null;
  assigneeId: string | null;
  assignee?: { id: string; name: string | null } | null;
  createdAt: Date;
};

export type BrandConfig = {
  name: string;
  logo: string | null;
  color: string;
  slug: string;
};
