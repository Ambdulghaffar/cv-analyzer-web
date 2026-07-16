import { NextResponse, type NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { ROUTES } from "@/lib/constants"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
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
        return NextResponse.redirect(`${SITE_URL}${ROUTES.onboardingRole}`)
      }

      return NextResponse.redirect(
        `${SITE_URL}${profile.role === "recruiter" ? ROUTES.dashboard.recruiter : ROUTES.dashboard.candidate}`
      )
    }
  }

  return NextResponse.redirect(`${SITE_URL}${ROUTES.login}?error=auth_callback_failed`)
}