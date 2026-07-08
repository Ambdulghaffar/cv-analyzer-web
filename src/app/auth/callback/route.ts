import { NextResponse, type NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { ROUTES } from "@/lib/constants"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, role_selected")
        .eq("id", data.user.id)
        .single()

      if (!profile?.role_selected) {
        return NextResponse.redirect(`${origin}${ROUTES.onboardingRole}`)
      }

      return NextResponse.redirect(
        `${origin}${profile.role === "recruiter" ? ROUTES.dashboard.recruiter : ROUTES.dashboard.candidate}`
      )
    }
  }

  return NextResponse.redirect(`${origin}${ROUTES.login}?error=auth_callback_failed`)
}
