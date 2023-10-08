import BookCard from "~/components/BookCard";
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
          <h1 className="font-bold text-ptsecondary text-8xl">
            Novos <div className="bg-pttertiary w-fit p-3">Lançamentos</div>
          </h1>
          <div className="grid grid-cols-3 gap-12">
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-ptsecondary text-6xl mt-24 mb-14">Bestsellers</h1>
          <div className="grid grid-flow-col gap-24">
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
            <BookCard isProgress={false} isNotOnBookPage={true} />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
