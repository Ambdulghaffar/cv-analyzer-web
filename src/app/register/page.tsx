"use client"

import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { AuthLayout } from "@/components/auth-layout"
import { RegisterIllustration } from "@/components/register-illustration"
import { GoogleAuthButton } from "@/components/google-auth-button"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const registerSchema = z.object({
  name: z.string().min(1, "Le nom complet est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  role: z.enum(["candidate", "recruiter"], {
    message: "Sélectionnez un rôle",
  }),
})

type RegisterValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.name,
          role: values.role,
        },
      },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Vérifiez votre boîte mail pour confirmer votre compte.")
    router.push("/login")
  })

  const handleGoogleSignUp = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <AuthLayout
      title="Rejoignez CV Analyzer AI"
      subtitle="Créez votre compte pour commencer à analyser vos candidatures."
      footerText="Déjà un compte ?"
      footerLinkText="Se connecter"
      footerLinkHref="/login"
      panel={<RegisterIllustration />}
      panelVariant="light"
      scrollable
    >
      <div className="flex flex-col gap-6">
        <GoogleAuthButton onClick={handleGoogleSignUp} />

        <FieldSeparator>ou</FieldSeparator>

        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="name">Nom complet</FieldLabel>
              <Input
                id="name"
                placeholder="Jane Doe"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </Field>

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
            </Field>

            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
              <PasswordInput
                id="password"
                aria-invalid={!!form.formState.errors.password}
                {...form.register("password")}
              />
              <FieldError errors={[form.formState.errors.password]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.role}>
              <FieldLabel>Vous êtes</FieldLabel>
              <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange}>
                    <FieldLabel htmlFor="role-candidate">
                      <Field orientation="horizontal">
                        <RadioGroupItem value="candidate" id="role-candidate" />
                        <FieldContent>
                          <FieldTitle>Candidat</FieldTitle>
                          <FieldDescription>
                            Analysez votre CV et améliorez vos candidatures
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="role-recruiter">
                      <Field orientation="horizontal">
                        <RadioGroupItem value="recruiter" id="role-recruiter" />
                        <FieldContent>
                          <FieldTitle>Recruteur</FieldTitle>
                          <FieldDescription>
                            Comparez et classez vos candidats
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                )}
              />
              <FieldError errors={[form.formState.errors.role]} />
            </Field>

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              Créer mon compte
            </Button>
          </FieldGroup>
        </form>
      </div>
    </AuthLayout>
  )
}
