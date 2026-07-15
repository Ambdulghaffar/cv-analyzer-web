"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader2, Users } from "lucide-react"

import { CandidateRankCard } from "@/components/dashboard/rank/candidate-rank-card"
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
import { getRankingDetail, getRankingHistory } from "@/lib/api"
import type { RankingHistoryItem, RankingResult } from "@/types/analysis"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

export default function RecruiterHistoryPage() {
  const [items, setItems] = useState<RankingHistoryItem[] | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<RankingResult | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    getRankingHistory()
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    if (!selectedId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDetail(null)
      return
    }

    setDetailLoading(true)
    getRankingDetail(selectedId)
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
        <Users className="size-10 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Aucun classement effectué</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Comparez vos premiers candidats pour voir apparaître votre
          historique ici.
        </p>
        <Button render={<Link href="/dashboard/recruiter/rank" />}>
          Comparer des candidats
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Historique</h1>
        <p className="text-muted-foreground">
          Retrouvez tous vos classements de candidats précédents.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
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
                  {item.job_title || "Classement sans titre"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {dateFormatter.format(new Date(item.created_at))}
                </span>
              </div>
              <Badge variant="outline" className="shrink-0">
                {item.candidate_count} candidat
                {item.candidate_count > 1 ? "s" : ""}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
      >
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {detail?.job_title || "Détail du classement"}
            </DialogTitle>
          </DialogHeader>
          {detailLoading || !detail ? (
            <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Chargement...
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {detail.candidates.map((candidate, index) => (
                <CandidateRankCard
                  key={candidate.filename}
                  candidate={candidate}
                  rank={index + 1}
                  isTopRank={index === 0}
                />
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
