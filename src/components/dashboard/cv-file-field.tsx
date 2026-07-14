"use client"

import { FileText, Upload } from "lucide-react"

import { FieldError } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface CvFileFieldProps {
  id: string
  file: File | undefined
  error?: { message?: string }
  onFileChange: (file: File) => void
}

export function CvFileField({ id, file, error, onFileChange }: CvFileFieldProps) {
  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-input px-3 py-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
          file && "border-primary/50 text-foreground"
        )}
      >
        {file ? (
          <FileText className="size-4 shrink-0 text-primary" />
        ) : (
          <Upload className="size-4 shrink-0" />
        )}
        <span className="truncate">
          {file ? file.name : "Sélectionnez votre CV au format PDF"}
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,application/pdf"
        className="sr-only"
        onChange={(event) => {
          const selected = event.target.files?.[0]
          if (selected) onFileChange(selected)
        }}
      />
      <FieldError errors={[error]} />
    </>
  )
}
