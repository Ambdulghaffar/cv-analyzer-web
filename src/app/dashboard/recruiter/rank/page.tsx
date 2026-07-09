import { Users } from "lucide-react"

export default function RecruiterRankPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <Users className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Le classement automatique des candidats arrive prochainement.
      </p>
    </div>
  )
}
