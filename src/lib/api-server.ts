import { createClient } from "@/lib/supabase/server"
import type { AnalysisHistoryItem } from "@/types/analysis"

export async function getAnalysisHistoryServer(): Promise<AnalysisHistoryItem[]> {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return []

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze/history`,
    {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: "no-store",
    }
  )

  if (!response.ok) return []

  return response.json()
}
