import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const VALID_STATUS = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
const VALID_PRIORITY = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

    const tasks = await prisma.task.findMany({
      where: { tenantId },
      include: { assignee: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

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
    });

    return NextResponse.json(task, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
