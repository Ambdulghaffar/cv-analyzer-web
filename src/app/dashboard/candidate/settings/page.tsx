import { redirect } from "next/navigation"

import { AccountSettingsForm } from "@/components/dashboard/settings/account-settings-form"
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

  return <AccountSettingsForm profile={profile} email={user?.email ?? ""} />
}
