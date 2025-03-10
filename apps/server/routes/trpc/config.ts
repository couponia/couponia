import { initTRPC } from "@trpc/server";
import CouponiaContext from "@/lib/context";
// Initialize tRPC
const t = initTRPC.context<CouponiaContext>().create();
const router = t.router;
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
   if (!ctx.user) {
      throw new Error("Unauthorized");
   }
   return next({ ctx });
});

export { router, publicProcedure, protectedProcedure };