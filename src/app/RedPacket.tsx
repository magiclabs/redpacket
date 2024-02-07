import { MotionImage, type MotionImageProps } from 'components/MotionImage'
import { cn } from 'lib/utils'

export function RedPacket({ className, ...rest }: MotionImageProps) {
  return (
    <MotionImage
      priority
      key="red-packet"
      className={cn(
        'z-20 mt-4 aspect-square h-[224px] w-[224px] rotate-[30deg] select-none sm:mt-12 sm:h-[260px] sm:w-[260px]',
        className,
      )}
      src="/red-envelope.png"
      width="1000"
      height="1000"
      quality={80}
      alt="Red Packet"
      {...rest}
    />
  )
}
