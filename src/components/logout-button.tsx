"use client"

import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      Se déconnecter
    </Button>
  )
}

export { LogoutButton }
