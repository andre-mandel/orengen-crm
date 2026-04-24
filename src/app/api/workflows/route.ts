import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    const workflows = await prisma.workflow.findMany({
      where: { tenantId },
      include: { _count: { select: { runs: true } } },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(workflows);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getDefaultTenantId();
    const body = await req.json();
    if (!body.name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const workflow = await prisma.workflow.create({
      data: {
        name: body.name.trim(),
        trigger: body.trigger || "manual",
        actions: body.actions || [],
        active: body.active ?? true,
        tenantId,
      },
    });
    return NextResponse.json(workflow, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const workflow = await prisma.workflow.update({
      where: { id: body.id },
      data: {
        ...(body.active !== undefined && { active: body.active }),
        ...(body.name !== undefined && { name: body.name }),
        ...(body.trigger !== undefined && { trigger: body.trigger }),
        ...(body.actions !== undefined && { actions: body.actions }),
      },
    });
    return NextResponse.json(workflow);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
