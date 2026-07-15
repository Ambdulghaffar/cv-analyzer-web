"use client"

import { useEffect, useState } from "react"
import { Briefcase, Plus } from "lucide-react"

import { OfferCard } from "@/components/dashboard/offers/offer-card"
import { OfferFormDialog } from "@/components/dashboard/offers/offer-form-dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { listOffers } from "@/lib/api"
import type { JobOffer } from "@/types/offer"

export default function RecruiterOffersPage() {
  const [offers, setOffers] = useState<JobOffer[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null)

  useEffect(() => {
    listOffers()
      .then(setOffers)
      .catch(() => setOffers([]))
  }, [])

  const openCreateForm = () => {
    setEditingOffer(null)
    setFormOpen(true)
  }

  const openEditForm = (offer: JobOffer) => {
    setEditingOffer(offer)
    setFormOpen(true)
  }

  const handleSaved = (offer: JobOffer) => {
    setOffers((current) => {
      const list = current ?? []
      const exists = list.some((item) => item.id === offer.id)
      return exists
        ? list.map((item) => (item.id === offer.id ? offer : item))
        : [offer, ...list]
    })
  }

  const handleDeleted = (id: string) => {
    setOffers((current) => (current ?? []).filter((item) => item.id !== id))
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Offres d&apos;emploi</h1>
          <p className="text-muted-foreground">
            Gérez les offres associées à vos comparaisons de candidats.
          </p>
        </div>
        {offers && offers.length > 0 && (
          <Button onClick={openCreateForm}>
            <Plus />
            Créer une offre
          </Button>
        )}
      </div>

      {offers === null ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : offers.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <Briefcase className="size-10 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Aucune offre enregistrée</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Créez votre première offre d&apos;emploi pour commencer à comparer
            des candidats.
          </p>
          <Button onClick={openCreateForm}>
            <Plus />
            Créer votre première offre
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onEdit={() => openEditForm(offer)}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      )}

      <OfferFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        offer={editingOffer}
        onSaved={handleSaved}
      />
    </div>
  )
}
