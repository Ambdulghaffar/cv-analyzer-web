import type { AuthError } from "@supabase/supabase-js"

export function getLoginErrorMessage(error: AuthError): string {
  switch (error.message) {
    case "Invalid login credentials":
      return "Email ou mot de passe incorrect."
    case "Email not confirmed":
      return "Veuillez confirmer votre email avant de vous connecter."
    default:
      return "Erreur lors de la connexion. Veuillez réessayer."
  }
}

export function getRegisterErrorMessage(error: AuthError): string {
  switch (error.message) {
    case "User already registered":
      return "Un compte existe déjà avec cette adresse email."
    default:
      if (error.message.toLowerCase().includes("password")) {
        return "Le mot de passe doit contenir au moins 6 caractères."
      }
      return "Erreur lors de l'inscription. Veuillez réessayer."
  }
}