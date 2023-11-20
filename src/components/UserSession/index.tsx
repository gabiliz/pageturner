import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import router from "next/router";

export const UserSessionPage = () => {

  const returnToLastPage = () => {
    router.back();
  };
  return (
    <div className="absolute top-0 right-0 flex flex-col h-screen w-screen bg-ptprimary-500 items-center justify-center">
      <p className="font-bold text-6xl text-ptsecondary">Você precisa estar logado para acessar essa página</p>
      <Button className="w-60 h-30 text-lg font mt-12" onClick={() => void signIn("google")}>Login</Button>
      <Button variant='outline' className="w-60 h-30 text-lg font mt-8" onClick={returnToLastPage}>Retornar</Button>
    </div>
  )
}