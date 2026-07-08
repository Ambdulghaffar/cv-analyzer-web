"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, Loader2, UserRound } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/types"
import { Logo } from "@/components/logo"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function OnboardingRolePage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [submittingRole, setSubmittingRole] = useState<UserRole | null>(null)

  useEffect(() => {
    let active = true

    async function checkAccess() {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace(ROUTES.login)
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, role_selected")
        .eq("id", user.id)
        .single()

      if (!active) return

      if (profile?.role_selected) {
        router.replace(
          profile.role === "recruiter" ? ROUTES.dashboard.recruiter : ROUTES.dashboard.candidate
        )
        return
      }

      setChecking(false)
    }

    checkAccess()

    return () => {
      active = false
    }
  }, [router])

  const handleSelectRole = async (role: UserRole) => {
    if (submittingRole) return
    setSubmittingRole(role)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.replace(ROUTES.login)
      return
    }

    await supabase
      .from("profiles")
      .update({ role, role_selected: true })
      .eq("id", user.id)

    router.push(role === "recruiter" ? ROUTES.dashboard.recruiter : ROUTES.dashboard.candidate)
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-12">
      <Logo size="lg" />

      <div className="flex w-full max-w-2xl flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Choisissez votre profil</h1>
        <p className="text-muted-foreground">Comment allez-vous utiliser CV Analyzer AI ?</p>
      </div>

      <RadioGroup
        value={submittingRole ?? undefined}
        onValueChange={(value) => handleSelectRole(value as UserRole)}
        className="w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <FieldLabel
          htmlFor="role-candidate"
          className={cn(submittingRole && submittingRole !== "candidate" && "pointer-events-none opacity-50")}
        >
          <Field orientation="horizontal" className="p-5">
            <RadioGroupItem value="candidate" id="role-candidate" disabled={!!submittingRole} />
            <FieldContent>
              <FieldTitle className="gap-2 text-base">
                <UserRound className="size-4" />
                Candidat
              </FieldTitle>
              <FieldDescription>
                Analysez votre CV et améliorez vos candidatures
              </FieldDescription>
            </FieldContent>
            {submittingRole === "candidate" && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </Field>
        </FieldLabel>

        <FieldLabel
          htmlFor="role-recruiter"
          className={cn(submittingRole && submittingRole !== "recruiter" && "pointer-events-none opacity-50")}
        >
          <Field orientation="horizontal" className="p-5">
            <RadioGroupItem value="recruiter" id="role-recruiter" disabled={!!submittingRole} />
            <FieldContent>
              <FieldTitle className="gap-2 text-base">
                <Briefcase className="size-4" />
                Recruteur
              </FieldTitle>
              <FieldDescription>
                Comparez et classez vos candidats
              </FieldDescription>
            </FieldContent>
            {submittingRole === "recruiter" && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </Field>
        </FieldLabel>
      </RadioGroup>
    </div>
  )
}
