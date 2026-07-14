import { CircularScore } from "@/components/circular-score"
import { getScoreTier, scoreIndicatorClassNames } from "@/lib/score"

interface ScoreGaugeProps {
  score: number
  className?: string
}

export function ScoreGauge({ score, className }: ScoreGaugeProps) {
  return (
    <CircularScore
      score={score}
      className={className}
      indicatorClassName={scoreIndicatorClassNames[getScoreTier(score)]}
    />
  )
}
