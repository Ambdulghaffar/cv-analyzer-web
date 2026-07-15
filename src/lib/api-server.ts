import { createClient } from "@/lib/supabase/server"
import type { AnalysisHistoryItem, RankingHistoryItem } from "@/types/analysis"
import type { JobOffer } from "@/types/offer"

async function serverAuthHeaders() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
    ? { Authorization: `Bearer ${session.access_token}` }
    : null
}

export async function getAnalysisHistoryServer(): Promise<AnalysisHistoryItem[]> {
  const headers = await serverAuthHeaders()
  if (!headers) return []

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze/history`,
    { headers, cache: "no-store" }
  )

  if (!response.ok) return []

  return response.json()
}

export async function getRankingHistoryServer(): Promise<RankingHistoryItem[]> {
  const headers = await serverAuthHeaders()
  if (!headers) return []

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rank/history`,
    { headers, cache: "no-store" }
  )

  if (!response.ok) return []

  return response.json()
}

export async function listOffersServer(): Promise<JobOffer[]> {
  const headers = await serverAuthHeaders()
  if (!headers) return []

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`, {
    headers,
    cache: "no-store",
  })

  if (!response.ok) return []

  return response.json()
}
