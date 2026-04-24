import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDefaultTenantId } from "@/lib/tenant";

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();

    const [contacts, deals, tasks] = await Promise.all([
      prisma.contact.count({ where: { tenantId } }),
      prisma.deal.findMany({ where: { tenantId }, select: { value: true } }),
      prisma.task.findMany({ where: { tenantId }, select: { status: true } }),
    ]);

    const totalRevenue = deals.reduce((sum, d) => sum + d.value, 0);
    const activeDeals = deals.length;
    const tasksCompleted = tasks.filter((t) => t.status === "DONE").length;
    const totalTasks = tasks.length;

    return NextResponse.json({
      totalRevenue,
      activeDeals,
      contacts,
      tasksCompleted,
      totalTasks,
    });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
