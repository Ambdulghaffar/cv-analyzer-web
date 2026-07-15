"use client"

import { useState } from "react"

import { CandidateRankCard } from "@/components/dashboard/rank/candidate-rank-card"
import { RankForm } from "@/components/dashboard/rank/rank-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RankingResult } from "@/types/analysis"

export default function RecruiterRankPage() {
  const [result, setResult] = useState<RankingResult | null>(null)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Comparer des candidats</h1>
        <p className="text-muted-foreground">
          Collez une offre d&apos;emploi et importez jusqu&apos;à 10 CV pour
          classer automatiquement les candidats selon leur correspondance.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouvelle comparaison</CardTitle>
        </CardHeader>
        <CardContent>
          <RankForm onResult={setResult} />
        </CardContent>
      </Card>

      {result && (
        <div className="flex flex-col gap-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">
              {result.job_title
                ? `Classement pour "${result.job_title}"`
                : "Classement des candidats"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {result.candidates.length} candidat
              {result.candidates.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {result.candidates.map((candidate, index) => (
              <CandidateRankCard
                key={candidate.filename}
                candidate={candidate}
                rank={index + 1}
                isTopRank={index === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
