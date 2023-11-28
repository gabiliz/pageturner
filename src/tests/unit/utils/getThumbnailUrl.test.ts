import { describe, expect, it } from "vitest";
import getThumbnailUrl from "~/utils/getThumbnailUrl";

const url = 'http://books.google.com/books/content?id=bh5sSJhW81UC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72tcOBTqobEhmOxHxhpbN2znOVlS-VmVuBKj7i694in8gbbZFt3olkWyvmN-1-9JsstbYTrs3mRicZ9999TZqpJLmt0M-3OvVPIFn5zm04of63geOyfUst6ujBkb5Lat7e1LAc5&source=gbs_api'
const urlFormated = 'http://books.google.com/books/content?id=bh5sSJhW81UC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72tcOBTqobEhmOxHxhpbN2znOVlS-VmVuBKj7i694in8gbbZFt3olkWyvmN-1-9JsstbYTrs3mRicZ9999TZqpJLmt0M-3OvVPIFn5zm04of63geOyfUst6ujBkb5Lat7e1LAc5&source=gbs_api'

describe("get thumbnail url", () => {
  it("should return thumbnail string", () => {
    const thumbnail = getThumbnailUrl(
      {
        id: '1',
        volumeInfo: {
          title: 'livro teste',
          authors: ['autor teste'],
          imageLinks: {
            thumbnail: url,
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

    expect(thumbnail).toEqual(urlFormated)
  })
})