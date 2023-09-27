import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const foodRouter = createTRPCRouter({
  getFoods: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.food.findMany({ where: { deletedAt: null } });
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.id) return null;
      return ctx.prisma.food.findUnique({
        where: { id: input.id },
      });
    }),

  getFoodByUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.userId) return [];
      return ctx.prisma.food.findMany({
        where: { createdBy: { id: input.userId }, deletedAt: null },
      });
    }),

  createFood: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        calories: z.number(),
        carbs: z.number(),
        protein: z.number(),
        fat: z.number(),
        userId: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.food.create({
        data: { ...input },
      });
    }),

  updateFood: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        calories: z.number(),
        carbs: z.number(),
        protein: z.number(),
        fat: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.food.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteFood: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const data = new Date();
      return ctx.prisma.food.update({
        data: { deletedAt: data.toISOString() },
        where: { id: input.id },
      });
    }),
});
