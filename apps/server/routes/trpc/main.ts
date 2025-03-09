import { initTRPC } from "@trpc/server";
import { z } from "zod";

// Initialize tRPC
const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

// tRPC API router
export const appRouter = router({
  hello: publicProcedure
    .input(z.string().optional())
    .query(({ input }) => {
      return `Hello ${input ?? 'World'} from tRPC!`;
    }),
});

export type AppRouter = typeof appRouter;