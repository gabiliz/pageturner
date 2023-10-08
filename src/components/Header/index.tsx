"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  const { data: sessionData } = useSession();

  return (
    <main>
      <div className="flex items-center justify-around py-3">
        <a className="text-ptsecondary font-semibold text-xl" href="/">Pageturner</a>
        <div className="w-6/12">
          <Input
            type="text"
            placeholder="Pesquise por título, autor, editora, ISBN..."
          />
        </div>
        {sessionData ? 
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={sessionData?.user.image || "https://github.com/shadcn.png"} alt={sessionData?.user.name || "user"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="ml-4">
                  {sessionData?.user?.name}
                </p>
                <ChevronDownIcon className="h-4 w-4 ml-2 text-ptsecondary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><Link href='/profile'>Perfil</Link></DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem><a onClick={() => signOut()}>Sair</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        : 
          <Button onClick={() => signIn("google")}>Sign In</Button>
        }
      </div>
    </main>
  );
}
