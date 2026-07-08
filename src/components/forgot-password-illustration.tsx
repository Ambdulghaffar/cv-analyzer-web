import Image from "next/image"

function ForgotPasswordIllustration() {
  return (
    <div className="relative h-full w-full flex-1">
      <Image
        src="/images/auth/forgot-password-illustration.jpg"
        alt="Illustration d'un candidat recevant un lien de réinitialisation de mot de passe sur son téléphone et son ordinateur portable"
        fill
        className="object-cover object-[center_38%] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
      />
    </div>
  )
}

export { ForgotPasswordIllustration }
