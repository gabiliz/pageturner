import { z } from "zod";
import { env } from "~/env.mjs";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

const googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes?q="
const newYorkTimesApiUrl = "https://api.nytimes.com/svc/books/v3/lists"
const googleBooksApiKey = env.GOOGLE_BOOKS_API
const newYorkTimesApiKey = env.NEW_YORK_TIMES_API

export const bookRouter = createTRPCRouter({

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  searchBook: publicProcedure
    .input(z.object({
      bookName: z.string().describe(`Nome do livro`),
      maxResults: z.number().describe(`Quantidade de resultados por página`),
      startIndex: z.number().describe(`Index de inicio`)
    }))
    .query(async ({ input }) => {
      const bookRes = await fetch(`${googleBooksApiUrl}${input.bookName}&maxResults=${input.maxResults}&startIndex=${input.startIndex}&key=${googleBooksApiKey}`) 
      return bookRes.json()
    }),

  getBook: publicProcedure
    .input(z.object({
      isbn13: z.string().describe(`ISBN 13 do livro`)
    }))
    .query(async ({ input }) => {
      const bookRes = await fetch(`${googleBooksApiUrl}isbn:${input.isbn13}&key=${googleBooksApiKey}`) 
      return bookRes.json()
    }),

    getBestsellers: publicProcedure
    .query(async () => {
      const bestSellers = await fetch(`${newYorkTimesApiUrl}/best-sellers/history.json?api-key=${newYorkTimesApiKey}`)
      return bestSellers.json()
    }),

    getNewReleases: publicProcedure
    .query(async () => {
      const newReleases = await fetch(`${newYorkTimesApiUrl}/current/hardcover-fiction.json?api-key=${newYorkTimesApiKey}`)
      return newReleases.json()
    })

  // getBooks: publicProcedure
  //   .input(z.object({
  //     isbn13Array: z.array(z.string()).describe(`Lista de ISBN 13 dos livros`)
  //   }))
  //   .query(async ({ input }) => {

  //   })
});
