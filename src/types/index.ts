export type UserRole = "candidate" | "recruiter"

export interface Profile {
  id: string
  full_name: string | null
  role: UserRole
  created_at: string
}
