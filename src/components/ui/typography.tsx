import { GTSuper } from 'app/fonts'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from 'lib/utils'
import { type ComponentProps } from 'react'

const Headline = ({ children, className, ...rest }: ComponentProps<'h2'>) => {
  return (
    <h2
      className={cn(
        `${GTSuper.className} text-center text-[40px] leading-none`,
        className,
      )}
      style={{
        background: 'linear-gradient(180deg, #FFF 20.02%, #FFACAC 100%)',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      {...rest}
    >
      {children}
    </h2>
  )
}

export const MotionHeadline = ({
  children,
  ...rest
}: Omit<ComponentProps<typeof Headline>, 'ref' | 'style'> & MotionProps) => {
  return (
    <motion.div {...rest}>
      <Headline>{children}</Headline>
    </motion.div>
  )
}
