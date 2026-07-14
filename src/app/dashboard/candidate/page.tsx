import Link from "next/link"
import { FileSearch, History, Mail, Sparkles, Trophy } from "lucide-react"

import { QuickActionCard } from "@/components/dashboard/quick-action-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAnalysisHistoryServer } from "@/lib/api-server"
import { formatRelativeDate } from "@/lib/format"
import { getCurrentProfile } from "@/lib/supabase/queries"

export default async function CandidateDashboardPage() {
  const [profile, history] = await Promise.all([
    getCurrentProfile(),
    getAnalysisHistoryServer(),
  ])

  const hasAnalyses = history.length > 0
  const bestScore = hasAnalyses
    ? Math.max(...history.map((item) => item.global_score))
    : null
  const lastAnalysisDate = hasAnalyses
    ? history.reduce((latest, item) =>
        new Date(item.created_at) > new Date(latest.created_at) ? item : latest
      ).created_at
    : null

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Bienvenue, {profile?.full_name}</h1>
        <p className="text-muted-foreground">
          Analysez votre CV, suivez votre historique d&apos;analyses et générez
          des lettres de motivation personnalisées.
        </p>
      </div>

      {hasAnalyses ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={FileSearch}
            label="Analyses effectuées"
            value={String(history.length)}
          />
          <StatCard
            icon={Trophy}
            label="Meilleur score obtenu"
            value={bestScore !== null ? `${bestScore}%` : "—"}
          />
          <StatCard
            icon={History}
            label="Dernière analyse"
            value={lastAnalysisDate ? formatRelativeDate(lastAnalysisDate) : "Aucune"}
          />
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <Sparkles className="size-10 text-primary" />
            <h2 className="text-lg font-semibold">
              Prêt à booster votre candidature ?
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Analysez votre premier CV pour découvrir votre compatibilité avec
              une offre d&apos;emploi et obtenir des conseils personnalisés.
            </p>
            <Button render={<Link href="/dashboard/candidate/analyze" />}>
              Analyser mon premier CV
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <QuickActionCard
            href="/dashboard/candidate/analyze"
            icon={FileSearch}
            title="Analyser un CV"
            description="Comparez votre CV à une offre d'emploi"
          />
          <QuickActionCard
            href="/dashboard/candidate/letters"
            icon={Mail}
            title="Générer une lettre"
            description="Créez une lettre de motivation sur mesure"
          />
          <QuickActionCard
            href="/dashboard/candidate/history"
            icon={History}
            title="Voir mon historique"
            description="Retrouvez toutes vos analyses passées"
          />
        </div>
      </div>
    </div>
  )
}
