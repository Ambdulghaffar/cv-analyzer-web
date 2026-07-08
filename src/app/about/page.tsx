import Link from "next/link"
import { BrainCircuit, ExternalLink, Gift, RefreshCw, ShieldCheck, SlidersHorizontal, Users2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FeatureCard } from "@/components/feature-card"
import { SectionHeading } from "@/components/section-heading"
import { GithubIcon } from "@/components/brand-icons"

const howItWorks = [
  {
    icon: BrainCircuit,
    title: "Analyse par IA",
    description: "Propulsé par Llama 3.3 70B via Groq, pour une analyse rapide et pertinente.",
  },
  {
    icon: SlidersHorizontal,
    title: "Scoring multi-critères",
    description: "Compétences, expérience, formation et soft skills, pondérés intelligemment.",
  },
  {
    icon: Users2,
    title: "Deux modes",
    description: "Candidat pour améliorer son CV, Recruteur pour comparer et classer plusieurs profils.",
  },
]

const commitments = [
  {
    icon: Gift,
    title: "Gratuit pour commencer",
    description: "Analysez votre premier CV sans carte bancaire.",
  },
  {
    icon: ShieldCheck,
    title: "Vos données vous appartiennent",
    description: "Aucune revente de données à des tiers.",
  },
  {
    icon: RefreshCw,
    title: "Amélioration continue",
    description: "Le produit évolue régulièrement avec de nouvelles fonctionnalités.",
  },
]

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          size="lg"
          title="Pourquoi j'ai créé CV Analyzer AI"
          subtitle="Un projet né d'une frustration simple : savoir si son CV correspond vraiment à une offre ne devrait pas être un mystère."
          subtitleClassName="mx-auto max-w-2xl text-lg"
        />
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground">
            Trouver un emploi est déjà difficile. Savoir si son CV est aligné avec une offre précise
            l&apos;est encore plus — la plupart des candidats envoient leur CV sans vraiment savoir ce
            qui manque ou ce qui les distingue. Du côté des recruteurs, trier des dizaines de CVs
            manuellement prend un temps précieux qui pourrait être investi ailleurs. CV Analyzer AI
            existe pour rendre ce processus plus clair, plus rapide, et plus juste, des deux côtés.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading title="Comment ça fonctionne" className="mb-12" />

          <div className="grid gap-10 sm:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <item.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="max-w-xs text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="flex flex-col items-center gap-8 p-8 md:flex-row md:items-start">
              <Avatar className="size-24 shrink-0 text-xl">
                <AvatarFallback className="text-xl font-medium">AA</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                <h3 className="text-2xl font-semibold tracking-tight">Qui suis-je</h3>
                <p className="text-muted-foreground">
                  Je m&apos;appelle Ambdulghaffar Ahamadi, développeur Fullstack diplômé d&apos;un
                  Master Qualité du Logiciel. CV Analyzer AI est l&apos;un de mes projets pour explorer
                  concrètement comment le Machine Learning et les LLM peuvent résoudre de vrais
                  problèmes, au-delà de la théorie apprise en cours.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  {/* Portfolio URL à ajouter une fois déployé */}
                  <Button variant="outline" render={<a href="#" target="_blank" rel="noopener noreferrer" />}>
                    <ExternalLink />
                    Voir mon portfolio
                  </Button>
                  <Button
                    variant="outline"
                    render={
                      <a href="https://github.com/ambdulghaffar" target="_blank" rel="noopener noreferrer" />
                    }
                  >
                    <GithubIcon className="size-4" />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading title="Valeurs & engagements" className="mb-12" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((commitment) => (
              <FeatureCard key={commitment.title} {...commitment} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
          <SectionHeading title="Prêt à essayer ?" />
          <Button size="lg" render={<Link href="/register" />}>
            Commencer gratuitement
          </Button>
        </div>
      </section>
    </main>
  )
}
