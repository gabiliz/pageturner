import { signIn } from "next-auth/react"
import { Button } from "../ui/button"

export const UserSessionPage = () => {
  return (
    <div className="absolute top-0 right-0 flex h-screen w-screen bg-ptprimary-500 items-center justify-center">
      <p className="font-bold text-6xl text-ptsecondary">Você precisa estar logado para acessar essa página</p>
      <Button className="mt-10" onClick={() => void signIn("google")}>Sign In</Button>
    </div>
  )
}