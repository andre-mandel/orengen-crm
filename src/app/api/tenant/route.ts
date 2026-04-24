import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const tenant = await prisma.tenant.findFirst({
      select: { id: true, name: true, slug: true, brandColor: true, logo: true, domain: true },
    });
    if (!tenant) return NextResponse.json({ error: "No tenant" }, { status: 404 });
    return NextResponse.json(tenant);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const tenant = await prisma.tenant.findFirst();
    if (!tenant) return NextResponse.json({ error: "No tenant" }, { status: 404 });

    const body = await req.json();
    const updated = await prisma.tenant.update({
      where: { id: tenant.id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.brandColor !== undefined && { brandColor: body.brandColor }),
        ...(body.logo !== undefined && { logo: body.logo }),
        ...(body.domain !== undefined && { domain: body.domain || null }),
      },
      select: { id: true, name: true, slug: true, brandColor: true, logo: true, domain: true },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
