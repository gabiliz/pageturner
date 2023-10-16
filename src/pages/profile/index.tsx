
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import Header from "~/components/Header";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/utils/api";
import {
  formatAge,
  formatBirthday,
  formatCreatedUserDate,
} from "~/utils/dateFormat";

const people = [
  { id: 1, name: 'Ação' },
  { id: 2, name: 'Romance' },
  { id: 3, name: 'Fantasia' },
  { id: 4, name: 'Horror' },
  { id: 5, name: 'Sci-fi' },
]

export default function Profile() {
  const { data: sessionData } = useSession();

  const userData = api.user.getById.useQuery({
    id: sessionData?.user.id ?? '',
  });
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  return (
    <div className="h-screen bg-ptprimary-500">
      <Header />
      <div className="mt-11 grid justify-center">
        <div className="flex items-center">
          <Avatar className="h-[150px] w-[150px] mr-12">
            <AvatarImage
              src={sessionData?.user.image ?? "https://github.com/shadcn.png"}
              alt={sessionData?.user.name ?? "user"}
            />
          </Avatar>
          <div className="ml16">
            <p className="mb-8 text-5xl font-bold text-ptsecondary">
              {sessionData?.user.name}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Editar perfil</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar perfil</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      defaultValue={sessionData?.user.name ?? ""}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Pronomes
                    </Label>
                    <Input id="pronouns" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Aniversário
                    </Label>
                    <Input 
                      type="date" 
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Gêneros
                    </Label>
                    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-[280px] h-[40px] cursor-default rounded-lg bg-ptprimary-900 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">
                          {selectedPeople.map((person) => person?.name).join(', ')}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-[280px] overflow-auto rounded-md bg-ptprimary-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-ptprimary-500 text-amber-900"
                                      : "text-gray-900"
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex ml-40">
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-ptsecondary">100</p>
              <p className="text-lg text-ptsecondary">Livros</p>
            </div>
            <div className="mx-4 h-[60px] w-[3px] rounded-sm bg-ptprimary-900"></div>
            <div className="flex flex-col items-center">
              <p className="text-2xl font-semibold text-ptsecondary">20</p>
              <p className="text-lg text-ptsecondary">Esse ano</p>
            </div>
          </div>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <h2 className="text-xl font-semibold text-ptsecondary">
            Detalhes
          </h2>
          <p className="text-lg text-ptsecondary">
            {formatAge(userData.data?.birthday)}, Ela/Dela
          </p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <h2 className="text-xl font-semibold text-ptsecondary">
            Aniversário
          </h2>
          <p className="text-lg text-ptsecondary">
            {formatBirthday(userData.data?.birthday)}
          </p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <h2 className="text-xl font-semibold text-ptsecondary">
            Gêneros
          </h2>
          <p className="text-lg text-ptsecondary">
            Horror, Fantasia, Sci-Fi, Comédia
          </p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <h2 className="text-xl font-semibold text-ptsecondary">
            Atividade
          </h2>
          <p className="text-lg text-ptsecondary">
            {formatCreatedUserDate(userData.data?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
