import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getById: publicProcedure
    .input(z.object({
      id: z.string().describe(`Id do usuário`)
    }))
    .query(({ input }) => {
      const user = db.user.findUnique({
        where: {
          id: input.id
        }
      })
      return user;
    }),

  // update: publicProcedure
  //   .input(z.object({
      
  //   }))
  //   .mutation({})
});
