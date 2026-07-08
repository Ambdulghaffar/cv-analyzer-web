import { cn } from "@/lib/utils"

interface BrowserFrameProps {
  url?: string
  className?: string
  children: React.ReactNode
}

function BrowserFrame({ url = "cv-analyzer.ai/dashboard", className, children }: BrowserFrameProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-chart-4/60" />
          <span className="size-2.5 rounded-full bg-chart-1/60" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
          {url}
        </div>
      </div>

      <div className="p-6">{children}</div>
    </div>
  )
}

export { BrowserFrame }
