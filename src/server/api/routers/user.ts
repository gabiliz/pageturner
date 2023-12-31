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

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      pronouns: z.string().optional(),
      birthday: z.date().optional()
    }))
    .mutation(async ({ input }) => {
      await db.user.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          pronouns: input.pronouns,
          birthday: input.birthday
        }
      })
    })
});
