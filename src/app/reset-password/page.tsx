"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { ROUTES } from "@/lib/constants"
import { AuthLayout } from "@/components/auth-layout"
import { ForgotPasswordIllustration } from "@/components/forgot-password-illustration"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

const resetPasswordSchema = z.object({
  password: z.string().min(8, "8 caractères minimum"),
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSessionReady, setIsSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState(false)

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
  })

  useEffect(() => {
    const code = searchParams.get("code")

    async function verifyCode() {
      if (!code) {
        setSessionError(true)
        return
      }

      const supabase = createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        setSessionError(true)
        return
      }

      setIsSessionReady(true)
    }

    verifyCode()
  }, [searchParams])

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: values.password })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Mot de passe mis à jour avec succès.")
    router.push(ROUTES.login)
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
      {sessionError ? (
        <div className="flex flex-col items-center gap-3 py-2 text-center">
          <p className="text-sm text-muted-foreground">
            Ce lien de réinitialisation est invalide ou a expiré. Veuillez refaire une demande.
          </p>
          <Link
            href={ROUTES.forgotPassword}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Refaire une demande
          </Link>
        </div>
      ) : !isSessionReady ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Vérification du lien...</p>
        </div>
      ) : (
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
      )}
    </AuthLayout>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  )
}
