import { router } from "./config";
import { authRouter, helloRouter } from "./routes";
// tRPC API router
export const appRouter = router({
  hello: helloRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;