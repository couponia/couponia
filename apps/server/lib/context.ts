import { PrismaClient, User } from "@prisma/client";
import { Admin } from "@admin/client";
import { PrismaClient as AdminPrismaClient } from "@admin/client";
export default interface CouponiaContext {
   user?: User,
   adminUser?: Admin,
   db?: PrismaClient,
   adminDb?: AdminPrismaClient,
   req?: Request,
   res?: Response,
   ip?: string,
   userAgent?: string,
   referer?: string,
   path?: string,
   method?: string,
   body?: any,
   query?: any,
   
}