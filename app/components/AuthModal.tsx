import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import Image from "next/image"
import alvaLogo from "@/public/alva-logo.png"
import { signIn } from "../lib/auth"
import { GithubAuthButton, GoogleAuthButton } from "./SubmitButtons"

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for free</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <Image src={alvaLogo} alt="Logo Alva estrela amarela" className="" />
        </DialogHeader>

        <div className="flex flex-col mt-5 gap-3">
          <form action={async () => {
            "use server"
            await signIn("google")
          }} className="w-full">
            <GoogleAuthButton />
          </form>
          <form action={async () => {
            "use server"
            await signIn("github")
          }}>
            <GithubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}