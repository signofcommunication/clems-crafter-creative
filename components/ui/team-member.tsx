import Image from 'next/image'

interface TeamMemberProps {
  name: string
  position: string
  imageUrl: string
}

export const TeamMember = ({ name, position, imageUrl }: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-48 overflow-hidden rounded-lg">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{position}</p>
      </div>
    </div>
  )
}
