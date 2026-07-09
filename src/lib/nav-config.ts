import { createElement, type ReactNode } from "react"
import {
  Briefcase,
  FileSearch,
  History,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from "lucide-react"

import type { UserRole } from "@/types"

export interface NavItem {
  title: string
  url: string
  icon: ReactNode
}

export const candidateNav: NavItem[] = [
  {
    title: "Tableau de bord",
    url: "/dashboard/candidate",
    icon: createElement(LayoutDashboard),
  },
  {
    title: "Analyser un CV",
    url: "/dashboard/candidate/analyze",
    icon: createElement(FileSearch),
  },
  {
    title: "Historique",
    url: "/dashboard/candidate/history",
    icon: createElement(History),
  },
  {
    title: "Lettres de motivation",
    url: "/dashboard/candidate/letters",
    icon: createElement(Mail),
  },
]

export const recruiterNav: NavItem[] = [
  {
    title: "Tableau de bord",
    url: "/dashboard/recruiter",
    icon: createElement(LayoutDashboard),
  },
  {
    title: "Comparer des candidats",
    url: "/dashboard/recruiter/rank",
    icon: createElement(Users),
  },
  {
    title: "Offres d'emploi",
    url: "/dashboard/recruiter/offers",
    icon: createElement(Briefcase),
  },
  {
    title: "Historique",
    url: "/dashboard/recruiter/history",
    icon: createElement(History),
  },
]

export function getSecondaryNav(role: UserRole): NavItem[] {
  return [
    {
      title: "Paramètres",
      url: `/dashboard/${role}/settings`,
      icon: createElement(Settings),
    },
  ]
}
