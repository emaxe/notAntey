import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const url = new URL(process.env["DATABASE_URL"]!);
  const pool = new Pool({
    host: url.hostname,
    port: Number(url.port),
    database: url.pathname.slice(1),
    user: url.username,
    password: url.password,
  });
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
