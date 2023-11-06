import BookCard from "~/components/BookCard";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

export default function Library() {

  const {data: booksData, isLoading, isError} = api.book.getAll.useQuery();

  return (
    <main className="h-screen bg-ptprimary-500">
      <Header />
      <Navbar />
      {booksData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32">
          <p className="font-bold text-6xl text-ptsecondary">Você ainda não possui nenhum livro salvo.</p>
          <p className="mt-10 text-2xl text-ptsecondary">Comece pesquisando por alguns livros!</p>
        </div>
      ) : (
        <div className="px-24 pt-12">
          <div>
            <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
              Lidos
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
              Lendo
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
              Pretendo ler
            </h1>
            <div className="grid grid-flow-col gap-24">
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
              <BookCard isProgress={false} isRating={false} isRatingWithReview={false} bookImage={""} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
