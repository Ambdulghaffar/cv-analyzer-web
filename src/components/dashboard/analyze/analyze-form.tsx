"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { CvFileField } from "@/components/dashboard/cv-file-field"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { analyzeCV } from "@/lib/api"
import type { AnalysisResult } from "@/types/analysis"

const analyzeSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(50, "L'offre d'emploi doit contenir au moins 50 caractères."),
  cvFile: z
    .instanceof(File, { message: "Merci de joindre votre CV." })
    .refine((file) => file.type === "application/pdf", {
      message: "Le fichier doit être un PDF.",
    }),
})

type AnalyzeValues = z.infer<typeof analyzeSchema>

interface AnalyzeFormProps {
  onResult: (result: AnalysisResult) => void
}

export function AnalyzeForm({ onResult }: AnalyzeFormProps) {
  const form = useForm<AnalyzeValues>({
    resolver: zodResolver(analyzeSchema),
    defaultValues: { jobDescription: "" },
  })

  const cvFile = form.watch("cvFile")

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await analyzeCV(values.jobDescription, values.cvFile)
      onResult(result)
      toast.success("Analyse terminée avec succès.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue."
      )
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.jobDescription}>
          <FieldLabel htmlFor="jobDescription">Offre d&apos;emploi</FieldLabel>
          <Textarea
            id="jobDescription"
            rows={8}
            className="min-h-40"
            placeholder="Collez ici le texte de l'offre d'emploi..."
            aria-invalid={!!form.formState.errors.jobDescription}
            {...form.register("jobDescription")}
          />
          <FieldError errors={[form.formState.errors.jobDescription]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.cvFile}>
          <FieldLabel htmlFor="cvFile">CV (PDF)</FieldLabel>
          <CvFileField
            id="cvFile"
            file={cvFile}
            error={form.formState.errors.cvFile}
            onFileChange={(file) =>
              form.setValue("cvFile", file, { shouldValidate: true })
            }
          />
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Analyse en cours...
            </>
          ) : (
            "Analyser mon CV"
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
