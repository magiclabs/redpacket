'use client'

import { GTSuper } from 'app/fonts'
import { motion, type MotionProps } from 'framer-motion'
import { cn } from 'lib/utils'
import { type ComponentProps } from 'react'

const Headline = ({ children, className, ...rest }: ComponentProps<'h2'>) => {
  return (
    <h2
      className={cn(
        `${GTSuper.className} select-none text-center text-[40px] leading-none tracking-[-0.408px]`,
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

export const TypographyBody = ({
  children,
  className,
  ...rest
}: ComponentProps<'p'>) => {
  return (
    <p
      className={cn(
        `text-center text-sm font-normal leading-normal tracking-[-0.408px] text-[#ffffffcc] sm:text-lg sm:leading-normal`,
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  )
}
