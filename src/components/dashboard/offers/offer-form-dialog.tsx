"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createOffer, updateOffer } from "@/lib/api"
import type { JobOffer } from "@/types/offer"

const offerSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis."),
  description: z
    .string()
    .trim()
    .min(50, "La description doit contenir au moins 50 caractères."),
})

type OfferValues = z.infer<typeof offerSchema>

interface OfferFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  offer?: JobOffer | null
  onSaved: (offer: JobOffer) => void
}

export function OfferFormDialog({
  open,
  onOpenChange,
  offer,
  onSaved,
}: OfferFormDialogProps) {
  const isEditing = !!offer

  const form = useForm<OfferValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: { title: "", description: "" },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        title: offer?.title ?? "",
        description: offer?.description ?? "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, offer])

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = isEditing
        ? await updateOffer(offer.id, values)
        : await createOffer(values.title, values.description)
      onSaved(result)
      toast.success(
        isEditing ? "Offre mise à jour avec succès." : "Offre créée avec succès."
      )
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue."
      )
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden sm:max-w-lg">
        <DialogHeader className="shrink-0">
          <DialogTitle>
            {isEditing ? "Modifier l'offre" : "Créer une offre"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
          <FieldGroup className="min-h-0 flex-1 overflow-y-auto">
            <Field data-invalid={!!form.formState.errors.title}>
              <FieldLabel htmlFor="title">Titre</FieldLabel>
              <Input
                id="title"
                placeholder="Ex. Développeur Full Stack"
                aria-invalid={!!form.formState.errors.title}
                {...form.register("title")}
              />
              <FieldError errors={[form.formState.errors.title]} />
            </Field>

            <Field data-invalid={!!form.formState.errors.description}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                rows={8}
                className="min-h-40"
                placeholder="Décrivez le poste, les missions et les compétences recherchées..."
                aria-invalid={!!form.formState.errors.description}
                {...form.register("description")}
              />
              <FieldError errors={[form.formState.errors.description]} />
            </Field>
          </FieldGroup>

          <DialogFooter className="shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={form.formState.isSubmitting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Enregistrement...
                </>
              ) : isEditing ? (
                "Enregistrer"
              ) : (
                "Créer l'offre"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
