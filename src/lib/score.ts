export type ScoreTier = "high" | "mid" | "low"

export function getScoreTier(score: number): ScoreTier {
  if (score >= 75) return "high"
  if (score >= 50) return "mid"
  return "low"
}

export const scoreIndicatorClassNames: Record<ScoreTier, string> = {
  high: "stroke-emerald-500 dark:stroke-emerald-400",
  mid: "stroke-amber-500 dark:stroke-amber-400",
  low: "stroke-red-500 dark:stroke-red-400",
}

export const scoreBadgeClassNames: Record<ScoreTier, string> = {
  high: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  mid: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  low: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
}
