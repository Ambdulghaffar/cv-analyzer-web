export type UserRole = "candidate" | "recruiter"

export interface Profile {
  id: string
  full_name: string | null
  role: UserRole
  role_selected: boolean
  created_at: string
}
