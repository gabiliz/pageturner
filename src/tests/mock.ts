import { delay, http, HttpResponse } from 'msw'

interface Book {
  id: string;
  title: string;
  author: string
}

const booksMock: Book[] = [
  {
    id: '1',
    title: 'Flores para Algernon',
    author: 'Daniel Keyes'
  }
]

export const handlers = [
  http.get('https://www.googleapis.com/books/v1/volumes/q', async () => {

    await delay()

    return HttpResponse.json({
      booksMock
    })
  })
]