"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useState } from "react"
import { SettingsAction } from "../actions"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { settingsSchema } from "../lib/zodSchemas"
import { X } from "lucide-react"
import { UploadDropzone } from "../lib/uploadthing"
import { toast } from "sonner"

interface iAppProps {
  fullName: string,
  email: string,
  profileImage: string
}

export default function SettingsForm({ fullName, email, profileImage }: iAppProps) {
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage)
  const [lastResult, action] = useActionState(SettingsAction, undefined)
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })
  const handleDeleteImage = () => {
    setCurrentProfileImage("")
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full name</Label>
            <Input name={fields.fullName.name} key={fields.fullName.key} defaultValue={fullName} placeholder="James Smith" />
            <p className="text-red-500 text-xs">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input name={fields.profileImage.name} key={fields.profileImage.key} defaultValue={email} placeholder="yourmail@email.com" disabled />
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Profile Image</Label>
            <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
            {currentProfileImage ? (
              <div className="relative size-16">
                <img src={currentProfileImage} alt="Profile Image" className="size-16 rounded-full" />
                <Button onClick={handleDeleteImage} type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3"><X className="size-4" /></Button>
              </div>
            ) : (
              <UploadDropzone endpoint="imageUploader" onClientUploadComplete={(res) => {
                setCurrentProfileImage(res[0].url)
                toast.success("Profile Image has been uploaded!")
              }} onUploadError={() => {
                toast.error("Something went wrong.")
              }} />
            )}
            <p className="text-red-500 text-xs">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}