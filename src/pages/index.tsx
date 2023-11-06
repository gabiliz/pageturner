import BookCard from "~/components/BookCard";
import CardCarousel from "~/components/CardCarousel";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";

export default function Home() {
  return (
    <>
      <main className="h-full bg-ptprimary-500">
        <Header />
        <Navbar />
        <div className="px-24 pt-12">
          <div className="flex items-center justify-between w-full h-[550px] p-12 rounded-lg bg-ptprimary-900">
            <h1 className="font-bold text-ptsecondary md:text-4xl lg:text-7xl xl:text-8xl mr-4">
              Novos <div className="bg-pttertiary w-fit p-3">Lançamentos</div>
            </h1>
            <CardCarousel>
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} />
            </CardCarousel>
          </div>
          <div>
            <h1 className="font-bold text-ptsecondary text-6xl mt-24 mb-14">
              Bestsellers
            </h1>
            <div className="grid grid-flow-col gap-24">
              <BookCard isProgress={true} isRating={false} isRatingWithReview={false} />
              <BookCard isProgress={false} isRating={true} isRatingWithReview={false} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={true} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
