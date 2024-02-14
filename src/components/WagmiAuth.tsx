'use client'

import { watchAccount } from '@wagmi/core'
import { InfiniteLoadingSpinner } from 'components/icons/InfiniteLoadingSpinner'
import { AnimatePresence, motion } from 'framer-motion'
import { wagmiConfig } from 'lib/web3modal/config'
import { useEffect, useState, type PropsWithChildren } from 'react'

export const WagmiAuth = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const unwatch = watchAccount(wagmiConfig, {
      onChange: ({ status }) => {
        console.log({ status })
        if (status === 'connecting' || status === 'reconnecting') {
          return
        }

        setIsLoading(false)
      },
    })

    setIsMounted(true)
    return () => unwatch()
  }, [])

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isLoading ? (
        <motion.main
          key="loading"
          className="flex h-dvh w-full flex-col items-center justify-center overflow-x-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <InfiniteLoadingSpinner className="aspect-square h-16 w-16" />
            <span className="text-sm font-semibold">
              Loading Red Packets...
            </span>

            {isMounted ? (
              <motion.span
                className="mt-1 text-center text-sm text-[#ffffffcc]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                This takes a few seconds
              </motion.span>
            ) : (
              <span className="mt-1 text-center text-sm">&nbsp;</span>
            )}
          </div>
        </motion.main>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
