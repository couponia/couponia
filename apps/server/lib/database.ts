import { PrismaClient } from "@prisma/client";
import { PrismaClient as AdminPrismaClient } from "@admin/client";

declare global {
   interface CouponiaContext {
      db: PrismaClient,
      adminDb: AdminPrismaClient,
   }
   var db: PrismaClient;
   var adminDb: AdminPrismaClient;
}

export const db = new PrismaClient();
export const adminDb = new AdminPrismaClient();

if (process.env.NODE_ENV !== "production") {
   global.db = db;
   global.adminDb = adminDb;
}