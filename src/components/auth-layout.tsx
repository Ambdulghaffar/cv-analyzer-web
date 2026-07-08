import Link from "next/link"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { MinimalFooter } from "@/components/minimal-footer"
import { cn } from "@/lib/utils"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  panelHeadline: string
  panel: React.ReactNode
  /** Allow natural page scroll instead of forcing everything into one viewport. */
  scrollable?: boolean
}

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
  panelHeadline,
  panel,
  scrollable = false,
}: AuthLayoutProps) {
  return (
    <div className={cn("flex min-h-screen flex-col", !scrollable && "lg:h-screen")}>
      <div className={cn("flex flex-1 flex-col lg:flex-row", !scrollable && "lg:min-h-0")}>
        <div
          className={cn(
            "relative hidden overflow-hidden bg-linear-to-br from-blue-600 to-blue-900 text-white dark:from-blue-500 dark:to-blue-950 lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:gap-6 lg:px-16",
            scrollable && "lg:sticky lg:top-0 lg:h-screen lg:self-start"
          )}
        >
          <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-blue-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative flex flex-col gap-3">
            <span className="text-lg font-semibold tracking-tight">CV Analyzer AI</span>
            <h2 className="text-3xl font-semibold leading-tight text-balance">{panelHeadline}</h2>
          </div>

          <div className="relative">{panel}</div>
        </div>

        <div
          className={cn(
            "flex flex-col items-center px-4 sm:px-6 lg:w-1/2 lg:px-12",
            scrollable ? "py-8 lg:py-12" : "justify-center py-8"
          )}
        >
          <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-4">
            <Logo size="lg" />

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
              </CardHeader>
              <CardContent>{children}</CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <MinimalFooter />
    </div>
  )
}

export { AuthLayout }
