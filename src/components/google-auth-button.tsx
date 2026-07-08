import type { SVGProps } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.01h3.88c2.27-2.09 3.57-5.17 3.57-8.83Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11C3.24 21.3 7.29 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.19 7.19 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.26A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.26 5.39l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.26 6.61l4.01 3.11c.95-2.85 3.6-4.95 6.73-4.95Z"
      />
    </svg>
  )
}

function GoogleAuthButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button type="button" variant="secondary" className={cn("w-full", className)} {...props}>
      <GoogleIcon className="size-4" />
      Continuer avec Google
    </Button>
  )
}

export { GoogleAuthButton }
