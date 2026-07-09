import { Mail } from "lucide-react"

export default function CandidateLettersPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <Mail className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        La génération de lettres de motivation personnalisées arrive
        prochainement.
      </p>
    </div>
  )
}
