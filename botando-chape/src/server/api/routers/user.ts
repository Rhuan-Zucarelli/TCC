import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.id) return null;
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        age: z.number(),
        gender: z.string(),
        height: z.number(),
        weight: z.number(),
        targetWeight: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: input.userId },
        data: {
          age: input.age,
          gender: input.gender,
          height: input.height,
          weight: input.weight,
          targetWeight: input.targetWeight,
        },
      });
    }),
});
