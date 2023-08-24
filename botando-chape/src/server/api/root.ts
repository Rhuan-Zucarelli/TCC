import { exampleRouter } from "next/server/api/routers/example";
import { createTRPCRouter } from "next/server/api/trpc";
<<<<<<< HEAD
import { exerciseRouter } from "./routers/exercise";
import { foodRouter } from "./routers/food";
import { mealRouter } from "./routers/meal";
import { trainingRouter } from "./routers/Training";
import { userRouter } from "./routers/user";
=======
>>>>>>> main

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
