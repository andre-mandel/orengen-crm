import { prisma } from "./db";

let cachedTenantId: string | null = null;

export async function getDefaultTenantId(): Promise<string> {
  if (cachedTenantId) return cachedTenantId;
  const tenant = await prisma.tenant.findFirst();
  if (!tenant) throw new Error("No tenant configured. Run: npx prisma db seed");
  cachedTenantId = tenant.id;
  return tenant.id;
}

export async function resolveTenantId(
  headerValue?: string | null
): Promise<string> {
  if (headerValue) return headerValue;
  return getDefaultTenantId();
}
