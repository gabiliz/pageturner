/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import BookCard from "~/components/BookCard";
import CardCarousel from "~/components/CardCarousel";
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
      thumbnail: string;
    };
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      },
    ];
  };
}

interface Volume {
  items: Book[];
}

export default function Home() {

  const {data: newReleasesBooks, isLoading, isError } = api.book.listBooks.useQuery({
    isbnList: ['9781668003091', '9781984818584', '9781668016138']
  })

  const { data: bestSellersBooks } = api.book.listBooks.useQuery({
    isbnList: ['9780807006474', '9781984801838', '9780399169274', '9780307951526']
  })

  return (
    <>
      <main className="h-full min-h-screen bg-ptprimary-500">
        {!newReleasesBooks && !bestSellersBooks && isLoading && <LoadingPage />}
        {isError && <ErrorPage />}
        {bestSellersBooks && newReleasesBooks && (
          <>
            <Header />
            <Navbar />
            <div className="px-24 pt-12">
              <div className="flex items-center justify-between w-full h-[550px] p-12 rounded-lg bg-ptprimary-900">
                <h1 className="font-bold text-ptsecondary md:text-4xl lg:text-7xl xl:text-8xl mr-4">
                  Novos{" "}
                  <div className="bg-pttertiary w-fit p-3">Lançamentos</div>
                </h1>
                <CardCarousel>
                  {newReleasesBooks.map((book: Volume) =>
                    book.items.map((item: Book) => (
                      <BookCard
                        key={item.id}
                        id={item.id}
                        bookName={item.volumeInfo.title}
                        bookAuthor={item.volumeInfo.authors}
                        bookImage={getThumbnailUrl(item)}
                        isProgress={false}
                        isRating={false}
                        isRatingWithReview={false}
                      />
                    )),
                  )}
                </CardCarousel>
              </div>
              <div>
                <h1 className="font-bold text-ptsecondary text-6xl mt-24 mb-14">
                  Bestsellers
                </h1>
                <div className="grid grid-flow-col gap-24">
                  {bestSellersBooks.map((book: Volume) =>
                    book.items.map((item: Book) => (
                      <BookCard
                        key={item.id}
                        id={item.id}
                        bookName={item.volumeInfo.title}
                        bookAuthor={item.volumeInfo.authors}
                        bookImage={getThumbnailUrl(item)}
                        isProgress={false}
                        isRating={false}
                        isRatingWithReview={false}
                      />
                    )),
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
