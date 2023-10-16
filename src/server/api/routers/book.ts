import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes?q="
const apiKey = env.GOOGLE_BOOKS_API

export const bookRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  searchBook: publicProcedure
    .input(z.object({
      bookName: z.string().describe(`Nome do livro`)
    }))
    .query(async ({ input }) => {
      const bookRes = await fetch(`${googleBooksApiUrl}${input.bookName}&key=${apiKey}`) 
      return bookRes.json()
    }),

  getBook: publicProcedure
    .input(z.object({
      isbn13: z.string().describe(`ISBN 13 do livro`)
    }))
    .query(async ({ input }) => {
      const bookRes = await fetch(`${googleBooksApiUrl}isbn:${input.isbn13}&key=${apiKey}`) 
      return bookRes.json()
    })
});
