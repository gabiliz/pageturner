/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
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
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/utils/api";
import { formatAge, formatBirthday, formatCreatedUserDate } from "~/utils/dateFormat";

export default function Profile() {
  const { data: sessionData } = useSession();

  const userData = api.user.getById.useQuery({
    id: "clngynn8p00041o7ve1y4urd4",
  });

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
                  <DialogDescription>
                    Faça alterações no seu perfil aqui. Clique em salvar quando
                    tiver finalizado.
                  </DialogDescription>
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
                    <Input type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Gêneros
                    </Label>
                    <Select>
                      <SelectTrigger className="w-[277px]">
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
        <div className="flex items-center">
          <h2 className="mr-36 text-xl font-semibold text-ptsecondary">
            Detalhes
          </h2>
          <p className="text-lg text-ptsecondary">{formatAge(userData.data?.birthday)}, Ela/Dela</p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="flex items-center">
          <h2 className="mr-28 text-xl font-semibold text-ptsecondary">
            Aniversário
          </h2>
          <p className="text-lg text-ptsecondary">{formatBirthday(userData.data?.birthday)}</p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="flex items-center">
          <h2 className="mr-36 text-xl font-semibold text-ptsecondary">
            Gêneros
          </h2>
          <p className="text-lg text-ptsecondary">
            Horror, Fantasia, Sci-Fi, Comédia
          </p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="flex items-center">
          <h2 className="mr-36 text-xl font-semibold text-ptsecondary">
            Atividade
          </h2>
          <p className="text-lg text-ptsecondary">{formatCreatedUserDate(userData.data?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
