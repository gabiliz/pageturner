"use client"

import { Button } from "~/components/ui/button"
import { signIn } from "next-auth/react";


export default function SignIn () {
  return (
    <main
      className="bg-ptprimary-500 flex flex-col min-h-screen items-center justify-between p-12 lg:flex-row lg:p-24"
    >
      <h1
        className="text-ptsecondary font-bold text-5xl lg:text-8xl"
      >
        Transforme cada página em uma jornada com <span className="text-pttertiary"> Pageturner.</span>
      </h1>
      <div
        className="flex flex-col justify-center bg-ptprimary-900 w-80 h-36 rounded-3xl lg:w-[613px] lg:h-[322px] lg:ml-10"
      >
        <div
          className="flex flex-col items-center m-10"
        >
          <p
            className="text-ptsecondary font-semibold text-xl mb-4 lg:text-4xl lg:mb-8"
          >
            Comece por aqui
          </p>
          <Button
            className="bg-ptsecondary rounded-[45px] text-ptprimary-900 text-base p-8 lg:text-2xl lg:p-10"
            onClick={() => signIn("google")}
          >
            Continuar com Google
          </Button>
        </div>
      </div>
    </main>
  )
}