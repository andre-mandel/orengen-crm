import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    const deals = await prisma.deal.findMany({
      where: { tenantId },
      include: { contact: true, owner: true, stage: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(deals);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getDefaultTenantId();
    const body = await req.json();
    if (!body.title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
    if (!body.stageId) return NextResponse.json({ error: "Stage is required" }, { status: 400 });

    let pipelineId = body.pipelineId;
    if (!pipelineId) {
      const pipeline = await prisma.pipeline.findFirst({ where: { tenantId } });
      if (!pipeline) return NextResponse.json({ error: "No pipeline" }, { status: 400 });
      pipelineId = pipeline.id;
    }

    const deal = await prisma.deal.create({
      data: {
        title: body.title.trim(),
        value: Number(body.value) || 0,
        stageId: body.stageId,
        pipelineId,
        contactId: body.contactId || null,
        ownerId: body.ownerId || null,
        tenantId,
        notes: body.notes || null,
      },
      include: { contact: true, owner: true, stage: true },
    });
    return NextResponse.json(deal, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const deal = await prisma.deal.update({
      where: { id: body.id },
      data: {
        ...(body.stageId !== undefined && { stageId: body.stageId }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.value !== undefined && { value: Number(body.value) }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { contact: true, owner: true, stage: true },
    });
    return NextResponse.json(deal);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
