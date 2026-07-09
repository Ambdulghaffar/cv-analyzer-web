import { Briefcase } from "lucide-react"

export default function RecruiterOffersPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <Briefcase className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        La gestion de vos offres d&apos;emploi arrive prochainement.
      </p>
    </div>
  )
}
