import { MotionImage, type MotionImageProps } from 'components/MotionImage'

export function RedEthereum(props: MotionImageProps) {
  return (
    <MotionImage
      priority
      key="red-packet"
      className="mt-4 aspect-square h-[198px] w-[194px] select-none sm:mt-12 md:h-64 md:w-64"
      src="/red-ethereum.png"
      width="194"
      height="198"
      quality={80}
      alt="Red Packet"
      {...props}
    />
  )
}
