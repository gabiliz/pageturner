/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSession } from "next-auth/react";
import BookCard from "~/components/BookCard";
import Header from "~/components/Header";
import { LoadingPage } from "~/components/Loading";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import getThumbnailUrl from "~/utils/getThumbnailUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from "next/dynamic";
import { type ComponentType } from "react";


const DynamicUserSessionPage = dynamic(
  () => import('../../components/UserSession').then((module) => module.UserSessionPage) as Promise<ComponentType<object>>,
  { loading: () => <LoadingPage /> }
);


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

export default function Library() {
  const { data: sessionData, status } = useSession();
  const { data: booksData, isLoading: isLoadingBooks } = api.book.getAllByUser.useQuery({
    userId: sessionData?.user.id ?? ""
  });
  const { data: read } = api.book.getBooksByList.useQuery({
    listId: "lido",
  });
  const { data: reading } = api.book.getBooksByList.useQuery({
    listId: "lendo",
  });
  const { data: wantsToRead } = api.book.getBooksByList.useQuery({
    listId: "pretendo-ler",
  });
  const { data: readBooks } = api.book.listBooksById.useQuery({
    idList: (read ?? []).map((item) => item.id),
  });
  const { data: readingBooks, isLoading: isLoadingReadingBooks } = api.book.listBooksById.useQuery({
    idList: (reading ?? []).map((item) => item.id),
  });
  const { data: wantsToReadBooks } = api.book.listBooksById.useQuery({
    idList: (wantsToRead ?? []).map((item) => item.id),
  });

  if (status === "loading" && (isLoadingBooks || isLoadingReadingBooks)) {
    return (
      <LoadingPage />
    )
  }

  return (
    <main className="h-full min-h-screen bg-ptprimary-500">
      <Header />
      <Navbar />
      {sessionData  ? (
        booksData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32">
            <p className="font-bold text-6xl text-ptsecondary">
              Você ainda não possui nenhum livro salvo.
            </p>
            <p className="mt-10 text-2xl text-ptsecondary">
              Comece pesquisando por alguns livros!
            </p>
          </div>
        ) : (
          <div className="px-24 pt-12">
            <div>
              <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
                Lidos
              </h1>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                className="relative"
              >
                {readBooks?.map((book: Book) => (
                  <SwiperSlide key={book.id}>
                    <div className="ml-20">
                      <BookCard
                        id={book.id}
                        bookName={book.volumeInfo.title}
                        bookAuthor={book.volumeInfo.authors}
                        bookImage={getThumbnailUrl(book)}
                        isProgress={false}
                        isRating={false}
                        isRatingWithReview={false}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
                Lendo
              </h1>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                className="relative"
              >
                {readingBooks?.map((book: Book) => (
                  <SwiperSlide key={book.id}>
                    <div className="ml-20">
                      <BookCard
                        id={book.id}
                        bookName={book.volumeInfo.title}
                        bookAuthor={book.volumeInfo.authors}
                        bookImage={getThumbnailUrl(book)}
                        isProgress={false}
                        isRating={false}
                        isRatingWithReview={false}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
                Pretendo ler
              </h1>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation]}
                className="relative"
              >
                {wantsToReadBooks?.map((book: Book) => (
                  <SwiperSlide key={book.id}>
                    <div className="ml-20">
                      <BookCard
                        id={book.id}
                        bookName={book.volumeInfo.title}
                        bookAuthor={book.volumeInfo.authors}
                        bookImage={getThumbnailUrl(book)}
                        isProgress={false}
                        isRating={false}
                        isRatingWithReview={false}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )
      ) : (
        <div>
          <DynamicUserSessionPage />
        </div>
      )}
    </main>
  );
}
