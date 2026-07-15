"use client"

import { useState } from "react"
import { EllipsisVertical, Loader2 } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteOffer } from "@/lib/api"
import type { JobOffer } from "@/types/offer"

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const DESCRIPTION_PREVIEW_LENGTH = 160

interface OfferCardProps {
  offer: JobOffer
  onEdit: () => void
  onDeleted: (id: string) => void
}

export function OfferCard({ offer, onEdit, onDeleted }: OfferCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const descriptionPreview =
    offer.description.length > DESCRIPTION_PREVIEW_LENGTH
      ? `${offer.description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trim()}...`
      : offer.description

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteOffer(offer.id)
      toast.success("Offre supprimée avec succès.")
      setDeleteOpen(false)
      onDeleted(offer.id)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue."
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-medium">{offer.title}</span>
          <p className="text-sm text-muted-foreground">{descriptionPreview}</p>
          <span className="text-xs text-muted-foreground">
            Créée le {dateFormatter.format(new Date(offer.created_at))}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon-sm" className="shrink-0" />}
          >
            <EllipsisVertical />
            <span className="sr-only">Actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Modifier</DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette offre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L&apos;offre &laquo;&nbsp;
              {offer.title}&nbsp;&raquo; sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
