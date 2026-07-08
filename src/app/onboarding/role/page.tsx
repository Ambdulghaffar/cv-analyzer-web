"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
        <div className="pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
        <div className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-400/10" />
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-400/10" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
        <div className="flex w-full flex-col items-start gap-6 text-left lg:max-w-md">
          <Logo size="lg" />

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Choisissez votre profil
            </h1>
            <p className="text-muted-foreground">Comment allez-vous utiliser CV Analyzer AI ?</p>
          </div>

          <RadioGroup
            value={submittingRole ?? undefined}
            onValueChange={(value) => handleSelectRole(value as UserRole)}
            className="w-full gap-4"
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

        <div className="hidden flex-1 lg:flex lg:items-center lg:justify-center">
          <Image
            src="/images/role-illustration.jpg"
            alt="Illustration du choix de profil"
            width={800}
            height={800}
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}
