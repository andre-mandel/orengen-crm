import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

  const contacts = await prisma.contact.findMany({
    where: { tenantId },
    include: { deals: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");
  if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

  const body = await req.json();
  const contact = await prisma.contact.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      source: body.source,
      tags: body.tags || [],
      notes: body.notes,
      tenantId,
    },
  });

  return NextResponse.json(contact, { status: 201 });
}
