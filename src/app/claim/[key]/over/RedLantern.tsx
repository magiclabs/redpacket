import Image, { type ImageProps } from 'next/image'

export function RedLantern(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      priority
      key="red-packet"
      className="aspect-square h-[224px] w-[224px] select-none sm:h-[334px] sm:w-[334px]"
      src="/red-lantern.png"
      width="334"
      height="334"
      quality={80}
      alt="Red Packet"
      {...props}
    />
  )
}
