import { cn } from 'lib/utils'
import { type ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Container = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        'z-30 flex  w-full max-w-[440px] flex-col items-center px-5',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
