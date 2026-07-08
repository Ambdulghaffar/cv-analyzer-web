import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BrowserFrame } from "@/components/browser-frame"
import { CheckCircle2, Circle } from "lucide-react"

const steps = [
  { label: "Créer votre profil", done: true },
  { label: "Importer votre premier CV", done: true },
  { label: "Cibler une offre d'emploi", done: false },
]

function RegisterMockup() {
  return (
    <BrowserFrame url="cv-analyzer.ai/onboarding" className="max-w-lg">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 space-y-0">
          <Avatar size="lg">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <CardTitle>Jane Doe</CardTitle>
            <Badge variant="secondary" className="w-fit">
              Candidat
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">Premières étapes</p>
          <ul className="flex flex-col gap-2.5">
            {steps.map(({ label, done }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                {done ? (
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className={done ? "text-muted-foreground line-through" : ""}>{label}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </BrowserFrame>
  )
}

export { RegisterMockup }
