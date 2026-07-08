import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ambdulghaffar",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ambdulghaffar-ahamadi-7a476839a/",
    icon: LinkedinIcon,
  },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 py-6 text-center sm:px-6 lg:grid-cols-3 lg:px-8 lg:text-left">
        <div className="flex flex-col items-center gap-1 lg:items-start">
          <span className="text-sm font-semibold tracking-tight">CV Analyzer AI</span>
          <p className="max-w-xs text-xs text-muted-foreground">
            Analysez et améliorez votre CV en quelques secondes grâce à l&apos;intelligence artificielle.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-xs text-muted-foreground">
            {/* Portfolio URL à ajouter une fois déployé: <Link href="https://TODO-portfolio-url">Ambdulghaffar Ahamadi</Link> */}
            Créé par Ambdulghaffar Ahamadi
          </p>
          <p className="text-xs text-muted-foreground">© {year} CV Analyzer AI. Tous droits réservés.</p>
        </div>

        <div className="flex items-center justify-center gap-4 lg:justify-end">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export { Footer }
