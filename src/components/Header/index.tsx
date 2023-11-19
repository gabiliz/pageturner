"use client";

import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const [searchBook, setSearchBook] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: sessionData } = useSession();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleChangeChevronIcon = () => {
    setIsDropdownOpen(isSidebarOpen);
  }

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(searchBook) {
        void router.push(`/search?query=${searchBook}`);
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBook(e.target.value);
  }

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-ptsecondary rounded-lg lg:hidden hover:bg-ptprimary-900 focus:outline-none focus:ring-2 focus:ring-ptsecondary"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon width={30} height={30} />
      </button>
      <main>
        <div className="grid lg:grid-cols-3 items-center justify-items-center py-3">
          <Link className="text-ptsecondary font-semibold text-xl mx-3" href="/">
            Pageturner
          </Link>
          <div className="w-full">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4 text-ptsecondary" />
              </div>
              <Input
                type="text"
                className="block w-full pr-10 text-sm"
                value={searchBook}
                placeholder="Pesquise por título, autor, editora, ISBN..."
                onKeyDown={handleEnterPress}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {sessionData ? (
            <DropdownMenu>
              <DropdownMenuTrigger onClick={() => handleChangeChevronIcon()}>
                <div className="flex items-center mx-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        sessionData?.user.image ??
                        "https://github.com/shadcn.png"
                      }
                      alt={sessionData?.user.name ?? "user"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="ml-4 text-ptsecondary">{sessionData?.user?.name}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link className="text-ptsecondary" href="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a className="cursor-pointer text-ptsecondary hover:text-red-500" onClick={() => void signOut()}>Sair</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => void signIn("google")}>Sign In</Button>
          )}
        </div>
      </main>
    </div>
  );
}
