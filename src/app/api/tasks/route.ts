import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

const VALID_STATUS = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;
const VALID_PRIORITY = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    const tasks = await prisma.task.findMany({
      where: { tenantId },
      include: { assignee: { select: { id: true, name: true } } },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getDefaultTenantId();
    const body = await req.json();
    if (!body.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const status = VALID_STATUS.includes(body.status) ? body.status : "TODO";
    const priority = VALID_PRIORITY.includes(body.priority) ? body.priority : "MEDIUM";

    const task = await prisma.task.create({
      data: {
        title: body.title.trim(),
        description: body.description || null,
        status,
        priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        assigneeId: body.assigneeId || null,
        tenantId,
      },
      include: { assignee: { select: { id: true, name: true } } },
    });
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const data: Record<string, unknown> = {};
    if (body.status && VALID_STATUS.includes(body.status)) data.status = body.status;
    if (body.priority && VALID_PRIORITY.includes(body.priority)) data.priority = body.priority;
    if (body.title !== undefined) data.title = body.title;
    if (body.description !== undefined) data.description = body.description;

    const task = await prisma.task.update({
      where: { id: body.id },
      data,
      include: { assignee: { select: { id: true, name: true } } },
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
