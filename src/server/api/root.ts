import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from '~/server/api/routers/user'
import { listRouter } from "./routers/list";
import { bookRouter } from "./routers/book";
import { logRouter } from "./routers/log";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  list: listRouter,
  book: bookRouter,
  log: logRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
