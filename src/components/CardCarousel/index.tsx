import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

export default function CardCarousel({ children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + children.length) % children.length,
    );
  };

  return (
    <div className="relative w-full max-w-lg overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex} mode="wait">
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="w-full flex-shrink-0 flex justify-center mt-20"
        >
          {children[currentIndex]}
        </motion.div>
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
