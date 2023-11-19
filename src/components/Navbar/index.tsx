import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar () {
  const pathname = usePathname()

  return (
    <div className="my-8 flex justify-around px-40">
      <Link href="/" className="text-ptsecondary text-xl font-semibold flex flex-col items-center">
        Home
        {pathname === '/' ? 
          <div className="h-2 w-2 mt-1 bg-ptsecondary rounded-full"></div>
        : null}
      </Link>
      <Link href="/library" className="text-ptsecondary text-xl font-semibold flex flex-col items-center">
        Biblioteca
        {pathname === '/library' ? 
          <div className="h-2 w-2 mt-1 bg-ptsecondary rounded-full"></div>
        : null}
      </Link>
      <Link href="/categories" className="text-ptsecondary text-xl font-semibold flex flex-col items-center">
        Categorias
        {pathname === '/categories' ? 
          <div className="h-2 w-2 mt-1 bg-ptsecondary rounded-full"></div>
        : null}
      </Link>
  </div>
  )
}