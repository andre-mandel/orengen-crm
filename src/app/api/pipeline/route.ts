import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    const pipeline = await prisma.pipeline.findFirst({
      where: { tenantId },
      include: {
        stages: {
          orderBy: { order: "asc" },
          include: {
            deals: {
              include: { contact: true, owner: true },
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });
    if (!pipeline) return NextResponse.json({ error: "No pipeline" }, { status: 404 });
    return NextResponse.json(pipeline);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
