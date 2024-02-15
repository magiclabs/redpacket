import { type MotionImageProps } from 'components/MotionImage'
import { cn } from 'lib/utils'
import Image from 'next/image'

export function MagnifyingGlass({ className, ...rest }: MotionImageProps) {
  return (
    <Image
      priority
      key="magnifying-glass"
      className={cn(
        'z-20 mt-4 aspect-square h-[224px] w-[224px] select-none sm:mt-8 sm:h-[282px] sm:w-[282px]',
        className,
      )}
      src="/magnifying-glass.png"
      width="1000"
      height="1000"
      quality={80}
      alt="Red Packet"
      {...rest}
    />
  )
}
