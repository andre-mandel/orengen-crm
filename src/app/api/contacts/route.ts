import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    const contacts = await prisma.contact.findMany({
      where: { tenantId },
      include: { deals: { select: { id: true, value: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const tenantId = await getDefaultTenantId();
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
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.contact.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
