import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.input(z.object({
    id: z.string().optional(),

  }))
    .query(({ctx, input}) => {
      if(!input.id) return null
      return ctx.prisma.user.findUnique({
        where: {id:input.id}
      });
    }),
});
