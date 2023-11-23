/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import BookCard from "~/components/BookCard";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import getThumbnailUrl from "~/utils/getThumbnailUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
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
      },
    ];
  };
}

export default function Categories() {
  const maxResults = 12;
  const [currentPage] = useState(1);
  const { data: romanceBooks } = api.book.searchBook.useQuery({
    bookName: "subject:romance",
    startIndex: (currentPage - 1) * maxResults,
    maxResults: maxResults,
  });
  const romanceArray = romanceBooks?.items || [];

  const { data: mysteryBooks } = api.book.searchBook.useQuery({
    bookName: "subject:mystery",
    startIndex: (currentPage - 1) * maxResults,
    maxResults: maxResults,
  });
  const mysteryArray = mysteryBooks?.items || [];

  const { data: fantasyBooks } = api.book.searchBook.useQuery({
    bookName: "subject:fantasy",
    startIndex: (currentPage - 1) * maxResults,
    maxResults: maxResults,
  });
  const fantasyArray = fantasyBooks?.items || [];

  console.log(mysteryBooks)

  return (
    <main className="h-full min-h-screen bg-ptprimary-500">
      <Header />
      <Navbar />
      <div className="px-24 pt-12">
        <div>
          <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
            Romance
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="relative"
          >
            {romanceArray.map((book: Book) => (
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
            Mistério
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="relative"
          >
            {mysteryArray.map((book: Book) => (
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
            Fantasia
          </h1>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className="relative"
          >
            {fantasyArray.map((book: Book) => (
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
    </main>
  );
}
