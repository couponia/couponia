import { z } from "zod";
import { AuthService } from "../../../core/auth/service";
import { publicProcedure, router } from "../config";

export const authRouter = router({
   login: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).mutation(async ({ input }) => {
      return AuthService.login(input.email, input.password);
   }),
   register: publicProcedure.input(z.object({ email: z.string(), password: z.string() })).mutation(async ({ input }) => {
      return AuthService.register(input.email, input.password);
   }),
});

export type AuthRouter = typeof authRouter;
