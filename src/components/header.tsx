"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { authRoutes } from "@/lib/routes"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
]

function Header() {
  const pathname = usePathname()
  const isAuthRoute = authRoutes.includes(pathname)

  if (isAuthRoute) {
    return (
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="-ml-2.5" render={<Link href="/" />}>
            <ArrowLeft />
            Retour à l&apos;accueil
          </Button>
          <ThemeToggle />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          CV Analyzer AI
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === href && "font-semibold text-primary hover:text-primary"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            className="hover:border-primary hover:text-primary"
            render={<Link href="/login" />}
          >
            Connexion
          </Button>
          <Button render={<Link href="/register" />}>Inscription</Button>
        </div>
      </div>
    </header>
  )
}

export { Header }
