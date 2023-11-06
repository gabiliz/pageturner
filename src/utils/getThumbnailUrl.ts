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


function getThumbnailUrl (book: Book): string {
  const defaultThumbnail = 'https://via.placeholder.com/564x900';
  const rawThumbnail =  book.volumeInfo.imageLinks?.thumbnail || defaultThumbnail
  return editThumbnailUrl(rawThumbnail)
}

const editThumbnailUrl = (url: string): string => {
  if (url) {
    return url.replace("zoom=1", "zoom=0").replace("&edge=curl", "");
  }
  return url;
};

export default getThumbnailUrl