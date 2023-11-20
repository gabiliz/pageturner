/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { Button } from "~/components/ui/button";
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
import { ErrorPage } from "~/components/Error";
import { Fragment, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Form, Formik } from "formik";
import { Transition, Dialog } from "@headlessui/react";
import React from "react";
import { Toaster } from "~/components/ui/toaster";

interface LogFormData {
  listId: string;
  review: string;
  rating: number;
  progress: number;
}

interface BookFormData {
  id: string;
  listId: string;
  userId: string;
}

export default function Book() {
  const [, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const id = String(router.query.id);
  const bookCreateMutation = api.book.create.useMutation();
  const bookEditMutation = api.book.update.useMutation();
  const logMutation = api.log.createOrUpdateLogWithBook.useMutation();
  const utils = api.useContext();
  const { data: listsData } = api.list.getAll.useQuery();
  const { data: userData } = api.user.getById.useQuery({
    id: sessionData?.user.id ?? "",
  });
  const { data: savedBook, isFetching } = api.book.getBookById.useQuery({
    id: id,
  });
  const {
    data: bookData,
    isLoading,
    isError,
  } = api.book.getBookByApiId.useQuery({
    id: id,
  });

  const { data: existingLog } = api.log.getByBookAndUserId.useQuery({
    userId: userData?.id !== undefined ? userData.id : "",
    bookId: bookData?.id,
  });

  const { data: allBooks } = api.book.getAll.useQuery();

  const logInitialValues = {
    id: existingLog?.id ?? "",
    review: existingLog?.review ?? "",
    rating: existingLog?.rating ?? 0,
    progress: existingLog?.progress ?? 0,
    listId: existingLog?.listId ?? savedBook?.listId ?? ""
  };

  const selectInitialValues = {
    id: savedBook?.id ?? "",
    listId: savedBook?.listId ?? "",
    userId: savedBook?.userId ?? "",
  };

  const editThumbnailUrl = (url: string | undefined) => {
    const defaultThumbnail = "https://via.placeholder.com/564x900";
    if (url === undefined) {
      return defaultThumbnail;
    }
    return url.replace("zoom=1", "zoom=0").replace("&edge=curl", "");
  };

  const configAuthors = (authors: string[]) => {
    return authors.join("\n");
  };

  const returnToLastPage = () => {
    router.back();
  };

  const pageCount = (data: number, logData: number) => {
    return `${logData}/${data}`;
  };

  const pagePercentage = (data: number, logData: number) => {
    const readPercentage = (logData / data) * 100;

    return readPercentage;
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSelectChange = (values: BookFormData) => {
    setSelectedOption(values.listId);

    if (sessionData) {
      if (allBooks?.find((book) => book.id === bookData.id)) {
        bookEditMutation.mutate({
          listId: values.listId,
          id: bookData.id,
          userId: sessionData.user.id,
        });
      } else {
        bookCreateMutation.mutate({
          listId: values.listId,
          id: bookData.id,
          userId: sessionData.user.id,
        });
      }
    }
    if (savedBook) {
      void utils.book.getBookById.fetch({ id: savedBook.id });
    }
  };

  const handleSaveLog = (values: LogFormData) => {
    if(sessionData) {
      logMutation.mutate({
        listId: values.listId,
        userId: sessionData.user.id,
        bookId: bookData.id,
        review: values.review,
        rating: values.rating,
        progress: Number(values.progress)
      })
      toast({
        variant: "success",
        title: "Registro salvo!",
        description: "Seu registro foi salvo com sucesso!",
      });
      setIsOpen(false);
      void utils.log.getByBookAndUserId.fetch({ userId: sessionData.user.id, bookId: bookData.id })
    }
  }

  return (
    <>
      <div className="h-screen bg-ptprimary-500">
        {isLoading && isFetching && <LoadingPage />}
        {isError && <ErrorPage />}
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
                    bookData.volumeInfo.imageLinks?.thumbnail ??
                      "https://via.placeholder.com/564x900",
                  )}
                  width={280}
                  height={500}
                  alt={""}
                />
                <div className="flex flex-col items-center mt-5">
                  {existingLog?.rating ? (
                    <Rating
                      className="mb-3"
                      defaultValue={existingLog.rating}
                      precision={0.5}
                      size="large"
                      readOnly
                    />
                  ) : null}
                  {existingLog?.progress ? (
                    <Progress
                      className="mb-6"
                      showValueLabel={true}
                      label={pageCount(
                        bookData.volumeInfo.pageCount,
                        existingLog.progress,
                      )}
                      size="md"
                      aria-label="Loading..."
                      value={pagePercentage(
                        bookData.volumeInfo.pageCount,
                        existingLog.progress,
                      )}
                      classNames={{
                        track: "bg-ptprimary-900",
                        indicator: "bg-ptsecondary",
                        label: "font-medium text-ptsecondary",
                        value: "text-ptsecondary/90",
                      }}
                    />
                  ) : null}
                  {sessionData ? (
                    <Button className="w-60 mb-6" onClick={openModal}>
                      Registrar
                    </Button>
                  ) : null}
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <div
                        className="fixed inset-0 bg-ptsecondary/30 backdrop-blur-lg"
                        aria-hidden="true"
                      >
                        <Formik
                          initialValues={logInitialValues}
                          onSubmit={handleSaveLog}
                        >
                          {(props) => (
                            <Form>
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <div className="fixed inset-0 bg-black/25" />
                              </Transition.Child>

                              <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                  <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                  >
                                    <div className="fixed">
                                      <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-ptprimary-500 p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                          as="h3"
                                          className="text-lg mb-2 leading-6 text-ptsecondary"
                                        >
                                          Log do livro
                                        </Dialog.Title>
                                        <Dialog.Description className="mb-4">
                                          {bookData.volumeInfo.title}
                                        </Dialog.Description>
                                        <div className="grid grid-cols-5 grid-flow-col gap-3 mb-8">
                                          <Image
                                            className="rounded-md row-span-2"
                                            src={editThumbnailUrl(
                                              bookData.volumeInfo.imageLinks
                                                ?.thumbnail ??
                                                "https://via.placeholder.com/564x900",
                                            )}
                                            width={150}
                                            height={500}
                                            alt={""}
                                          />
                                          <div className="col-span-5">
                                            <Label htmlFor="name">Review</Label>
                                            <Textarea
                                              value={props.values.review}
                                              onChange={(e) => {
                                                void props.setFieldValue(
                                                  "review",
                                                  e.target.value,
                                                );
                                              }}
                                            />
                                          </div>
                                          <div className="col-span-2">
                                            <Label htmlFor="name">Lista</Label>
                                            <Select
                                              onValueChange={(value) => {
                                                void props.setFieldValue(
                                                  "listId",
                                                  value,
                                                );
                                                void props.submitForm();
                                              }}
                                              value={props.values.listId}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma lista" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectGroup>
                                                  {listsData?.map((list) => (
                                                    <SelectItem
                                                      key={list.id}
                                                      value={list.id}
                                                    >
                                                      {list.name}
                                                    </SelectItem>
                                                  ))}
                                                </SelectGroup>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="col-span-2">
                                            <Label htmlFor="name">
                                              Progresso
                                            </Label>
                                            <Input
                                              type="number"
                                              max={bookData.volumeInfo.pageCount}
                                              id="progress"
                                              className="col-span-6"
                                              value={props.values.progress}
                                              onChange={(e) => {
                                                void props.setFieldValue(
                                                  "progress",
                                                  e.target.value,
                                                );
                                              }}
                                            />
                                          </div>
                                          <div className="flex flex-col justify-center col-span-1">
                                            <Label className="mb-2">Nota</Label>
                                            <Rating
                                              name="half-rating"
                                              size="large"
                                              precision={0.5}
                                              value={props.values.rating}
                                              onChange={(event, newValue) => {
                                                void props.setFieldValue("rating", newValue);
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                          <Button type="submit">
                                            Salvar alterações
                                          </Button>
                                        </div>
                                      </Dialog.Panel>
                                    </div>
                                  </Transition.Child>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Dialog>
                  </Transition>
                  {sessionData ? (
                    <>
                      <Formik
                        initialValues={selectInitialValues}
                        onSubmit={handleSelectChange}
                      >
                        {(props) => (
                          <Form>
                            <Select
                              onValueChange={(value) => {
                                void props.setFieldValue("listId", value);
                                void props.submitForm();
                              }}
                              value={props.values.listId}
                            >
                              <SelectTrigger className="w-60">
                                <SelectValue placeholder="Selecione uma lista" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {listsData?.map((list) => (
                                    <SelectItem key={list.id} value={list.id}>
                                      {list.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Form>
                        )}
                      </Formik>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="ml-8 max-w-lg">
                <h1 className="mb-7 text-4xl font-black text-ptsecondary">
                  {bookData.volumeInfo.title}
                </h1>
                <p
                  className="text-ptsecondary"
                  dangerouslySetInnerHTML={{
                    __html: bookData.volumeInfo.description,
                  }}
                />
                {existingLog?.review ? (
                  <div className="mt-8">
                    <p className="text-ptsecondary text-2xl font-bold mb-1">
                      Review
                    </p>
                    <div className="bg-ptprimary-900 rounded-lg py-5 px-7">
                      <p className="text-ptsecondary">{existingLog.review}</p>
                    </div>
                  </div>
                ) : null}
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
                        {formatPublishedDate(bookData.volumeInfo.publishedDate)}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-ptsecondary font-semibold mr-2">
                        Categoria:
                      </p>
                      <p className="text-ptsecondary">
                        {bookData.volumeInfo.categories}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-lg font-bold text-ptsecondary mb-1">
                    Autor(a)
                  </p>
                  <div className="rounded-lg bg-ptprimary-900 py-5 px-7">
                    <p className="text-ptsecondary whitespace-pre-line">
                      {configAuthors(bookData.volumeInfo.authors)}
                    </p>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-lg font-bold text-ptsecondary mb-1">
                    Editora
                  </p>
                  <div className="rounded-lg bg-ptprimary-900 py-5 px-7">
                    <p className="text-ptsecondary">
                      {bookData.volumeInfo.publisher}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </>
        )}
      </div>
    </>
  );
}
