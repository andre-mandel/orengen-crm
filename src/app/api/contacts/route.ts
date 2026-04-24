import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

    const contacts = await prisma.contact.findMany({
      where: { tenantId },
      include: { deals: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId) return NextResponse.json({ error: "Missing tenant" }, { status: 400 });

    const body = await req.json();
    if (!body.name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const contact = await prisma.contact.create({
      data: {
        name: body.name.trim(),
        email: body.email || null,
        phone: body.phone || null,
        company: body.company || null,
        source: body.source || null,
        tags: body.tags || [],
        notes: body.notes || null,
        tenantId,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
