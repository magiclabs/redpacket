import { motion, type MotionProps } from 'framer-motion'
import Image from 'next/image'

export default function BackLanturns(props: MotionProps) {
  return (
    <motion.div
      className="absolute z-20 aspect-[1280/412] w-full min-w-[1280px] md:w-full"
      {...props}
    >
      <Image
        className="w-full"
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
      />
    </motion.div>
  )
}
