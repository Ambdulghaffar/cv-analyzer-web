"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import type { Profile } from "@/types"

const settingsSchema = z.object({
  fullName: z.string().trim().min(1, "Le nom complet est requis."),
})

type SettingsValues = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  profile: Profile
  email: string
}

export function SettingsForm({ profile, email }: SettingsFormProps) {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { fullName: profile.full_name ?? "" },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: values.fullName })
      .eq("id", profile.id)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success("Informations mises à jour avec succès.")
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.fullName}>
          <FieldLabel htmlFor="fullName">Nom complet</FieldLabel>
          <Input
            id="fullName"
            aria-invalid={!!form.formState.errors.fullName}
            {...form.register("fullName")}
          />
          <FieldError errors={[form.formState.errors.fullName]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" value={email} disabled readOnly />
          <FieldDescription>
            L&apos;email ne peut pas être modifié.
          </FieldDescription>
        </Field>

        <Button
          type="submit"
          className="w-fit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
          Enregistrer
        </Button>
      </FieldGroup>
    </form>
  )
}
