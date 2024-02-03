import { motion, type MotionProps } from 'framer-motion'

export const RedFocus = (props: MotionProps) => {
  return (
    <motion.div
      className="absolute z-0 h-full w-full"
      style={{
        background:
          'radial-gradient(62.01% 50% at 50% 50%, #480016 0%, #03010B 100%), #FFF',
      }}
      {...props}
    ></motion.div>
  )
}
