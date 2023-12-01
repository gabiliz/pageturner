import Image from "next/image";
import Link from "next/link";
import { Rating } from "@mui/material";
import { Progress } from "../ui/progress";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

interface BookCardProps {
  isProgress: boolean;
  isRating: boolean;
  isRatingWithReview: boolean;
  bookName?: string;
  bookAuthor?: string[];
  bookImage: string;
  id?: string;
  ratingValue?: number;
  progressValue?: number;
}

export default function BookCard({
  isProgress,
  isRating,
  isRatingWithReview,
  bookName,
  bookAuthor,
  bookImage,
  id,
  ratingValue,
  progressValue
}: BookCardProps) {
  return (
    <div className="w-[200px] mb-10">
      <Link href={`/book/${id}`} passHref>
        <Image
          className="rounded-md"
          src={bookImage}
          width={0}
          height={0}
          sizes="100vw"
          alt={"book-image"}
          style={{ width: "100%", height: "auto" }}
        />
        <div className="relative flex flex-col pt-6">
          <p className="font-bold text-ptsecondary">{bookName}</p>
          <p className="text-ptsecondary">{bookAuthor?.join(', ')}</p>
        </div>
        {isProgress ? <Progress value={progressValue} className="mt-2" /> : null}
        {isRating ? (
          <Rating value={ratingValue} precision={0.5} size="medium" readOnly />
        ) : null}
        {isRatingWithReview ? (
          <div className="flex items-center">
            <Rating value={ratingValue} precision={0.5} size="medium" readOnly />
            <Bars3BottomLeftIcon width={20} height={20} className="ml-2" />
          </div>
        ) : null}
      </Link>
    </div>
  );
}
