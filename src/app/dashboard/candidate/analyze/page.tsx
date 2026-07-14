"use client"

import { useState } from "react"

import { AnalysisResultView } from "@/components/dashboard/analyze/analysis-result-view"
import { AnalyzeForm } from "@/components/dashboard/analyze/analyze-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnalysisResult } from "@/types/analysis"

export default function AnalyzeCvPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null)

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Analyser mon CV</h1>
        <p className="text-muted-foreground">
          Collez une offre d&apos;emploi et importez votre CV pour obtenir une
          analyse détaillée de votre correspondance.
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Nouvelle analyse</CardTitle>
        </CardHeader>
        <CardContent>
          <AnalyzeForm onResult={setResult} />
        </CardContent>
      </Card>

      {result && (
        <AnalysisResultView
          result={result}
          className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
        />
      )}
    </div>
  )
}
