
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const logRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.log.findMany();
  }),
});
