"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import BookCard from "~/components/BookCard";
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

export default function Book() {
  const router = useRouter()

  const returnToLastPage = () => {
    router.back();
  }

  return (
    <>
      <div className="h-screen bg-ptprimary-500">
        <Header />
        <div className="px-16 py-8">
          <Button onClick={returnToLastPage}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex p-16">
          <div>
            <BookCard isProgress={false} isNotOnBookPage={false} />
            <div className="flex flex-col items-center mt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-60 mb-6">Registrar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Edição
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="name"
                        defaultValue="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Input
                        id="username"
                        defaultValue="@peduarte"
                        className="col-span-3"
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
              Teias mortais
            </h1>
            <p className="text-ptsecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              venenatis in felis et commodo. Duis vitae porta nulla. Aliquam
              ultricies lectus malesuada, vestibulum tellus non, laoreet urna.
              Donec mauris purus, ornare sit amet est ac, vehicula tempor diam.
              Phasellus suscipit lorem vel feugiat semper. Vivamus feugiat
              interdum pellentesque. Ut euismod nisi ac tortor accumsan maximus.
              Integer ac laoreet ante. Aliquam purus odio, congue accumsan ipsum
              eget, hendrerit gravida sapien. Integer tincidunt mauris eget arcu
              gravida, non dignissim ante bibendum. Nunc est est, vestibulum in
              faucibus vitae, ultricies quis lorem. Aliquam vitae eleifend eros.
              In a tortor porta, eleifend elit non, consequat purus. Vestibulum
              consequat, justo non lobortis eleifend, sapien nunc commodo metus,
              eget dapibus metus purus eu augue. Fusce vehicula molestie
              lobortis. Donec elementum finibus enim suscipit dignissim.
              Curabitur magna nisi, malesuada porta blandit quis, lobortis vel
              enim. Nunc porta justo nibh. Suspendisse sit amet mi nisi. Proin
              eget nunc eget ipsum bibendum bibendum. Fusce vitae nulla in ante
              maximus venenatis sed ut odio. Nulla accumsan, ipsum vel posuere
              varius, urna odio dignissim justo, nec porta lacus augue quis
              libero.
            </p>
          </div>
          <div>
            <div>
              <p className="font-bold text-ptsecondary">Sobre o livro</p>
              <div className="w-96 h-24 rounded-lg bg-ptprimary-900">
                <p className="text-ptsecondary">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-ptsecondary">Autor(a)</p>
              <div className="w-96 h-24 rounded-lg bg-ptprimary-900">
                <p className="text-ptsecondary">AAAAAAAAAA</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-ptsecondary">Editora</p>
              <div className="w-96 h-20 rounded-lg bg-ptprimary-900">
                <p className="text-ptsecondary">AAAAAAAAAA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
