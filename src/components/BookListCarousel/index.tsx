import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import BookCard from "../BookCard";
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
interface BookCarouselProps {
  books: Book[];
}

export default function BookListCarousel ({books}: BookCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalPages) % totalPages,
    );
  };

  const renderPage = (pageIndex: number) => {
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return books.slice(startIndex, endIndex).map((book, index) => (
      <motion.div
        key={startIndex + index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full flex-shrink-0 flex justify-center mt-20"
      >
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
      </motion.div>
    ));
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex} exitBeforeEnter>
        {renderPage(currentIndex)}
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 text-ptsecondary hover:bg-ptsecondary/10 rounded-full p-2"
      >
        <ChevronLeftIcon width={30} height={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 text-ptsecondary hover:bg-ptsecondary/10 rounded-full p-2"
      >
        <ChevronRightIcon width={30} height={30} />
      </button>
    </div>
  );
}