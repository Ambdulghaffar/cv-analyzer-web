"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { AuthLayout } from "@/components/auth-layout"
import { ForgotPasswordIllustration } from "@/components/forgot-password-illustration"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

const resetPasswordSchema = z.object({
  password: z.string().min(8, "8 caractères minimum"),
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: values.password })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Mot de passe mis à jour avec succès.")
    router.push("/login")
  })

  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle="Choisissez un nouveau mot de passe pour votre compte."
      footerText="Vous vous souvenez de votre mot de passe ?"
      footerLinkText="Retour à la connexion"
      footerLinkHref="/login"
      panel={<ForgotPasswordIllustration />}
      panelVariant="light"
    >
      <form onSubmit={onSubmit} noValidate>
        <FieldGroup>
          <Field data-invalid={!!form.formState.errors.password}>
            <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
            <PasswordInput
              id="password"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
            />
            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
            Réinitialiser le mot de passe
          </Button>
        </FieldGroup>
      </form>
    </AuthLayout>
  )
}
