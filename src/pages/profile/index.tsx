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

export default function Profile() {
  const { data: sessionData } = useSession();

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
                      defaultValue={sessionData?.user.name ?? ''}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Pronomes
                    </Label>
                    <Input
                      id="pronouns"
                      className="col-span-3"
                    />
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
          <p className="text-lg text-ptsecondary">21 anos, Ela/Dela</p>
        </div>
        <div className="my-8 h-[3px] w-[800px] bg-ptprimary-900"></div>
        <div className="flex items-center">
          <h2 className="mr-28 text-xl font-semibold text-ptsecondary">
            Aniversário
          </h2>
          <p className="text-lg text-ptsecondary">15 de Fevereiro</p>
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
          <p className="text-lg text-ptsecondary">Entrou em Agosto de 2023</p>
        </div>
      </div>
    </div>
  );
}
