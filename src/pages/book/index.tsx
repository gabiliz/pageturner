/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/Loading";
import { formatPublishedDate } from "~/utils/dateFormat";
import { Rating } from "@mui/material";
import { Progress } from "@nextui-org/react";
import { Textarea } from "~/components/ui/textarea";

export default function Book() {
  const router = useRouter();

  const {
    data: bookData,
    isLoading,
    isError,
  } = api.book.getBook.useQuery({
    isbn13: "9788576573999",
  });

  const editThumbnailUrl = (url: string) => {
    if (url) {
      return url.replace("zoom=1", "zoom=0").replace("&edge=curl", "");
    }
    return url;
  };

  const returnToLastPage = () => {
    router.back();
  };

  return (
    <>
      <div className="h-screen bg-ptprimary-500">
        {isLoading && <LoadingPage />}
        {isError && <div>Ocorreu um erro ao buscar os dados.</div>}
        {bookData && (
          <>
            <Header />
            <div className="px-16 py-8">
              <Button onClick={returnToLastPage}>
                <ChevronLeftIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-center p-16">
              <div>
                <Image
                  className="rounded-md"
                  src={editThumbnailUrl(
                    bookData.items[0].volumeInfo.imageLinks.thumbnail,
                  )}
                  width={280}
                  height={500}
                  alt={""}
                />
                <div className="flex flex-col items-center mt-5">
                  {/* <Rating
                    className="mb-3"
                    defaultValue={2.5}
                    precision={0.5}
                    size="large"
                    readOnly
                  /> */}
                  <Progress
                    className="mb-3"
                    showValueLabel={true}
                    label="120/240"
                    size="sm"
                    aria-label="Loading..."
                    value={50}
                    classNames={{
                      track: "bg-ptprimary-900",
                      indicator: "bg-ptsecondary",
                      label: "font-medium text-ptsecondary",
                      value: "text-ptsecondary/90",
                    }}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-60 mb-6">Registrar</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Log do livro</DialogTitle>
                        <DialogDescription>
                          {bookData.items[0].volumeInfo.title}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-5 grid-flow-col gap-3 mb-8">
                        <Image
                          className="rounded-md row-span-2"
                          src={editThumbnailUrl(
                            bookData.items[0].volumeInfo.imageLinks.thumbnail,
                          )}
                          width={150}
                          height={500}
                          alt={""}
                        />
                        <div className="col-span-5">
                          <Label htmlFor="name">Review</Label>
                          <Textarea />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="name">Lista</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma lista" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="apple">Lido</SelectItem>
                                <SelectItem value="banana">Lendo</SelectItem>
                                <SelectItem value="blueberry">
                                  Pretendo ler
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="name">Progresso</Label>
                          <Input
                            type="number"
                            max="20"
                            id="username"
                            defaultValue=""
                            className="col-span-6"
                          />
                        </div>
                        <div className="flex flex-col justify-center col-span-1">
                          <Label className="mb-2">Nota</Label>
                          <Rating
                            size="large"
                            name="half-rating"
                            precision={0.5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Select>
                    <SelectTrigger className="w-60">
                      <SelectValue placeholder="Selecione uma lista" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Lido</SelectItem>
                        <SelectItem value="banana">Lendo</SelectItem>
                        <SelectItem value="blueberry">Pretendo ler</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="ml-8 max-w-lg">
                <h1 className="mb-7 text-4xl font-black text-ptsecondary">
                  {bookData.items[0].volumeInfo.title}
                </h1>
                <p className="text-ptsecondary">
                  {bookData.items[0].volumeInfo.description}
                </p>
                <div className="mt-8">
                  <p className="text-ptsecondary text-2xl font-bold mb-1">
                    Review
                  </p>
                  <div className="bg-ptprimary-900 rounded-lg py-5 px-7">
                    <p className="text-ptsecondary">aaaaa</p>
                  </div>
                </div>
              </div>
              <div className="ml-8">
                <div className="mb-8">
                  <p className="text-lg font-bold text-ptsecondary mb-1">
                    Sobre o livro
                  </p>
                  <div className="rounded-lg bg-ptprimary-900 py-5 px-7">
                    <div className="flex mb-2">
                      <p className="text-ptsecondary font-semibold mr-2">
                        Data de publicação:
                      </p>
                      <p className="text-ptsecondary">
                        {formatPublishedDate(
                          bookData.items[0].volumeInfo.publishedDate,
                        )}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-ptsecondary font-semibold mr-2">
                        Categoria:
                      </p>
                      <p className="text-ptsecondary">
                        {bookData.items[0].volumeInfo.categories}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-lg font-bold text-ptsecondary mb-1">
                    Autor(a)
                  </p>
                  <div className="rounded-lg bg-ptprimary-900 py-5 px-7">
                    <p className="text-ptsecondary">
                      {bookData.items[0].volumeInfo.authors}
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-lg font-bold text-ptsecondary mb-1">
                    Editora
                  </p>
                  <div className="rounded-lg bg-ptprimary-900 py-5 px-7">
                    <p className="text-ptsecondary">
                      {bookData.items[0].volumeInfo.publisher}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
