import Link from "next/link"
import { ScanSearch } from "lucide-react"

import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { box: "size-7", icon: "size-4", text: "text-base" },
  md: { box: "size-8", icon: "size-4", text: "text-lg" },
  lg: { box: "size-9", icon: "size-5", text: "text-xl" },
}

function Logo({ size = "md", showText = true, className }: LogoProps) {
  const { box, icon, text } = sizes[size]

  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg bg-primary text-white",
          box
        )}
      >
        <ScanSearch className={icon} />
      </span>
      {showText && (
        <span className={cn("font-bold tracking-tight text-foreground", text)}>
          CV Analyzer AI
        </span>
      )}
    </Link>
  )
}

export { Logo }
