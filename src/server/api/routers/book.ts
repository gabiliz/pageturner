/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

const googleBooksApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const newYorkTimesApiUrl = "https://api.nytimes.com/svc/books/v3/lists";
const googleBooksApiKey = env.GOOGLE_BOOKS_API;
const newYorkTimesApiKey = env.NEW_YORK_TIMES_API;

export const bookRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  getBooksByList: publicProcedure
    .input(
      z.object({
        listId: z.string(),
      })
    )
    .query(async ({input}) => {
      const bookByList = await db.book.findMany({
        where: {
          listId: input.listId
        },
        select: {
          id: true
        }
      })
      return bookByList
    }),

  getBookById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({input}) => {
      const books = await db.book.findUnique({
        where: {
          id: input.id
        }
      })
      return books
    }),

  create: publicProcedure
    .input(
      z.object({
        listId: z.string(),
        id: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({input}) => {
      await db.book.create({
        data: {
          listId: input.listId,
          id: input.id,
          userId: input.userId
        }
      })
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        listId: z.string(),
        userId: z.string()
      })
    )
    .mutation(async ({input}) => {
      await db.book.update({
        where: {
          id: input.id,
          userId: input.userId
        },
        data: {
          listId: input.listId
        }
      })
    }),

  searchBook: publicProcedure
    .input(
      z.object({
        bookName: z.string().describe(`Nome do livro`),
        maxResults: z.number().describe(`Quantidade de resultados por página`),
        startIndex: z.number().describe(`Index de inicio`),
      }),
    )
    .query(async ({ input }) => {
      const bookRes = await fetch(
        `${googleBooksApiUrl}${input.bookName}&maxResults=${input.maxResults}&startIndex=${input.startIndex}&key=${googleBooksApiKey}`,
      );

      return bookRes.json();
    }),

  getBook: publicProcedure
    .input(
      z.object({
        isbn13: z.string().describe(`ISBN 13 do livro`),
      }),
    )
    .query(async ({ input }) => {
      const bookRes = await fetch(
        `${googleBooksApiUrl}isbn:${input.isbn13}&key=${googleBooksApiKey}`,
      );
      return bookRes.json()
    }),

    getBookByApiId: publicProcedure
      .input(
        z.object({
          id: z.string().describe(`Id da api`)
        }),
      )
      .query(async ({ input }) => {
        const bookRes = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${input.id}`
        );
        return bookRes.json()
      }),

    getBestsellers: publicProcedure.query(async () => {
      const bestSellers = await fetch(
        `${newYorkTimesApiUrl}/best-sellers/history.json?api-key=${newYorkTimesApiKey}`,
      );
      return bestSellers.json();
    }),

    getNewReleases: publicProcedure.query(async () => {
      const newReleases = await fetch(
        `${newYorkTimesApiUrl}/current/hardcover-fiction.json?api-key=${newYorkTimesApiKey}`,
      );
      return newReleases.json();
    }),

    listBooks: publicProcedure
    .input(z.object({
      isbnList: z.array(z.string()),
    }))
    .query(async ({ input }) => {
      const { isbnList } = input;
      const listedBooks = isbnList.map(isbn =>
        fetch(`${googleBooksApiUrl}isbn:${isbn}&key=${googleBooksApiKey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch details for ISBN ${isbn}`);
          }
          return response.json();
        })
        .catch(error => ({ error: `Failed to fetch details for ISBN ${isbn}, Error: ${error}` }))
      );
      const bookDetails = await Promise.all(listedBooks);
      return bookDetails;
    }),
    
    listBooksById: publicProcedure
    .input(
      z.object({
        idList: z.array(z.string()),
      })
    )
    .query(async ({input}) => {
      const { idList } = input;
      const listedBooks = idList.map(id =>
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch details for ID ${id}`);
          }
          return response.json();
        })
        .catch(error => ({ error: `Failed to fetch details for ID ${id}, Error: ${error}` }))
      );
      const bookDetails = await Promise.all(listedBooks);
      return bookDetails;
    })
});
