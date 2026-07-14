"use client";
import { History } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function RecruiterHistoryPage() {
  const [token, setToken] = useState("");
  useEffect(() => {
    createClient()
      .auth.getSession()
      .then(({ data }) => {
        setToken(data.session?.access_token ?? "");
      });
  }, []);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <History className="size-10 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Bientôt disponible</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        L&apos;historique de vos classements et analyses sera bientôt accessible
        ici.
      </p>
      <p className="text-xs break-all p-4">{token}</p>
    </div>
  );
}
