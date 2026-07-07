import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skills = [
  { label: "React", match: true },
  { label: "Python", match: true },
  { label: "SQL", match: false },
]

const score = 82
const radius = 40
const circumference = 2 * Math.PI * radius
const offset = circumference - (score / 100) * circumference

function ProductMockup() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-chart-4/60" />
          <span className="size-2.5 rounded-full bg-chart-1/60" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
          cv-analyzer.ai/dashboard
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Score de compatibilité</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="relative flex size-28 items-center justify-center">
              <svg className="size-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <span className="absolute text-2xl font-semibold">{score}%</span>
            </div>

            <div className="flex w-full flex-wrap justify-center gap-2">
              {skills.map(({ label, match }) => (
                <Badge key={label} variant={match ? "default" : "outline"}>
                  {label}
                </Badge>
              ))}
            </div>

            <div className="w-full space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyse en cours</span>
                <span>68%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { ProductMockup }
