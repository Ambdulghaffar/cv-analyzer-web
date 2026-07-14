import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface QuickActionCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
}

export function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
}: QuickActionCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full transition-colors hover:bg-muted/50">
        <CardContent className="flex h-full items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div className="flex flex-1 flex-col">
            <span className="font-medium">{title}</span>
            <span className="text-sm text-muted-foreground">
              {description}
            </span>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
