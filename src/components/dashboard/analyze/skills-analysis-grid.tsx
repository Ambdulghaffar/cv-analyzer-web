import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SkillAnalysis, SkillStatus } from "@/types/analysis"

interface SkillsAnalysisGridProps {
  skills: SkillAnalysis[]
}

const statusConfig: Record<
  SkillStatus,
  {
    title: string
    icon: typeof CheckCircle2
    badgeClassName: string
  }
> = {
  found: {
    title: "Compétences trouvées",
    icon: CheckCircle2,
    badgeClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  partial: {
    title: "Partiellement présentes",
    icon: AlertCircle,
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  missing: {
    title: "Compétences manquantes",
    icon: XCircle,
    badgeClassName:
      "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
  },
}

const statusOrder: SkillStatus[] = ["found", "partial", "missing"]

export function SkillsAnalysisGrid({ skills }: SkillsAnalysisGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {statusOrder.map((status) => {
        const config = statusConfig[status]
        const Icon = config.icon
        const items = skills.filter((skill) => skill.status === status)

        return (
          <div key={status} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Icon className="size-4" />
              {config.title}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.length === 0 ? (
                <span className="text-sm text-muted-foreground">Aucune</span>
              ) : (
                items.map((skill) => (
                  <Badge
                    key={skill.skill}
                    variant="outline"
                    className={cn(
                      config.badgeClassName,
                      skill.weight === "required" && "border-2 font-semibold"
                    )}
                  >
                    {skill.skill}
                  </Badge>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
