'use client'

import { motion, type MotionProps } from 'framer-motion'
import { cn } from 'lib/utils'
import { type ComponentProps } from 'react'

type Props = Omit<ComponentProps<'div'>, 'ref' | 'style'> & MotionProps

export const Container = ({ children, className, ...rest }: Props) => {
  return (
    <motion.div
      className={cn(
        'z-30 flex w-full max-w-[440px] flex-1 flex-col items-center px-5',
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
