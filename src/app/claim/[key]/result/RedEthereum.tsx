import { MotionImage, type MotionImageProps } from 'components/MotionImage'

export function RedEthereum(props: MotionImageProps) {
  const key = `RedEthereum`

  return (
    <div className="relative mt-4 aspect-square h-[198px] w-[198px] sm:mt-12 md:h-64 md:w-64">
      <MotionImage
        priority
        key={key}
        className="z-20 select-none"
        src={`/${key}.png`}
        width="980"
        height="1000"
        quality={80}
        alt={key}
        {...props}
      />
      <div
        className="absolute inset-0 left-[20%] z-10 m-auto aspect-square h-[130px] w-[130px] opacity-70 blur-[26px]"
        style={{
          background:
            'radial-gradient(56.57% 69.27% at 32.98% 50.03%, #FF6C19 0%, rgba(255, 64, 64, 0.41) 100%)',
          transform: 'rotate(21.484deg)',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  )
}
