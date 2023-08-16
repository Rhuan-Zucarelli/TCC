import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getMeals: protectedProcedure
    .query(({ctx}) => {
      return ctx.prisma.meal.findMany();
    }),

  createMeal: protectedProcedure.input(z.object({
    userId: z.string(),
    mealType: z.string(),
    dateMeal: z.string(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.meal.create({
      data: input
    });
  }),

  updateMeal: protectedProcedure.input(z.object({
    id: z.string(),
    userId: z.string(),
    mealType: z.string(),
    dateMeal: z.string(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.meal.update({
      where: {id:input.id},
      data: input
    })
  }),

  deleteMeal: protectedProcedure.input(z.object({
    id: z.string(),
  })).mutation(({input, ctx}) => {
    return ctx.prisma.meal.delete({
      where: {id:input.id}
    })
  }),
});
