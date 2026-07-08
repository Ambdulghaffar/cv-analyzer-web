"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { ROUTES } from "@/lib/constants"
import { AuthLayout } from "@/components/auth-layout"
import { ForgotPasswordIllustration } from "@/components/forgot-password-illustration"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse email invalide"),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}${ROUTES.resetPassword}`,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    setSubmitted(true)
  })

  return (
    <AuthLayout
      title="Réinitialisez votre mot de passe"
      subtitle="Indiquez votre email pour recevoir un lien de réinitialisation."
      footerText="Vous vous souvenez de votre mot de passe ?"
      footerLinkText="Retour à la connexion"
      footerLinkHref="/login"
      panel={<ForgotPasswordIllustration />}
      panelVariant="light"
    >
      {submitted ? (
        <p className="text-sm font-semibold text-center">
          Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                aria-invalid={!!form.formState.errors.email}
                {...form.register("email")}
              />
              <FieldError errors={[form.formState.errors.email]} />
              <FieldDescription>
                Nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </FieldDescription>
            </Field>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              Envoyer le lien de réinitialisation
            </Button>
          </FieldGroup>
        </form>
      )}
    </AuthLayout>
  )
}
