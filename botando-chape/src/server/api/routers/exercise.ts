import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  getExercises: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany({ where: { deletedAt: null } });
  }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.id) return null;
      return ctx.prisma.exercise.findUnique({
        where: { id: input.id },
      });
    }),

  getExerciseByUser: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      })
    )
    .query(({ ctx, input }) => {
      if (!input.userId) return [];
      return ctx.prisma.exercise.findMany({
        where: { createdBy: { id: input.userId }, deletedAt: null },
      });
    }),

  createExercise: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        burnCalories: z.number(),
        userId: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.exercise.create({
        data: input,
      });
    }),

  updateExercise: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        burnCalories: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.exercise.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteExercises: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const data = new Date();
      return ctx.prisma.exercise.update({
        data: { deletedAt: data.toISOString() },
        where: { id: input.id },
      });
    }),
});
