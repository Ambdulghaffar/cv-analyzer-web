import { createClient } from "@/lib/supabase/client"
import type {
  AnalysisHistoryItem,
  AnalysisResult,
  RankingHistoryItem,
  RankingResult,
} from "@/types/analysis"
import type { LetterResult } from "@/types/letter"
import type { JobOffer } from "@/types/offer"

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

export async function rankCandidates(
  jobDescription: string,
  cvFiles: File[]
): Promise<RankingResult> {
  const formData = new FormData()
  formData.append("job_description", jobDescription)
  cvFiles.forEach((file) => formData.append("cvs", file))

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rank`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors du classement des candidats."
    )
  }

  return response.json()
}

export async function createOffer(
  title: string,
  description: string
): Promise<JobOffer> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`, {
    method: "POST",
    headers: {
      ...(await authHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  })

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la création de l'offre."
    )
  }

  return response.json()
}

export async function listOffers(): Promise<JobOffer[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/offers`, {
    headers: await authHeaders(),
  })

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la récupération des offres."
    )
  }

  return response.json()
}

export async function getOffer(id: string): Promise<JobOffer> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`,
    { headers: await authHeaders() }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la récupération de l'offre."
    )
  }

  return response.json()
}

export async function updateOffer(
  id: string,
  data: { title?: string; description?: string }
): Promise<JobOffer> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`,
    {
      method: "PATCH",
      headers: {
        ...(await authHeaders()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la mise à jour de l'offre."
    )
  }

  return response.json()
}

export async function deleteOffer(id: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/offers/${id}`,
    {
      method: "DELETE",
      headers: await authHeaders(),
    }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la suppression de l'offre."
    )
  }
}

export async function getRankingHistory(): Promise<RankingHistoryItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rank/history`,
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

export async function getRankingDetail(id: string): Promise<RankingResult> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rank/history/${id}`,
    { headers: await authHeaders() }
  )

  if (!response.ok) {
    throw new Error(
      (await parseErrorMessage(response)) ??
        "Erreur lors de la récupération du classement."
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
