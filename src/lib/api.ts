import { createClient } from "@/lib/supabase/client"
import type { AnalysisHistoryItem, AnalysisResult } from "@/types/analysis"
import type { LetterResult } from "@/types/letter"

async function authHeaders() {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { Authorization: `Bearer ${session?.access_token}` }
}

async function parseErrorMessage(response: Response) {
  const message = await response
    .json()
    .then((body) => (typeof body?.detail === "string" ? body.detail : undefined))
    .catch(() => undefined)

  return message
}

export async function analyzeCV(
  jobDescription: string,
  cvFile: File
): Promise<AnalysisResult> {
  const formData = new FormData()
  formData.append("job_description", jobDescription)
  formData.append("cv", cvFile)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ?? "Erreur lors de l'analyse du CV."
    )
  }

  return response.json()
}

export async function getAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze/history`,
    { headers: await authHeaders() }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la récupération de l'historique."
    )
  }

  return response.json()
}

export async function getAnalysisDetail(id: string): Promise<AnalysisResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/analyze/history/${id}`,
    { headers: await authHeaders() }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la récupération de l'analyse."
    )
  }

  return response.json()
}

export async function generateLetter(
  jobDescription: string,
  tone: string,
  language: string,
  cvFile: File
): Promise<LetterResult> {
  const formData = new FormData()
  formData.append("job_description", jobDescription)
  formData.append("tone", tone)
  formData.append("language", language)
  formData.append("cv", cvFile)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/generate-letter`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la génération de la lettre."
    )
  }

  return response.json()
}
