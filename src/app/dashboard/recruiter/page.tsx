import { getCurrentProfile } from "@/lib/supabase/queries"

export default async function RecruiterDashboardPage() {
  const profile = await getCurrentProfile()

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h1 className="text-2xl font-semibold">Bienvenue, {profile?.full_name}</h1>
      <p className="text-muted-foreground">
        Classez les CV reçus, gérez vos offres d&apos;emploi et consultez
        l&apos;historique de vos analyses.
      </p>
    </div>
  )
}
