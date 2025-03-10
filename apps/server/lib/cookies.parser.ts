import { AuthService } from "@/core/auth/service";
import { PrismaClient } from "@prisma/client/default";
import { PrismaClient as AdminPrismaClient } from "@admin/client";
import { db, adminDb } from "@/lib/database";

export const useCookiesParser = async (req: any) => {
    if (!req.headers) {
      return null;
    }
  
    if (!req.headers.cookie) {
      return null;
    }
  
    const cookies = req.headers.cookie;
    const client = req.headers['x-access-client'];
    const cookie = cookies.split(";").find((c: string) => c.trim().startsWith("x_couponia_auth="));
    const authorization = cookie && cookie.split("=")[1].replace("%20", " ");
    const user = await AuthService.isAuthenticated({ authorization, db: getDB(client) });
    return user;
  };

  export const getDB = (client: string): PrismaClient | AdminPrismaClient| undefined => {
    if (client === 'admin') {
      return adminDb;
    }
    return db;
  };

