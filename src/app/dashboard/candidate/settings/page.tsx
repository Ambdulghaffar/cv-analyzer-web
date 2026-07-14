import Link from "next/link"
import { redirect } from "next/navigation"

import { DeleteAccountSection } from "@/components/dashboard/settings/delete-account-section"
import { SettingsForm } from "@/components/dashboard/settings/settings-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import { getCurrentProfile } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/server"

export default async function CandidateSettingsPage() {
  const profile = await getCurrentProfile()

  if (!profile) {
    redirect(ROUTES.login)
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez les informations de votre compte.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm profile={profile} email={user?.email ?? ""} />
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Mot de passe</CardTitle>
          <CardDescription>
            Vous recevrez un lien de réinitialisation par email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            render={<Link href={ROUTES.forgotPassword} />}
          >
            Changer mon mot de passe
          </Button>
        </CardContent>
      </Card>

      <Card className="max-w-2xl ring-destructive/30 dark:ring-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Zone dangereuse</CardTitle>
          <CardDescription>
            Ces actions sont irréversibles, procédez avec prudence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountSection />
        </CardContent>
      </Card>
    </div>
  )
}
