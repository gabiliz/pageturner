
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const listRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.list.findMany();
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string()
      }),
    )
    .query(async ({ input }) => {
  
      const foundList = await db.list.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true
        }
      });
      return foundList
    })
  
});
