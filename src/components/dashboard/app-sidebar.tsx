"use client"

import * as React from "react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { candidateNav, getSecondaryNav, recruiterNav } from "@/lib/nav-config"
import type { Profile, UserRole } from "@/types"

export function AppSidebar({
  role,
  profile,
  email,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  role: UserRole
  profile: Profile
  email: string
}) {
  const navMain = role === "candidate" ? candidateNav : recruiterNav
  const navSecondary = getSecondaryNav(role)

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <Logo size="sm" className="px-2 py-1.5" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={profile} role={role} email={email} />
      </SidebarFooter>
    </Sidebar>
  )
}
