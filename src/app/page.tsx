import Link from "next/link"
import { Zap, Target, Gift, Users, Upload, Sparkles, FileCheck2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/feature-card"
import { ProductMockup } from "@/components/product-mockup"

const values = [
  {
    icon: Zap,
    title: "Rapide",
    description: "Une analyse de votre CV en quelques secondes grâce à Groq.",
  },
  {
    icon: Target,
    title: "Précis",
    description: "Un scoring multi-critères pour évaluer chaque candidature en détail.",
  },
  {
    icon: Gift,
    title: "Gratuit pour commencer",
    description: "Testez toutes les fonctionnalités essentielles sans carte bancaire.",
  },
  {
    icon: Users,
    title: "Double mode",
    description: "Une expérience pensée pour les candidats comme pour les recruteurs.",
  },
]

const steps = [
  {
    icon: Upload,
    title: "Uploadez votre CV",
    description: "Déposez votre CV au format PDF ou Word en quelques clics.",
  },
  {
    icon: Sparkles,
    title: "L'IA analyse",
    description: "Notre moteur d'analyse compare votre profil à l'offre ciblée.",
  },
  {
    icon: FileCheck2,
    title: "Recevez vos résultats",
    description: "Obtenez votre score et des recommandations concrètes.",
  },
]

export default function Home() {
  return (
    <main className="flex-1">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Le matching CV/emploi, propulsé par l&apos;IA
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Analysez la compatibilité entre votre CV et une offre d&apos;emploi en quelques
            secondes, et obtenez des recommandations concrètes pour décrocher l&apos;entretien.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/register" />}>
              Commencer gratuitement
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#features" />}>
              Voir comment ça marche
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ProductMockup />
        </div>
      </section>

      <section id="features" className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <FeatureCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Comment ça marche</h2>
            <p className="mt-2 text-muted-foreground">Trois étapes simples pour analyser votre CV.</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <step.icon className="size-5" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Étape {index + 1}</span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="max-w-xs text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Prêt à optimiser votre candidature ?</h2>
          <p className="max-w-md text-muted-foreground">
            Créez votre compte gratuitement et obtenez votre premier score de compatibilité dès maintenant.
          </p>
          <Button size="lg" render={<Link href="/register" />}>
            Commencer gratuitement
          </Button>
        </div>
      </section>
    </main>
  )
}
