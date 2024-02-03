import Image, { type ImageProps } from 'next/image'

export function RedLantern(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      priority
      key="red-packet"
      className="aspect-square h-[334px] w-[334px] select-none md:h-64 md:w-64"
      src="/red-lantern.png"
      width="334"
      height="334"
      quality={80}
      alt="Red Packet"
      {...props}
    />
  )
}
