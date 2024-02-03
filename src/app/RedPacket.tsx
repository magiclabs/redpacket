import { MotionImage, type MotionImageProps } from 'components/MotionImage'
import { cn } from 'lib/utils'

export function RedPacket({ className, ...rest }: MotionImageProps) {
  return (
    <MotionImage
      priority
      key="red-packet"
      className={cn(
        'z-20 mt-4 aspect-square h-56 w-56 rotate-[30deg] select-none sm:mt-12 md:h-64 md:w-64',
        className,
      )}
      src="/Red_Envelope_1.png"
      width="1000"
      height="1000"
      quality={80}
      alt="Red Packet"
      {...rest}
    />
  )
}
