import { Progress } from "@/components/ui/progress"
import type { ScoreBreakdown } from "@/types/analysis"

const breakdownLabels: Record<keyof ScoreBreakdown, string> = {
  skills_required: "Compétences requises",
  skills_preferred: "Compétences souhaitées",
  experience: "Expérience",
  education: "Formation",
  presentation: "Présentation",
}

interface ScoreBreakdownListProps {
  breakdown: ScoreBreakdown
}

export function ScoreBreakdownList({ breakdown }: ScoreBreakdownListProps) {
  const keys = Object.keys(breakdownLabels) as Array<keyof ScoreBreakdown>

  return (
    <div className="flex flex-col gap-4">
      {keys.map((key) => (
        <div key={key} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{breakdownLabels[key]}</span>
            <span className="text-muted-foreground">{breakdown[key]}%</span>
          </div>
          <Progress value={breakdown[key]} />
        </div>
      ))}
    </div>
  )
}
