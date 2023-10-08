import Image from "next/image";
import { Progress } from "../ui/progress";
import Link from "next/link";

interface BookCardProps {
  isProgress: boolean;
  isNotOnBookPage: boolean;
}

export default function BookCard({
  isProgress,
  isNotOnBookPage,
}: BookCardProps) {
  return (
    <div className="w-[250px]">
      <Link href="/book">
        <div className="relative">
          <Image
            className="relative z-40 rounded-md"
            src="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
            width={250}
            height={500}
            alt={""}
          />
        </div>
        {isNotOnBookPage ? (
          <div className="relative z-40 flex flex-col pt-6">
            <p className="font-bold text-ptsecondary">Teias mortais</p>
            <p className="text-ptsecondary">Bel Rodrigues</p>
          </div>
        ) : null}
        {isProgress ? (
          <div>
            <Progress value={65} />
          </div>
        ) : null}
      </Link>
    </div>
  );
}
