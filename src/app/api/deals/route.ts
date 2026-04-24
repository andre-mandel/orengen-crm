import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

  const deals = await prisma.deal.findMany({
    where: { tenantId },
    include: { contact: true, owner: true, stage: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(deals);
}

export async function POST(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

  const body = await req.json();
  const deal = await prisma.deal.create({
    data: {
      title: body.title,
      value: body.value || 0,
      stageId: body.stageId,
      pipelineId: body.pipelineId,
      contactId: body.contactId,
      ownerId: body.ownerId,
      tenantId,
      notes: body.notes,
    },
  });

  return NextResponse.json(deal, { status: 201 });
}
