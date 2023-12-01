/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import React,  { Fragment, useState } from "react";
import DatePicker from "tailwind-datepicker-react";
import { ErrorPage } from "~/components/Error";
import Header from "~/components/Header";
import { LoadingPage } from "~/components/Loading";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import {
  formatAge,
  formatBirthday,
  formatCreatedUserDate,
} from "~/utils/dateFormat";
import * as Yup from "yup";
import { type IOptions } from "tailwind-datepicker-react/types/Options";
import { UserSessionPage } from "../../components/UserSession";

interface UserFormData {
  name: string;
  pronouns?: string;
  birthday?: Date;
}

const options: IOptions = {
  autoHide: true,
  todayBtn: true,
  todayBtnText: "Hoje",
  clearBtn: true,
  clearBtnText: "Limpar",
  maxDate: new Date(),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-ptprimary-900",
    todayBtn: "bg-ptsecondary text-ptprimary-900 hover:bg-ptsecondary/90",
    clearBtn: "bg-ptsecondary text-ptprimary-900 hover:bg-ptsecondary/90",
    icons: "bg-ptprimary-900 hover:bg-ptprimary-500",
    text: "",
    disabledText: "bg-ptsecondary/10",
    input: "bg-ptprimary-900",
    inputIcon: "text-ptsecondary",
    selected: "bg-ptsecondary text-ptprimary-900 hover:bg-ptsecondary/90",
  },
  icons: {
    prev: () => <ChevronLeftIcon width={20} height={20} />,
    next: () => <ChevronRightIcon width={20} height={20} />,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "pt",
  weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  disabledDates: [],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

export default function Profile() {
  const { toast } = useToast();
  const { data: sessionData, status } = useSession();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError,
    refetch
  } = api.user.getById.useQuery({
    id: sessionData?.user.id ?? "",
  });

  const {
    data: booksData,
    isLoading: isLoadingBooks
  } = api.book.getAllByUser.useQuery({
    userId: userData?.id !== undefined ? userData.id : "",
  })

  const {mutateAsync: updateUser} = api.user.update.useMutation();

  const initialValues = {
    id: userData?.id ?? "",
    name: userData?.name ?? "",
    pronouns: userData?.pronouns ?? "",
    birthday: userData?.birthday ?? new Date(),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    pronouns: Yup.string(),
    birthday: Yup.date(),
  });

  const totalBooks = () => {
    if(userData && booksData) {
      return booksData.map(books => books.createdAt).length
    }
  }

  const totalBooksThisYear = () => {
    const year = new Date().getFullYear()
    if (userData && booksData) {
      const thisYear = booksData.filter(books => {
        const savedYear = new Date(books.createdAt).getFullYear()
        return savedYear === year
      })
      return thisYear.length
    }
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleSaveUser = async (values: UserFormData) => {
    if (userData) {
      await updateUser({
        id: userData.id,
        name: values.name,
        pronouns: values.pronouns,
        birthday: values.birthday,
      });
      toast({
        variant: "success",
        title: "Alteração salva!",
        description: "Sua alteração foi salva com sucesso!",
      });
      setIsOpen(false);
      await refetch()
    }
  };

  if (status === "loading" && (isLoadingUser || isLoadingBooks)) {
    return <LoadingPage />
  }

  if (status === 'unauthenticated') {
    <UserSessionPage />
  }

  return (
    <>
      <div className="h-full min-h-screen bg-ptprimary-500">
        {isError && <ErrorPage />}
        {userData && status === 'authenticated' && (
          <>
            <Header />
            <div className="mt-11 grid justify-center">
              <div className="flex items-center">
                <Avatar className="h-[150px] w-[150px] mr-12">
                  <AvatarImage
                    src={
                      sessionData?.user.image ?? "https://github.com/shadcn.png"
                    }
                    alt={userData.name ?? "user"}
                  />
                </Avatar>
                <div className="ml16">
                  <p className="mb-8 text-5xl font-bold text-ptsecondary">
                    {userData.name}
                  </p>
                  <Button onClick={openModal}>Editar perfil</Button>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <div className="fixed inset-0 bg-ptsecondary/30 backdrop-blur-lg" aria-hidden="true">
                        <Formik
                          initialValues={initialValues}
                          onSubmit={handleSaveUser}
                          validationSchema={validationSchema}
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
                                    <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-ptprimary-500 p-6 text-left align-middle shadow-xl transition-all">
                                      <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                      >
                                        Editar perfil
                                      </Dialog.Title>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Nome
                                          </Label>
                                          <Input
                                            id="name"
                                            className="col-span-3"
                                            value={props.values.name}
                                            onChange={(e) => {
                                              void props.setFieldValue(
                                                "name",
                                                e.target.value,
                                              );
                                            }}
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Pronomes
                                          </Label>
                                          <Input
                                            id="pronouns"
                                            className="col-span-3"
                                            value={props.values.pronouns}
                                            onChange={(e) => {
                                              void props.setFieldValue(
                                                "pronouns",
                                                e.target.value,
                                              );
                                            }}
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label
                                            htmlFor="name"
                                            className="text-right"
                                          >
                                            Aniversário
                                          </Label>
                                          <DatePicker
                                            classNames="col-span-3"
                                            options={options}
                                            value={props.values.birthday}
                                            onChange={(selectedDate) => {
                                              void props.setFieldValue(
                                                "birthday",
                                                selectedDate,
                                              );
                                            }}
                                            show={show}
                                            setShow={handleClose}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end mt-4">
                                        <Button type="submit">
                                          Salvar alterações
                                        </Button>
                                      </div>
                                    </Dialog.Panel>
                                  </Transition.Child>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Dialog>
                  </Transition>
                </div>
                <div className="flex ml-40">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-ptsecondary">
                      {totalBooks()}
                    </p>
                    <p className="text-lg text-ptsecondary">Livros</p>
                  </div>
                  <div className="mx-4 h-[60px] w-[3px] rounded-sm bg-ptprimary-900"></div>
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-semibold text-ptsecondary">
                      {totalBooksThisYear()}
                    </p>
                    <p className="text-lg text-ptsecondary">Esse ano</p>
                  </div>
                </div>
              </div>
              <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
              <div className="grid sm:grid-cols-2 grid-cols-1">
                <h2 className="text-xl font-semibold text-ptsecondary">
                  Detalhes
                </h2>
                  {!userData.birthday && !userData.pronouns ? (
                    <p className="text-lg text-ptsecondary">Edite seu perfil para aparecer os detalhes!</p>
                  ): (
                    <p className="text-lg text-ptsecondary">
                      {formatAge(userData.birthday)}, {userData.pronouns}
                    </p>
                  )}
              </div>
              <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
              <div className="grid sm:grid-cols-2 grid-cols-1">
                <h2 className="text-xl font-semibold text-ptsecondary">
                  Aniversário
                </h2>
                <p className="text-lg text-ptsecondary">
                  {formatBirthday(userData.birthday)}
                </p>
              </div>
              <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
              <div className="grid sm:grid-cols-2 grid-cols-1">
                <h2 className="text-xl font-semibold text-ptsecondary">
                  Atividade
                </h2>
                <p className="text-lg text-ptsecondary">
                  {formatCreatedUserDate(userData.createdAt)}
                </p>
              </div>
            </div>
            <Toaster />
          </>
        )}
      </div>
    </>
  );
}
