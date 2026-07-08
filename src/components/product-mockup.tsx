import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrowserFrame } from "@/components/browser-frame"
import { CircularScore } from "@/components/circular-score"

const skills = [
  { label: "React", match: true },
  { label: "Python", match: true },
  { label: "SQL", match: false },
]

function ProductMockup() {
  return (
    <BrowserFrame className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Score de compatibilité</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <CircularScore score={82} />

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
    </BrowserFrame>
  )
}

export { ProductMockup }
