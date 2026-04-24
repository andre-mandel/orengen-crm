import { PrismaClient } from "@/generated/prisma";

let prismaInstance: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new (PrismaClient as new (opts?: Record<string, unknown>) => PrismaClient)({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
    });
  }
  return prismaInstance;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return (getPrisma() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
