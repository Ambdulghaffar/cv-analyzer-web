import { FileSearch } from "lucide-react"

export default function AnalyzeCvPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <FileSearch className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        L&apos;analyse de CV par IA arrive prochainement sur cet espace.
      </p>
    </div>
  )
}
