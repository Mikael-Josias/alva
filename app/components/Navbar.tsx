import Image from "next/image"
import Link from "next/link"
import alvaLogo from "@/public/alva-logo.png"
import { AuthModal } from "./AuthModal"

export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/">
        <Image src={alvaLogo} alt="Logo Alva estrela amarela" className="" />
      </Link>
      <AuthModal />
    </div>
  )
}