import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"
import { getCurrentProfile } from "@/lib/supabase/queries"
import { ROUTES } from "@/lib/constants"
import { LogoutButton } from "@/components/logout-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Profile } from "@/types"

export default async function RecruiterDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(ROUTES.login)
  }

  const profile: Profile | null = await getCurrentProfile()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard Recruteur</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="text-muted-foreground">Nom complet : </span>
              {profile?.full_name}
            </p>
            <p>
              <span className="text-muted-foreground">Email : </span>
              {user.email}
            </p>
            <p>
              <span className="text-muted-foreground">Rôle : </span>
              {profile?.role}
            </p>
          </div>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  )
}
