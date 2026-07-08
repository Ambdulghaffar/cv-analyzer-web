import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrowserFrame } from "@/components/browser-frame"
import { CircularScore } from "@/components/circular-score"
import { CheckCircle2 } from "lucide-react"

const validatedSkills = ["React", "TypeScript", "Node.js"]

function LoginMockup() {
  return (
    <BrowserFrame url="cv-analyzer.ai/results" className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Dernière analyse</CardTitle>
          <CardDescription>Développeur Frontend Senior</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <CircularScore score={94} />

          <div className="flex w-full flex-wrap justify-center gap-2">
            {validatedSkills.map((skill) => (
              <Badge
                key={skill}
                className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 className="size-3" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </BrowserFrame>
  )
}

export { LoginMockup }
