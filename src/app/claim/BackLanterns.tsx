import { MotionImage, type MotionImageProps } from 'components/MotionImage'

export function BackLanturns(props: MotionImageProps) {
  return (
    <MotionImage
      className="absolute z-10 aspect-[1280/412] w-full w-full min-w-[1280px] md:w-full"
      priority
      src="/Lanterns.png"
      width="1280"
      height="412"
      quality={80}
      alt="Lanterns"
      style={{
        mask: `linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.11) 38.27%, rgba(0, 0, 0, 0.13) 63.16%, #000 100%)`,
        maskMode: 'alpha',
      }}
      {...props}
    />
  )
}
