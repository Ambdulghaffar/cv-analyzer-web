import Image from "next/image"

function RegisterIllustration() {
  return (
    <div className="relative h-full w-full flex-1">
      <Image
        src="/images/auth/register-illustration.jpg"
        alt="Illustration d'un candidat consultant son profil et sa checklist de candidature sur un ordinateur portable"
        fill
        className="object-cover object-[center_38%] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
      />
    </div>
  )
}

export { RegisterIllustration }
