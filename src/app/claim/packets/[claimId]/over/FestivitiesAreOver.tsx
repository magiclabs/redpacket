import Image, { type ImageProps } from 'next/image'

export function FestivitiesAreOver(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      priority
      key="red-packet"
      className="h-[34px] w-[378px] select-none"
      src="/festivities-are-over.png"
      width="378"
      height="34"
      quality={80}
      alt="Red Packet"
      {...props}
    />
  )
}
