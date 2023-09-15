import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";
import { TrainingDay } from "next/pages/training";

export const trainingRouter = createTRPCRouter({
  getTraining: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.trainingDiary.findMany();
  }),

  getTrainingExercises: protectedProcedure
    .input(
      z.object({
        trainingDay: z.string().optional(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.userId || !input.trainingDay) return null;
      const training = await ctx.prisma.trainingDiary.findFirst({
        where: { userId: input.userId, trainingDay: input.trainingDay },
      });
      if (training) return training;
      return ctx.prisma.trainingDiary.create({
        data: {
          ...input,
          userId: input.userId,
          trainingDay: input.trainingDay,
        },
      });
    }),

  createTraining: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        trainingDay: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.trainingDiary.create({
        data: input,
      });
    }),

  updateTraining: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        trainingDay: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.trainingDiary.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteTraining: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.trainingDiary.delete({
        where: { id: input.id },
      });
    }),
});
