"use client"

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main
      className="bg-primary-500 flex flex-col min-h-screen items-center justify-between justify-around p-12 lg:flex-row lg:p-24"
    >
      <h1
        className="text-secondary font-bold text-5xl lg:text-8xl"
      >
        Transforme cada página em uma jornada com <span className="text-tertiary"> Pageturner.</span>
      </h1>
      <div
        className="flex flex-col justify-center bg-primary-900 w-80 h-36 rounded-3xl lg:w-[613px] lg:h-[322px] lg:ml-10"
      >
        <div
          className="flex flex-col items-center m-10"
        >
          <p
            className="text-secondary font-semibold text-xl mb-4 lg:text-4xl lg:mb-8"
          >
            Comece por aqui
          </p>
          <Button
            className="bg-secondary rounded-[45px] text-primary-900 text-base p-8 lg:text-2xl lg:p-10"
            onClick={() => signIn("google")}
          >
            Continuar com Google
          </Button>
        </div>
      </div>
    </main>
  );
}
