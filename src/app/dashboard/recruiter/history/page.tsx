import { History } from "lucide-react"

export default function RecruiterHistoryPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <History className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        L&apos;historique de vos classements et analyses sera bientôt
        accessible ici.
      </p>
    </div>
  )
}
