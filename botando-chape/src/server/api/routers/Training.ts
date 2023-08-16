import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getMeals: protectedProcedure
    .query(({ctx}) => {
      return ctx.prisma.trainingDiary.findMany();
    }),

  createTraining: protectedProcedure.input(z.object({
    userId: z.string(),
    trainingDay: z.string(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.trainingDiary.create({
      data: input
    });
  }),

  updateTraining: protectedProcedure.input(z.object({
    id: z.string(),
    userId: z.string(),
    trainingDay: z.string(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.trainingDiary.update({
      where: {id:input.id},
      data: input
    })
  }),

  deleteTraining: protectedProcedure.input(z.object({
    id: z.string(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.trainingDiary.delete({
      where: {id:input.id}
    })
  }),
});
