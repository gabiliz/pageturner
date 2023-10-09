
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const listRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.list.findMany();
  }),
});
