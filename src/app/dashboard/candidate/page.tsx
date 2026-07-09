import { getCurrentProfile } from "@/lib/supabase/queries"

export default async function CandidateDashboardPage() {
  const profile = await getCurrentProfile()

  return (
    <div className="flex flex-1 flex-col gap-2">
      <h1 className="text-2xl font-semibold">Bienvenue, {profile?.full_name}</h1>
      <p className="text-muted-foreground">
        Analysez votre CV, suivez votre historique d&apos;analyses et générez
        des lettres de motivation personnalisées.
      </p>
    </div>
  )
}
