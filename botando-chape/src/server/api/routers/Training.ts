import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";
import { type TrainingDiary } from "@prisma/client";
import { type Exercise } from "@prisma/client";

interface TrainingExerciseResponse {
  trainingExercise: Exercise[];
  restExercise: Exercise[];
  related: TrainingDiary;
}

export const trainingRouter = createTRPCRouter({
  getTraining: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.trainingDiary.findMany();
  }),

  createExerciseTraining: protectedProcedure
    .input(
      z.object({
        trainingId: z.string(),
        exerciseId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.exerciseTraining.create({
        data: input,
      });
    }),

  deleteExerciseTraining: protectedProcedure
    .input(
      z.object({
        trainingId: z.string(),
        exerciseId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.exerciseTraining.deleteMany({
        where: { trainingId: input.trainingId, exerciseId: input.exerciseId },
      });
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
      if (!training) {
        const newTraining = await ctx.prisma.trainingDiary.create({
          data: {
            ...input,
            userId: input.userId,
            trainingDay: input.trainingDay,
          },
        });
        const restExercise = await ctx.prisma.exercise.findMany({
          where: { deletedAt: null },
        });
        return {
          related: newTraining,
          trainingExercise: [],
          restExercise: restExercise,
        } as TrainingExerciseResponse;
      }
      const trainingExercises = await ctx.prisma.exerciseTraining.findMany({
        where: { trainingId: training.id }, // Filtra exercícios relacionados a este treino
      });
      const exercises = await Promise.all(
        trainingExercises.map(async (exercise) => {
          const exerciseDetails = await ctx.prisma.exercise.findUnique({
            where: { id: exercise.exerciseId },
          });
          return exerciseDetails;
        })
      );
      let restExercise = await ctx.prisma.exercise.findMany({
        where: { deletedAt: null },
      });
      restExercise = restExercise.filter((exercise) => {
        const found = exercises.find((a) => a!.id === exercise.id);
        if (!found) return true;
      });
      return {
        related: training,
        restExercise: restExercise,
        trainingExercise: exercises,
      } as TrainingExerciseResponse;
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
