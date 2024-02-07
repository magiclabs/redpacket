'use client'

import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { motion } from 'framer-motion'
import { useEffect, useState, type PropsWithChildren } from 'react'
import { isServer } from 'utils/isServer'
import { useAccount } from 'wagmi'

export const WagmiAuth = ({ children }: PropsWithChildren) => {
  const { isReconnecting } = useAccount()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isServer() || isReconnecting || !isMounted) {
    return (
      <main className="flex h-dvh w-full flex-col items-center justify-center overflow-x-hidden">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <InfiniteLoadingSpinner className="aspect-square h-16 w-16" />
          </motion.div>
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

  return <>{children}</>
}
