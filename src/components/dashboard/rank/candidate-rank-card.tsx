"use client"

import { CheckCircle2, Crown, FileText, XCircle } from "lucide-react"

import { ScoreBreakdownList } from "@/components/dashboard/analyze/score-breakdown-list"
import { ScoreGauge } from "@/components/dashboard/analyze/score-gauge"
import { SkillsAnalysisGrid } from "@/components/dashboard/analyze/skills-analysis-grid"
import { StrengthsAndImprovements } from "@/components/dashboard/analyze/strengths-and-improvements"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { getScoreTier, scoreBadgeClassNames } from "@/lib/score"
import type { CandidateRanking } from "@/types/analysis"

interface CandidateRankCardProps {
  candidate: CandidateRanking
  rank: number
  isTopRank?: boolean
}

export function CandidateRankCard({
  candidate,
  rank,
  isTopRank = false,
}: CandidateRankCardProps) {
  const { filename, analysis } = candidate
  const requiredSkills = analysis.skills_analysis
    .filter((skill) => skill.weight === "required")
    .slice(0, 3)

  return (
    <Card
      className={cn(
        "gap-4",
        isTopRank && "ring-2 ring-amber-400 dark:ring-amber-500/70"
      )}
    >
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold",
                isTopRank && "bg-amber-400/20 text-amber-700 dark:text-amber-400"
              )}
            >
              #{rank}
            </div>
            <div className="flex flex-col gap-0.5">
              {isTopRank && (
                <Badge className="w-fit gap-1 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400" variant="outline">
                  <Crown className="size-3" />
                  Meilleur candidat
                </Badge>
              )}
              <div className="flex items-center gap-1.5 text-sm font-medium">
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{filename}</span>
              </div>
            </div>
          </div>

          <span
            className={cn(
              "shrink-0 rounded-lg border px-2 py-1 text-lg font-semibold",
              scoreBadgeClassNames[getScoreTier(analysis.global_score)]
            )}
          >
            {analysis.global_score}%
          </span>
        </div>

        {requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {requiredSkills.map((skill) => (
              <Badge
                key={skill.skill}
                variant="outline"
                className={cn(
                  "gap-1",
                  skill.status === "missing"
                    ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                )}
              >
                {skill.status === "missing" ? (
                  <XCircle className="size-3" />
                ) : (
                  <CheckCircle2 className="size-3" />
                )}
                {skill.skill}
              </Badge>
            ))}
          </div>
        )}

        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="w-full" />}>
            Voir le détail
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="size-4 shrink-0" />
                {filename}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center gap-6 lg:col-span-1">
                <ScoreGauge score={analysis.global_score} />
                <ScoreBreakdownList breakdown={analysis.breakdown} />
              </div>

              <div className="flex flex-col gap-6 lg:col-span-2">
                <SkillsAnalysisGrid skills={analysis.skills_analysis} />
              </div>

              <div className="lg:col-span-3">
                <StrengthsAndImprovements
                  strengths={analysis.strengths}
                  improvements={analysis.improvements}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
