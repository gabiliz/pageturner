import BookCard from "~/components/BookCard";
import Header from "~/components/Header";
import Navbar from "~/components/Navbar";

export default function Library() {
  return (
    <main className="h-full bg-ptprimary-500">
      <Header />
      <Navbar />
      <div className="px-24 pt-12">
        <div>
          <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
            Lidos
          </h1>
          <div className="grid grid-flow-col gap-24">
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
          </div>
        </div>
        <div>
          <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
            Lendo
          </h1>
          <div className="grid grid-flow-col gap-24">
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
          </div>
        </div>
        <div>
          <h1 className="mb-14 mt-24 text-6xl font-bold text-ptsecondary">
            Pretendo ler
          </h1>
          <div className="grid grid-flow-col gap-24">
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
