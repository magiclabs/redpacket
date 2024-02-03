import { MotionImage, type MotionImageProps } from 'components/MotionImage'

export function FestivitiesAreOver(props: MotionImageProps) {
  return (
    <MotionImage
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
