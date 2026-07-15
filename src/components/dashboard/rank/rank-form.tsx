"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { FileText, Loader2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { listOffers, rankCandidates } from "@/lib/api"
import type { RankingResult } from "@/types/analysis"
import type { JobOffer } from "@/types/offer"

const MAX_FILES = 10
const FREE_TEXT_VALUE = "Saisie libre"
const LOADING_VALUE = "__loading__"

const rankSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(50, "L'offre d'emploi doit contenir au moins 50 caractères."),
  cvFiles: z
    .array(z.instanceof(File))
    .min(1, "Merci de joindre au moins un CV.")
    .max(MAX_FILES, `Vous ne pouvez pas importer plus de ${MAX_FILES} CV.`)
    .refine((files) => files.every((file) => file.type === "application/pdf"), {
      message: "Tous les fichiers doivent être des PDF.",
    }),
})

type RankValues = z.infer<typeof rankSchema>

interface RankFormProps {
  onResult: (result: RankingResult) => void
}

export function RankForm({ onResult }: RankFormProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [offers, setOffers] = useState<JobOffer[] | null>(null)
  const [selectedOfferId, setSelectedOfferId] = useState(FREE_TEXT_VALUE)

  const form = useForm<RankValues>({
    resolver: zodResolver(rankSchema),
    defaultValues: { jobDescription: "", cvFiles: [] },
  })

  const cvFiles = form.watch("cvFiles")

  useEffect(() => {
    listOffers()
      .then(setOffers)
      .catch(() => setOffers([]))
  }, [])

  const handleOfferChange = (value: string | null) => {
    if (!value) return
    setSelectedOfferId(value)

    if (value === FREE_TEXT_VALUE) {
      form.setValue("jobDescription", "", { shouldValidate: true })
      return
    }

    const offer = offers?.find((item) => item.id === value)
    form.setValue("jobDescription", offer?.description ?? "", {
      shouldValidate: true,
    })
  }

  const isOfferSelected = selectedOfferId !== FREE_TEXT_VALUE
  const selectedOfferLabel =
    selectedOfferId === FREE_TEXT_VALUE
      ? "Saisie libre"
      : (offers?.find((item) => item.id === selectedOfferId)?.title ??
        "Saisie libre")

  const addFiles = (incoming: FileList | File[]) => {
    const current = form.getValues("cvFiles")
    const merged = [...current, ...Array.from(incoming)]

    if (merged.length > MAX_FILES) {
      toast.error(`Vous ne pouvez pas importer plus de ${MAX_FILES} CV.`)
    }

    form.setValue("cvFiles", merged.slice(0, MAX_FILES), {
      shouldValidate: true,
    })
  }

  const removeFile = (index: number) => {
    const current = form.getValues("cvFiles")
    form.setValue(
      "cvFiles",
      current.filter((_, i) => i !== index),
      { shouldValidate: true }
    )
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await rankCandidates(values.jobDescription, values.cvFiles)
      onResult(result)
      toast.success("Comparaison des candidats terminée.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue."
      )
    }
  })

  const isSubmitting = form.formState.isSubmitting

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="savedOffer">
            Choisir une offre enregistrée
          </FieldLabel>
          <Select value={selectedOfferId} onValueChange={handleOfferChange}>
            <SelectTrigger id="savedOffer" className="w-full">
              <SelectValue>{selectedOfferLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FREE_TEXT_VALUE}>Saisie libre</SelectItem>
              {offers === null && (
                <SelectItem value={LOADING_VALUE} disabled>
                  Chargement des offres...
                </SelectItem>
              )}
              {offers?.map((offer) => (
                <SelectItem key={offer.id} value={offer.id}>
                  {offer.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {offers !== null && offers.length === 0 && (
            <FieldDescription>
              Aucune offre enregistrée —{" "}
              <Link href="/dashboard/recruiter/offers">en créer une</Link>.
            </FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!form.formState.errors.jobDescription}>
          <FieldLabel htmlFor="jobDescription">Offre d&apos;emploi</FieldLabel>
          <Textarea
            id="jobDescription"
            rows={8}
            className={cn(
              "min-h-40",
              isOfferSelected && "cursor-default bg-muted/40"
            )}
            placeholder="Collez ici le texte de l'offre d'emploi..."
            aria-invalid={!!form.formState.errors.jobDescription}
            readOnly={isOfferSelected}
            {...form.register("jobDescription")}
          />
          <FieldError errors={[form.formState.errors.jobDescription]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.cvFiles}>
          <FieldLabel htmlFor="cvFiles">CV des candidats (PDF, 10 max)</FieldLabel>
          <label
            htmlFor="cvFiles"
            onDragOver={(event) => {
              event.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setIsDragging(false)
              if (event.dataTransfer.files.length) {
                addFiles(event.dataTransfer.files)
              }
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-input px-3 py-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
              isDragging && "border-primary bg-primary/5 text-foreground",
              cvFiles.length > 0 && "border-primary/50 text-foreground"
            )}
          >
            <Upload className="size-5 shrink-0" />
            <span>
              Glissez-déposez des CV ici, ou cliquez pour parcourir
            </span>
            <span className="text-xs text-muted-foreground">
              {cvFiles.length}/{MAX_FILES} fichier(s) sélectionné(s)
            </span>
          </label>
          <input
            id="cvFiles"
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="sr-only"
            disabled={isSubmitting}
            onChange={(event) => {
              if (event.target.files?.length) {
                addFiles(event.target.files)
              }
              event.target.value = ""
            }}
          />
          <FieldError errors={[form.formState.errors.cvFiles]} />

          {cvFiles.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {cvFiles.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-input px-2.5 py-2 text-sm"
                >
                  <FileText className="size-4 shrink-0 text-primary" />
                  <span className="flex-1 truncate">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={isSubmitting}
                    onClick={() => removeFile(index)}
                  >
                    <X />
                    <span className="sr-only">Retirer {file.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Field>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Analyse de {cvFiles.length} CV{cvFiles.length > 1 ? "s" : ""} en
              cours...
            </>
          ) : (
            "Comparer les candidats"
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
