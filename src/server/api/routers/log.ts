
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { db } from "~/server/db";


export const logRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.log.findMany();
  }),

  getById: publicProcedure
  .input(z.object({
    id: z.string().describe(`Id do log`)
  }))
  .query(({ input }) => {
    const log = db.log.findUnique({
      where: {
        id: input.id
      }
    })
    return log;
  }),

  getByBookAndUserId: publicProcedure
  .input(z.object({
    bookId: z.string(),
    userId: z.string()
  }))
  .query(({ input }) => {
    const log = db.log.findFirst({
      where: {
        bookId: input.bookId,
        userId: input.userId
      }
    })
    return log;
  }),

  createOrUpdateLogWithBook: publicProcedure
    .input(
      z.object({
        review: z.string(),
        rating: z.number(),
        progress: z.number(),
        bookId: z.string(),
        userId: z.string(),
        listId: z.string(),
      })
    )
    .mutation(async ({input}) => {
      await db.book.upsert({
        where: {
          id: input.bookId
        },
        create: {
          listId: input.listId,
          id: input.bookId,
          userId: input.userId
        },
        update: {
          listId: input.listId
        }
      })
      const existingLog = await db.log.findFirst({
        where: {
          bookId: input.bookId,
          userId: input.userId
        }
      })
      if (existingLog) {
        await db.log.update({
          where: {
            id: existingLog.id
          },
          data: {
            review: input.review,
            rating: input.rating,
            progress: input.progress,
            listId: input.listId,
          }
        })
      } else {
        await db.log.create({
          data: {
            review: input.review,
            rating: input.rating,
            progress: input.progress,
            bookId: input.bookId,
            userId: input.userId,
            listId: input.listId
          }
        })
      }
    }),

  create: publicProcedure
  .input(
    z.object({
      review: z.string(),
      rating: z.number(),
      progress: z.number(),
      bookId: z.string(),
      userId: z.string(),
      listId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    await db.log.create({
      data: {
        review: input.review,
        rating: input.rating,
        progress: input.progress,
        bookId: input.bookId,
        userId: input.userId,
        listId: input.listId
      }
    })
  }),

  update: publicProcedure
  .input(
    z.object({
      id: z.string(),
      review: z.string(),
      rating: z.number(),
      progress: z.number()
    })
  )
  .mutation(async ({ input }) => {
    await db.log.update({
      where: {
        id: input.id
      },
      data: {
        review: input.review,
        rating: input.rating,
        progress: input.progress
      }
    })
  }),
});
