"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileSearch, Loader2 } from "lucide-react"

import { AnalysisResultView } from "@/components/dashboard/analyze/analysis-result-view"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { getAnalysisDetail, getAnalysisHistory } from "@/lib/api"
import { getScoreTier, scoreBadgeClassNames } from "@/lib/score"
import { cn } from "@/lib/utils"
import type { AnalysisHistoryItem, AnalysisResult } from "@/types/analysis"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export default function CandidateHistoryPage() {
  const [items, setItems] = useState<AnalysisHistoryItem[] | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<AnalysisResult | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    getAnalysisHistory()
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    if (!selectedId) {
      setDetail(null)
      return
    }

    setDetailLoading(true)
    getAnalysisDetail(selectedId)
      .then(setDetail)
      .finally(() => setDetailLoading(false))
  }, [selectedId])

  if (items === null) {
    return (
      <div className="flex flex-1 flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <FileSearch className="size-10 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Aucune analyse pour le moment</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Analysez votre premier CV pour voir apparaître votre historique ici.
        </p>
        <Button render={<Link href="/dashboard/candidate/analyze" />}>
          Analyser mon premier CV
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Historique</h1>
        <p className="text-muted-foreground">
          Retrouvez toutes vos analyses précédentes.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const tier = getScoreTier(item.global_score)

          return (
            <Card
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setSelectedId(item.id)
                }
              }}
              className="cursor-pointer transition-colors hover:bg-muted/50"
            >
              <CardContent className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">
                    {item.job_title || "Analyse sans titre"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {dateFormatter.format(new Date(item.created_at))}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={cn("shrink-0", scoreBadgeClassNames[tier])}
                >
                  {item.global_score}%
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Détail de l&apos;analyse</DialogTitle>
          </DialogHeader>
          {detailLoading || !detail ? (
            <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Chargement...
            </div>
          ) : (
            <AnalysisResultView result={detail} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
