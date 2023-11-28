import { describe, expect, it } from "vitest";
import { getIsbn13 } from "~/utils/getIsbn13";


describe("get isbn13", () => {
  it("should return isbn13", () => {
    const isbn13 = getIsbn13(
      {
        id: '1',
        volumeInfo: {
          title: 'livro teste',
          authors: ['autor teste'],
          imageLinks: {
            thumbnail: 'imagem teste',
          },
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9788581051574'
            },
          ]
        }
      }
    );

    expect(isbn13).toEqual('9788581051574')
  })
})