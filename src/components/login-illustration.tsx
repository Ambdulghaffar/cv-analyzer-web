import Image from "next/image"

function LoginIllustration() {
  return (
    <div className="relative h-full w-full flex-1">
      <Image
        src="/images/auth/login-illustration.jpg"
        alt="Illustration d'un candidat consultant son tableau de bord d'analyse de CV sur son ordinateur portable"
        fill
        className="object-cover object-[center_40%] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
      />
    </div>
  )
}

export { LoginIllustration }
