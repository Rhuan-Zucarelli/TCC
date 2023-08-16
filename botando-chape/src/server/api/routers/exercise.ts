import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getMeals: protectedProcedure
    .query(({ctx}) => {
      return ctx.prisma.exercise.findMany();
    }),

  createExercise: protectedProcedure.input(z.object({
    name: z.string(),
    burnCalories: z.number(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.exercise.create({
      data: input
    });
  }),

  updateExercise: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    burnCalories: z.number(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.exercise.update({
      where: {id:input.id},
      data: input
    })
  }),

  deleteMeal: protectedProcedure.input(z.object({
    id: z.string(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.exercise.delete({
      where: {id:input.id}
    })
  }),
});
