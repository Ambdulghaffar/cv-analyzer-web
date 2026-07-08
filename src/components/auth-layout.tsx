import Link from "next/link"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  panelHeadline: string
  panel: React.ReactNode
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
}: AuthLayoutProps) {
  return (
    <div className="flex w-full flex-1 flex-col lg:min-h-160 lg:flex-row">
      <div className="relative hidden overflow-hidden bg-linear-to-br from-blue-600 to-blue-900 text-white dark:from-blue-500 dark:to-blue-950 lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:gap-8 lg:px-16">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-blue-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative flex flex-col gap-3">
          <span className="text-lg font-semibold tracking-tight">CV Analyzer AI</span>
          <h2 className="text-3xl font-semibold leading-tight text-balance">{panelHeadline}</h2>
        </div>

        <div className="relative">{panel}</div>
      </div>

      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
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
  )
}

export { AuthLayout }
