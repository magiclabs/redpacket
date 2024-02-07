import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { motion } from 'framer-motion'

export const Loading = () => {
  return (
    <main className="flex h-dvh w-full flex-col items-center justify-center overflow-x-hidden">
      <div className="flex flex-col items-center">
        <InfiniteLoadingSpinner className="aspect-square h-16 w-16" />
        <span className="text-sm font-semibold">Loading Red Packets...</span>
        <motion.span
          className="mt-1 text-center text-sm text-[#ffffffcc]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          This takes a few seconds
        </motion.span>
      </div>
    </main>
  )
}
