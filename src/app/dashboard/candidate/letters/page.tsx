"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Document, Packer, Paragraph } from "docx"
import jsPDF from "jspdf"
import { Copy, Download, FileText, FileType, Loader2 } from "lucide-react"

import { CvFileField } from "@/components/dashboard/cv-file-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateLetter } from "@/lib/api"
import type { LetterResult } from "@/types/letter"

const toneOptions = [
  { value: "professionnel", label: "Professionnel" },
  { value: "enthousiaste", label: "Enthousiaste" },
  { value: "concis", label: "Concis" },
] as const

const languageOptions = [
  { value: "français", label: "Français" },
  { value: "english", label: "English" },
] as const

const letterSchema = z.object({
  jobDescription: z
    .string()
    .trim()
    .min(50, "L'offre d'emploi doit contenir au moins 50 caractères."),
  cvFile: z
    .instanceof(File, { message: "Merci de joindre votre CV." })
    .refine((file) => file.type === "application/pdf", {
      message: "Le fichier doit être un PDF.",
    }),
  tone: z.enum(["professionnel", "enthousiaste", "concis"]),
  language: z.enum(["français", "english"]),
})

type LetterValues = z.infer<typeof letterSchema>

export default function CandidateLettersPage() {
  const [letter, setLetter] = useState<LetterResult | null>(null)

  const form = useForm<LetterValues>({
    resolver: zodResolver(letterSchema),
    defaultValues: {
      jobDescription: "",
      tone: "professionnel",
      language: "français",
    },
  })

  const cvFile = form.watch("cvFile")

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await generateLetter(
        values.jobDescription,
        values.tone,
        values.language,
        values.cvFile
      )
      setLetter(result)
      toast.success("Lettre générée avec succès.")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue."
      )
    }
  })

  const handleCopy = async () => {
    if (!letter) return
    await navigator.clipboard.writeText(letter.content)
    toast.success("Lettre copiée dans le presse-papiers.")
  }

  const handleDownloadTxt = () => {
    if (!letter) return
    const blob = new Blob([letter.content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "lettre-de-motivation.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadPdf = () => {
    if (!letter) return

    const doc = new jsPDF({ unit: "pt", format: "a4" })
    const marginX = 56
    const marginY = 56
    const lineHeight = 16
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const maxWidth = pageWidth - marginX * 2

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)

    const lines = letter.content
      .split("\n")
      .flatMap((paragraph) =>
        paragraph.trim() === ""
          ? [""]
          : (doc.splitTextToSize(paragraph, maxWidth) as string[])
      )

    let y = marginY
    lines.forEach((line) => {
      if (y > pageHeight - marginY) {
        doc.addPage()
        y = marginY
      }
      doc.text(line, marginX, y)
      y += lineHeight
    })

    doc.save("lettre-de-motivation.pdf")
  }

  const handleDownloadWord = async () => {
    if (!letter) return

    const docxDocument = new Document({
      sections: [
        {
          children: letter.content
            .split("\n")
            .map((line) => new Paragraph({ text: line })),
        },
      ],
    })

    const blob = await Packer.toBlob(docxDocument)
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "lettre-de-motivation.docx"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Lettres de motivation</h1>
        <p className="text-muted-foreground">
          Générez une lettre de motivation personnalisée à partir de votre CV
          et d&apos;une offre d&apos;emploi.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouvelle lettre</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
              <Field data-invalid={!!form.formState.errors.jobDescription}>
                <FieldLabel htmlFor="jobDescription">
                  Offre d&apos;emploi
                </FieldLabel>
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

              <div className="grid gap-5 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Ton de la lettre</FieldLabel>
                  <Controller
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-row flex-wrap gap-4"
                      >
                        {toneOptions.map((option) => (
                          <label
                            key={option.value}
                            htmlFor={`tone-${option.value}`}
                            className="flex items-center gap-2 text-sm font-normal"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={`tone-${option.value}`}
                            />
                            {option.label}
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="language">
                    Langue de la lettre
                  </FieldLabel>
                  <Controller
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="language" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  "Générer ma lettre"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {letter && (
        <Card className="max-w-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <CardHeader>
            <CardTitle>Votre lettre de motivation</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {letter.content}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="size-4" />
                Copier
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                <Download className="size-4" />
                Télécharger en .txt
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPdf}>
                <FileText className="size-4" />
                Télécharger en PDF
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadWord}>
                <FileType className="size-4" />
                Télécharger en Word
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
