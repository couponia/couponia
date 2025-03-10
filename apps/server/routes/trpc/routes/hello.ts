import { publicProcedure, router } from "../config";

export const helloRouter = router({
   hello: publicProcedure.query(() => {
      return "Hello, world! from couponia trpc";
   }),
});

export type HelloRouter = typeof helloRouter;