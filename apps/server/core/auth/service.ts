import { db } from "../../lib/database";
import { PrismaClient } from "@prisma/client";
import { PrismaClient as AdminPrismaClient } from "@admin/client";

export const AuthService = {
   async login(email: string, password: string) {
      const user = await db.user.findUnique({
         where: { email },
      });
      if (!user) {
         return {
            success: false,
            message: "User not found",
         };
      }
      return {
         success: true,
         message: "User logged in",
      };
   },
   async register(email: string, password: string) {
      const user = await db.user.create({
         data: { email, authStore: { create: { hash: password } } },
      });
      return user;
   },

   async isAuthenticated({ authorization,db }: { authorization: string, db: PrismaClient | AdminPrismaClient | undefined }) {
     try {
        if (db instanceof AdminPrismaClient) {
           const user = await db.admin.findUnique({
              where: { email: authorization },
           });
           return user;
        }
        const user = await db?.user.findUnique({
           where: { email: authorization },
        });
        return user;
     } catch (error) {
        return null;
     }
   },
};
