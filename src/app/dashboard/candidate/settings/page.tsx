import { Settings } from "lucide-react"

export default function CandidateSettingsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <Settings className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        La gestion des paramètres de votre compte arrive prochainement.
      </p>
    </div>
  )
}
