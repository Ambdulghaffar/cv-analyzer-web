import { ScoreBreakdownList } from "@/components/dashboard/analyze/score-breakdown-list"
import { ScoreGauge } from "@/components/dashboard/analyze/score-gauge"
import { SkillsAnalysisGrid } from "@/components/dashboard/analyze/skills-analysis-grid"
import { StrengthsAndImprovements } from "@/components/dashboard/analyze/strengths-and-improvements"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AnalysisResult } from "@/types/analysis"

interface AnalysisResultViewProps {
  result: AnalysisResult
  className?: string
}

export function AnalysisResultView({ result, className }: AnalysisResultViewProps) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-3", className)}>
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Score global</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <ScoreGauge score={result.global_score} />
          <ScoreBreakdownList breakdown={result.breakdown} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Analyse des compétences</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillsAnalysisGrid skills={result.skills_analysis} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Points forts &amp; axes d&apos;amélioration</CardTitle>
        </CardHeader>
        <CardContent>
          <StrengthsAndImprovements
            strengths={result.strengths}
            improvements={result.improvements}
          />
        </CardContent>
      </Card>
    </div>
  )
}
