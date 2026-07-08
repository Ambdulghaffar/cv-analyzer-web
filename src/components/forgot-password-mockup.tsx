import { Card, CardContent } from "@/components/ui/card"
import { BrowserFrame } from "@/components/browser-frame"
import { MailCheck } from "lucide-react"

function ForgotPasswordMockup() {
  return (
    <BrowserFrame url="mail.cv-analyzer.ai/inbox" className="max-w-lg">
      <Card>
        <CardContent className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="size-5" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium">Lien envoyé</span>
              <span className="text-xs text-muted-foreground">Il y a 2 minutes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Cliquez sur le lien reçu par email pour choisir un nouveau mot de passe.
            </p>
          </div>
        </CardContent>
      </Card>
    </BrowserFrame>
  )
}

export { ForgotPasswordMockup }
