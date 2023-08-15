import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getFoods: protectedProcedure
    .query(({ctx}) => {
      return ctx.prisma.food.findMany();
    }),

  createFood: protectedProcedure.input(z.object({
    name: z.string(),
    calories: z.number(),
    carbs: z.number(),
    protein: z.number(),
    fat: z.number(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.food.create({
      data: input
    });
  }),

  updateFood: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    calories: z.number(),
    carbs: z.number(),
    protein: z.number(),
    fat: z.number(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.food.update({
      where: {id:input.id},
      data: input
    })
  }),

  deleteFood: protectedProcedure.input(z.object({
    id:z.string(),
  })).mutation(({input, ctx})=>{
    return ctx.prisma.food.delete({
      where: {id:input.id}
    })
  }),
});
