"use client"

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="bg-primary-500 flex min-h-screen items-center justify-between p-24">
      <h1 className="text-secondary font-bold text-8xl">Transforme cada página em uma jornada com <span className="text-tertiary">Pageturner.</span></h1>
      <div className="flex flex-col justify-center bg-primary-900 w-[613px] h-[322px] rounded-3xl ml-10">
        <div className="flex flex-col items-center m-10">
          <p className="text-secondary font-semibold text-4xl mb-8">Comece por aqui</p>
          <Button className="bg-secondary rounded-[45px] text-primary-900 text-2xl p-10" onClick={() => signIn("google")}>Continuar com Google</Button>
        </div>
      </div>
    </main>
  );
}
