import Image from 'next/image'

export function RedDragon() {
  return (
    <Image
      priority
      key="red-dragon"
      className="md:h-64 md:w-64 z-10 mt-4 aspect-square h-64 w-64 select-none sm:mt-12"
      src="/Red_Dragon.png"
      width="260"
      height="260"
      quality={80}
      alt="Red Dragon"
    />
  )
}
