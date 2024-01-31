import { motion } from 'framer-motion'
import Image, { type ImageProps } from 'next/image'

export function RedLantern(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <div className="relative flex aspect-square">
      <motion.div
        className="absolute inset-0 z-10 m-auto aspect-square h-[80px] w-[80px] opacity-70 blur-[30px] sm:h-[140px] sm:w-[140px]"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(255, 170, 67, 0.70) 0%, rgba(255, 48, 52, 0.70) 100%)',
          transform: 'rotate(21.484deg)',
          mixBlendMode: 'overlay',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
      />
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
    </div>
  )
}
