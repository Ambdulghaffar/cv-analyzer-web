import Link from "next/link"
import { Briefcase, History, Sparkles, Trophy, Users } from "lucide-react"

import { QuickActionCard } from "@/components/dashboard/quick-action-card"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getRankingHistoryServer, listOffersServer } from "@/lib/api-server"
import { formatRelativeDate } from "@/lib/format"
import { getCurrentProfile } from "@/lib/supabase/queries"

export default async function RecruiterDashboardPage() {
  const [profile, rankingHistory, offers] = await Promise.all([
    getCurrentProfile(),
    getRankingHistoryServer(),
    listOffersServer(),
  ])

  const hasActivity = rankingHistory.length > 0 || offers.length > 0
  const lastRankingDate = rankingHistory.length
    ? rankingHistory.reduce((latest, item) =>
        new Date(item.created_at) > new Date(latest.created_at) ? item : latest
      ).created_at
    : null

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Bienvenue, {profile?.full_name}</h1>
        <p className="text-muted-foreground">
          Classez les CV reçus, gérez vos offres d&apos;emploi et consultez
          l&apos;historique de vos analyses.
        </p>
      </div>

      {hasActivity ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={Trophy}
            label="Classements effectués"
            value={String(rankingHistory.length)}
          />
          <StatCard
            icon={Briefcase}
            label="Offres enregistrées"
            value={String(offers.length)}
          />
          <StatCard
            icon={History}
            label="Dernier classement"
            value={lastRankingDate ? formatRelativeDate(lastRankingDate) : "Aucun"}
          />
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <Sparkles className="size-10 text-primary" />
            <h2 className="text-lg font-semibold">
              Prêt à trouver vos meilleurs candidats ?
            </h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              Créez votre première offre d&apos;emploi ou lancez votre première
              comparaison de CV pour commencer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button render={<Link href="/dashboard/recruiter/rank" />}>
                Comparer des candidats
              </Button>
              <Button
                variant="outline"
                render={<Link href="/dashboard/recruiter/offers" />}
              >
                Créer une offre
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Actions rapides</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <QuickActionCard
            href="/dashboard/recruiter/rank"
            icon={Users}
            title="Comparer des candidats"
            description="Classez vos CV selon une offre d'emploi"
          />
          <QuickActionCard
            href="/dashboard/recruiter/offers"
            icon={Briefcase}
            title="Gérer mes offres"
            description="Créez et administrez vos offres d'emploi"
          />
          <QuickActionCard
            href="/dashboard/recruiter/history"
            icon={History}
            title="Voir l'historique"
            description="Retrouvez tous vos classements passés"
          />
        </div>
      </div>
    </div>
  )
}
