import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

    const deals = await prisma.deal.findMany({
      where: { tenantId },
      include: { contact: true, owner: true, stage: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(deals);
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
    if (!body.stageId) return NextResponse.json({ error: "Stage is required" }, { status: 400 });
    if (!body.pipelineId) return NextResponse.json({ error: "Pipeline is required" }, { status: 400 });

    const deal = await prisma.deal.create({
      data: {
        title: body.title.trim(),
        value: Number(body.value) || 0,
        stageId: body.stageId,
        pipelineId: body.pipelineId,
        contactId: body.contactId || null,
        ownerId: body.ownerId || null,
        tenantId,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(deal, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
