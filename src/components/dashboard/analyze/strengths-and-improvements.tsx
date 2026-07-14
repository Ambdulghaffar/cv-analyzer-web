import { Lightbulb, ThumbsUp } from "lucide-react"

interface StrengthsAndImprovementsProps {
  strengths: string[]
  improvements: string[]
}

export function StrengthsAndImprovements({
  strengths,
  improvements,
}: StrengthsAndImprovementsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <ThumbsUp className="size-4 text-emerald-500 dark:text-emerald-400" />
          Points forts
        </div>
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {strengths.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-current" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="size-4 text-amber-500 dark:text-amber-400" />
          Pistes d&apos;amélioration
        </div>
        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          {improvements.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-current" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
