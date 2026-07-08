import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  as?: "h1" | "h2"
  size?: "default" | "lg"
  className?: string
  subtitleClassName?: string
}

const titleSizes = {
  default: "text-3xl",
  lg: "text-4xl sm:text-5xl",
}

function SectionHeading({
  title,
  subtitle,
  as: Heading = "h2",
  size = "default",
  className,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)}>
      <Heading className={cn("font-semibold tracking-tight", titleSizes[size])}>{title}</Heading>
      {subtitle && (
        <p className={cn("mt-2 text-muted-foreground", subtitleClassName)}>{subtitle}</p>
      )}
    </div>
  )
}

export { SectionHeading }
