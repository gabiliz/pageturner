interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    }
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ]
  }
}

export const getIsbn13 = (book: Book) => {
  const isbn13Obj = book.volumeInfo.industryIdentifiers.find(id => id.type === 'ISBN_13');
  return isbn13Obj?.identifier
}