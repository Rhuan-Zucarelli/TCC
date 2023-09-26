import { object, string, z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "next/server/api/trpc";
import { type Food, type Meal } from "@prisma/client";

interface MealFoodResponse {
  mealFood: Food[];
  restFood: Food[];
  related: Meal;
}

export const mealRouter = createTRPCRouter({
  getMeals: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.meal.findMany();
  }),

  createMealFood: protectedProcedure
    .input(
      z.object({
        mealId: z.string(),
        foodId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.mealFood.create({
        data: input,
      });
    }),

  deleteMealFood: protectedProcedure
    .input(
      z.object({
        mealId: z.string(),
        foodId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.mealFood.deleteMany({
        where: { mealId: input.mealId, foodId: input.foodId },
      });
    }),

  getMealfood: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        mealType: z.string(),
        dateMeal: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.userId || !input.mealType || !input.dateMeal) return null;
      const meal = await ctx.prisma.meal.findFirst({
        where: {
          userId: input.userId,
          mealType: input.mealType,
          dateMeal: input.dateMeal,
        },
      });
      if (!meal) {
        const newMeal = await ctx.prisma.meal.create({
          data: {
            ...input,
            userId: input.userId,
            mealType: input.mealType,
            dateMeal: input.dateMeal,
          },
        });
        const restFood = await ctx.prisma.food.findMany({});
        return {
          related: newMeal,
          mealFood: [],
          restFood: restFood,
        } as MealFoodResponse;
      }
      const foodMeals = await ctx.prisma.mealFood.findMany({
        where: { mealId: meal.id },
      });
      const foods = await Promise.all(
        foodMeals.map(async (food) => {
          const foodDetails = await ctx.prisma.food.findUnique({
            where: { id: food.foodId },
          });
          return foodDetails;
        })
      );
      let restFood = await ctx.prisma.food.findMany({});
      restFood = restFood.filter((food) => {
        const found = foods.find((a) => a!.id === food.id);
        if (!found) return true;
      });
      return {
        related: meal,
        restFood: restFood,
        mealFood: foods,
      } as MealFoodResponse;
    }),

  createMeal: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        mealType: z.string(),
        dateMeal: z.date(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.meal.create({
        data: input,
      });
    }),

  updateMeal: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        mealType: z.string(),
        dateMeal: z.date(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.meal.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteMeal: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.meal.delete({
        where: { id: input.id },
      });
    }),
});
