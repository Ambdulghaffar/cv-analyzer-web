import { NextResponse, type NextRequest } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { ROUTES } from "@/lib/constants"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${ROUTES.dashboard.candidate}`)
    }
  }

  return NextResponse.redirect(`${origin}${ROUTES.login}?error=auth_callback_failed`)
}
