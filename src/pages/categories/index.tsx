import BookCard from "~/components/BookCard";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";

export default function Categories () {
  return (
    <main className="h-screen bg-ptprimary-500">
    <Header />
    <Navbar />
    <div className="px-24 pt-12">
      <div>
        <div>
          <p>Estamos listando apenas seus gêneros favoritos</p>
        </div>
        <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
          Horror
        </h1>
        <div className="grid grid-flow-col gap-24">
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
        </div>
      </div>
      <div>
        <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
          Fantasia
        </h1>
        <div className="grid grid-flow-col gap-24">
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
        </div>
      </div>
      <div>
        <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
          Romance
        </h1>
        <div className="grid grid-flow-col gap-24">
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
          <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
        </div>
      </div>
    </div>
  </main>
  )
}