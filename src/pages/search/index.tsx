/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/router"
import { useState } from "react";
import BookCard from "~/components/BookCard";
import { ErrorPage } from "~/components/Error";
import Header from "~/components/Header";
import { LoadingPage } from "~/components/Loading";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import getThumbnailUrl from "~/utils/getThumbnailUrl";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    }
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ]
  }
}

export default function Search () {
  const router = useRouter();
  const query = router.query.query as string;
  const maxResults = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const {data: booksData, isLoading, isError} = api.book.searchBook.useQuery({
    bookName: query,
    startIndex: (currentPage - 1) * maxResults,
    maxResults: maxResults
  })

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  const totalBooks = booksData?.totalItems;
  const totalPages = Math.ceil(totalBooks / maxResults);

  if (isLoading) {
    return (
      <LoadingPage />
    )
  }

  if (isError) {
    return <ErrorPage />;
  }

  const booksArray = booksData?.items || [];

  if (booksArray.length > 0) {
    return (
      <div className="h-full min-h-screen bg-ptprimary-500">
        <Header />
        <Navbar />
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto my-16">
            {booksArray
            .map((book: Book) => (
              <BookCard
                key={book.id}
                id={book.id}
                bookName={book.volumeInfo.title}
                bookAuthor={book.volumeInfo.authors}
                bookImage={getThumbnailUrl(book)}
                isProgress={false}
                isRating={false}
                isRatingWithReview={false}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pb-10">
          <Pagination
            showControls
            variant="light"
            size="lg"
            total={totalPages} 
            initialPage={currentPage}
            radius="full"
            onChange={handlePageChange} 
            classNames={{
              cursor: "bg-ptsecondary"
            }}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-ptprimary-500 absolute top-0 right-0 flex h-screen w-screen items-center justify-center">
      <p className="font-bold text-6xl text-ptsecondary">Nenhum livro encontrado para a pesquisa.</p>
    </div>
  )
}