import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import BookCard from "../BookCard";

interface BookCarouselProps {
  books: [];
}

export default function BookListCarousel ({books}: BookCarouselProps) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const controls = useAnimation();

  const goToPage = async (page: number) => {
    await controls.start({ x: -page * 100 });
    setCurrentPage(page);
  };

  const next = () => {
    if (currentPage < totalPages - 1) {
      void goToPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      void goToPage(currentPage - 1);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex" style={{ width: `${totalPages * 100}%` }}>
        {books.map((book, index) => (
          <motion.div
            key={index}
            className="w-1/4 px-2"
            initial={{ opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          </motion.div>
        ))}
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <button onClick={prev} disabled={currentPage === 0}>
          Anterior
        </button>
        <button onClick={next} disabled={currentPage === totalPages - 1}>
          Próxima
        </button>
      </div>
    </div>
  );
}