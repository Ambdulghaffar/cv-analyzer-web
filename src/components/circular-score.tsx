import { cn } from "@/lib/utils"

interface CircularScoreProps {
  score: number
  className?: string
  indicatorClassName?: string
}

const radius = 40
const circumference = 2 * Math.PI * radius

function CircularScore({ score, className, indicatorClassName }: CircularScoreProps) {
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={cn("relative flex size-28 items-center justify-center", className)}>
      <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" className="stroke-muted" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          className={cn("stroke-primary transition-[stroke-dashoffset]", indicatorClassName)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-2xl font-semibold">{score}%</span>
    </div>
  )
}

export { CircularScore }
