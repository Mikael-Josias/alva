import { conformZodMessage } from "@conform-to/zod"
import { z } from "zod"

export const onboardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  userName: z.string().min(3).max(40).regex(/^[a-zA-Z0-9-]+$/, { message: "Usernames can only contain letter, number and -" }),
})

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>
}) {
  return z.object({
    userName: z.string().min(3).max(40).regex(/^[a-zA-Z0-9-]+$/, { message: "Usernames can only contain letter, number and -" }).pipe(z.string().superRefine((_, ctx) => {
      if (typeof options?.isUsernameUnique !== "function") {
        ctx.addIssue({
          code: "custom",
          message: conformZodMessage.VALIDATION_UNDEFINED,
          fatal: true,
        })
        return
      }
      return options.isUsernameUnique().then((isUnique) => {
        if (!isUnique) {
          ctx.addIssue({
            code: "custom",
            message: "Username is already in use",
          })
        }
      })
    })),
    fullName: z.string().min(3).max(150),
  })
}

export const settingsSchema = z.object({
  fullName: z.string().min(3).max(150),
  profileImage: z.string(),
})